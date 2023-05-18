import io from "socket.io-client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, Message } from "@daladaia/schema";

const socket = io("http://localhost:3001");

class ContextValue {
  error: string | null = null;
  messages: Message[] = [];
  user = new User();
  text = "";
  register(name: User["name"]) {}
  write(text: ContextValue["text"]) {}
  send() {}
}

const EMPTY = new ContextValue();

const Context = createContext(EMPTY);

export default function ChatContext({ children }: React.PropsWithChildren) {
  const [error, setError] = useState(EMPTY.error);
  const [messages, setMessages] = useState(EMPTY.messages);
  const [user, setUser] = useState(EMPTY.user);
  const [text, write] = useState(EMPTY.text);
  const register = useCallback<ContextValue["register"]>(
    (name) => {
      socket.emit("register", name);
    },
    [text]
  );
  const send = useCallback<ContextValue["send"]>(() => {
    socket.emit("message", text);
    write("");
  }, [text]);
  const addMessage = useCallback((message: Message) => {
    setMessages((curr) => {
      const found = curr.findIndex(({ id }) => id === message.id);
      if (found < 0) return [...curr, message];
      const arr = [...curr];
      arr[found] = message;
      return arr;
    });
  }, []);
  useEffect(() => {
    socket.on("error", setError);
    socket.on("registered", setUser);
    socket.on("messages", setMessages);
    socket.on("message", addMessage);
    return () => {
      socket.off("error");
      socket.off("registered");
      socket.off("messages");
    };
  }, [socket]);
  if (error) console.log("ChatContextError", error);
  return (
    <Context.Provider
      value={{
        error,
        messages,
        user,
        text,
        register,
        write,
        send,
      }}
    >
      {children}
    </Context.Provider>
  );
}
ChatContext.Context = Context;
ChatContext.useContext = () => useContext(Context);
