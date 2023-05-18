/**
 * This code sets up a server using Express and Socket.IO. It allows users to register, and send/receive messages from other connected clients.
 * It also integrates with Dalama AI to process and respond to messages.
 */

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import SetBy from "@daladaia/logic/setby";
import { Message, User } from "@daladaia/schema";
import { RuntLlamAI } from "@daladaia/dalama";

const PORT = 3001;

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const messages = new SetBy<Message>();

// store and emit the message to connected clients
function output(message: Partial<Message>) {
  const m = new Message(message);
  // set instead of add to allow message stream
  messages.set(m);
  io.emit("message", m);
  return m;
}

const users = new SetBy<User>();

// Create an instance of the AI
const daladaia = new RuntLlamAI({ output });
users.add(daladaia.user);

const { log } = console;

// Handle socket connections
io.on("connection", (socket) => {
  log(`${socket.id} has connected`);

  // Send the list of messages to the connected socket
  socket.emit("messages", Array.from(messages));

  // Register a user with the provided name
  socket.on("register", (name: User["name"]) => {
    let user = users.findBy(socket.id);
    if (user) {
      // If the user already exists, update the name
      log(`user ${user.name} renames to ${name}`);
      user.name = name;
      users.set(user);
    } else {
      // If the user doesn't exist, create a new user and add it to the set
      user = new User({ name, id: socket.id });
      users.add(user);
      log(`new user ${user.name} has registered`);
    }

    // Emit the registered user back to the socket
    socket.emit("registered", user);
  });

  // Handle incoming messages
  socket.on("message", (text: string) => {
    const user = users.findBy(socket.id);
    if (user) {
      // If the user exists, create a new message and pass it to the output function
      const m = output({ text, author: users.findBy(user.id) });

      // Pass the message to the AI for processing and replying
      daladaia.read(m);
      daladaia.write();
    } else socket.emit("error", "user not found");
  });

  // Handle socket errors
  socket.on("error", (error) => {
    log("socket error", error);
    socket.disconnect();
  });

  // Handle socket disconnections
  socket.on("disconnect", (reason) => {
    log(`${socket.id} has left. ${reason}`);
    // Remove the user from the set of users
    users.deleteBy(socket.id);
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  log(`Server is running at ${PORT}`);
});
