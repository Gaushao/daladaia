import ScrollToBottom from "react-scroll-to-bottom";

import ChatContext from "./context";
import ChatInput from "./Input";
import ChatHeader from "./Header";
import useElementSize from "../hooks/useElementSize";
import { useMemo } from "react";

function Chat() {
  const { messages, user } = ChatContext.useContext();
  const registered = !!user.name.length;
  const [outter, outSize] = useElementSize();
  const height = useMemo(
    () => Math.floor(outSize.height - (128 + 64)),
    [outSize.height]
  );
  return (
    <div ref={outter} className="flex flex-col h-[100vh] p-1">
      <div className="flex items-center h-[64px]">
        <ChatHeader />
      </div>
      <ScrollToBottom className="border p-1 m-2">
        <div
          style={{
            height,
          }}
        >
          {messages.map(({ id, text, time, author }) => {
            const self = user.id === author.id;
            return (
              <div
                key={id}
                className="border m-2 p-2"
                style={{
                  backgroundColor: self ? "#ccfbf1" : "#e0f2fe",
                }}
              >
                <span className="text-lg">
                  <strong>{author.name}</strong>:
                </span>
                <p className="p-1">{text}</p>
                {/* <div
                  className="p-1"
                  dangerouslySetInnerHTML={{ __html: text }}
                /> */}
                <span className="flex justify-end text-sm">{time}</span>
              </div>
            );
          })}
        </div>
      </ScrollToBottom>
      {registered && (
        <div className="flex items-center h-[128px]">
          <ChatInput />
        </div>
      )}
    </div>
  );
}
export default function ProvidedChat() {
  return (
    <ChatContext>
      <Chat />
    </ChatContext>
  );
}
