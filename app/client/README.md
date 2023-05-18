# Dalama UI

Dalama UI is the client-side application to be used with Dalama IO API. It provides a interface for registering users, sending messages, and displaying chat conversations in real-time.

## Run

from `app/client`

```sh
    $ yarn dev
```

## Components

- `Chat`: Renders messages with text, author, and time.

- `ChatHeader`: Handles user registration and displays the user - name.

- `ChatContext`: Handles events and states related to the Dalama IO API integration.

- `ChatInput`: Allows registered users to send messages.

## Techs

- [React](https://reactjs.org/): JavaScript library for building user interfaces.

- [Socket.IO Client](https://socket.io/): Client-side library for real-time bidirectional event-based communication.

- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling the user interface.

- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript.

- [Vite](https://vitejs.dev/): Fast development build tool.
