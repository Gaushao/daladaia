import { useCallback, useEffect, useState } from "react";
import ChatContext from "./context";

export default function ChatHeader() {
  const {
    error,
    user: { name: username },
    register,
  } = ChatContext.useContext();
  const [editing, setEditing] = useState(!username.length);
  const [name, setName] = useState(username);
  useEffect(() => {
    setName(username);
  }, [username]);
  const submit = useCallback(() => {
    setEditing(false);
    register(name);
  }, [register, name]);
  const registered = !!username.length;
  return editing ? (
    <div className="flex justify-center w-full p-2">
      <input
        value={name}
        className="w-full p-2 bg-slate-200"
        placeholder="choose a name"
        onChange={(event) => {
          setName(event.target.value);
        }}
        onKeyUp={(event) => {
          event.key === "Enter" && submit();
        }}
      />
      <button className="border px-4 bg-slate-700 text-white" onClick={submit}>
        &#10004;
      </button>
      <button
        className="border px-4 bg-slate-700 text-white"
        onClick={() => setEditing(false)}
      >
        &#10007;
      </button>
    </div>
  ) : (
    <div className="flex items-center p-4">
      <span>Welcome</span>
      <span className="w-1" />
      <strong>{registered ? username : "Dear Guest"}</strong>
      <span className="w-1" />
      <button onClick={() => setEditing(true)}>&#9998;</button>
    </div>
  );
}
