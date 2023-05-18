import { spawn } from "child_process";

const { log } = console;

const command = "python3 " + __dirname + "/main.py";

export default function tessespawn(path: string) {
  return new Promise<string>((res) => {
    log({ command, path });
    const child = spawn(command, [path], {
      shell: true,
    });
    const err = [];
    child.stderr.on("data", (data) => err.push(data));
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data: string) => res(data));
    child.stdout.on("error", (e) => log(e));
    child.on("close", (code) => {
      if (code !== 0) {
        log(Buffer.concat(err).toString());
        log(`\n<code ${code}>`);
      }
      res("\n<end>");
    });
  });
}
