import ChatContext from "./context";
import useBoolean from "../hooks/useBoolean";
import { useEffect, useRef } from "react";

export default function ChatInput() {
  const { text, write, send } = ChatContext.useContext();
  const ctrl = useBoolean(false);

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref]);

  return (
    <div className="flex justify-center w-full p-2">
      <textarea
        ref={ref}
        value={text}
        className="w-full p-2 bg-slate-200"
        placeholder="type a message"
        onChange={(event) => {
          write(event.target.value);
        }}
        onKeyDown={(event) => {
          event.key === "Control" && ctrl.setTrue();
        }}
        onKeyUp={(event) => {
          event.key === "Control" && ctrl.setFalse();
          event.key === "Enter" && ctrl.value && send();
        }}
      />
      <button className="border px-8 bg-slate-700 text-white" onClick={send}>
        &#9658;
      </button>
    </div>
  );
}
