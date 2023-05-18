import { spawn } from "child_process";
import { sysdoublequotes } from "@daladaia/logic/str";
import DalamaParams from "./params";
import DalamaPaths from "./paths";

const { log } = console;

/**
 * Spawns the Llama.cpp process with the specified parameters and executes a callback function with the generated token.
 * @param params Partial parameters for Llama.cpp.
 * @param callback Callback function to be executed with the generated token. Defaults to writing the token to stdout.
 */
export default function dalamaspawn(
  params?: Partial<DalamaParams>,
  callback: (token: string) => void = (t) => process.stdout.write(t)
) {
  const command = DalamaPaths.maindir;
  params.p = sysdoublequotes(params.p);
  const args = DalamaParams.entries(params);
  const a = [
    // "--interactive",
    // "--reverse-prompt",
    // `"USER_NAME:"`,
    // "--in-prefix",
    // `" "`,
    ...args,
  ];
  log({ command, args: a });
  const child = spawn(command, a, {
    shell: true,
  });
  const err = [];
  child.stderr.on("data", (data) => err.push(data));
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (token) => callback(token));
  child.stdout.on("error", (e) => log(e));
  child.on("close", (code) => {
    if (code !== 0) {
      log(Buffer.concat(err).toString());
      log(`\n<code ${code}>`);
    }
    callback("\n<end>");
  });
}
