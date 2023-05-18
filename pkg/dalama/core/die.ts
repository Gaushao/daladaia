import { spawn } from "child_process";

const { log } = console;

const command = "killall node";

export default function die() {
  return new Promise<void>((res) => {
    log({ command });
    const child = spawn(command, [], {
      shell: true,
    });
    const err = [];
    child.stderr.on("data", (data) => err.push(data));
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data: string) => res());
    child.stdout.on("error", (e) => log(e));
    child.on("close", (code) => {
      if (code !== 0) {
        log(Buffer.concat(err).toString());
        log(`\n<code ${code}>`);
      }
      res();
    });
  });
}
