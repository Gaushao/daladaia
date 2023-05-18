# Dalama IO

## Run

from `app/server`

```sh
    $ yarn dev
```

## Integration with Client-side Application

To integrate the Dalama IO API with your client-side application, you can utilize the [SocketIO Client](https://socket.io/docs/v4/client-api/) library for establishing a real-time connection with the server. Follow these steps to integrate the API into your client-side application:

1. Install the Socket.IO client library in your project:
   ```sh
   $ yarn add socket.io-client
   ```
2. Import the Socket.IO client library in your client-side application:

   ```js
   import io from "socket.io-client";
   ```

3. Establish a connection to the Dalama IO API endpoint:

   ```js
   const socket = io("http://localhost:3001");
   ```

4. Listen for events from the API and handle them accordingly:

   ```js
   socket.on("messages", (messages) => {
     // Handle received messages
   });

   socket.on("registered", (user) => {
     // Handle user registration
   });

   socket.on("message", (message) => {
     // Handle incoming message
   });
   ```

## Contributing

Contributions are welcome! If you find any issues or want to contribute to the project, please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
