import { Message, User } from "@daladaia/schema";
import Dalama from "../../core";
import Dialog from "../../dialog";

export default class LlamAI {
  loading = false;
  user = new User();
  dialog = new Dialog();
  output: (m: Message) => void;
  get context() {
    return `### Context: You are ${this.name}, an artificial intelligence chatting with humans.
  ### Instruction: Write ${this.name} reply.
  ### Dialog: ${this.dialog.history}
  ### Reply:`;
  }
  get message() {
    return new Message({ author: this.user });
  }
  get name() {
    return this.user.name;
  }
  spawn = (prompt: string, callback: (token: string) => void) => {
    if (!this.loading) {
      this.loading = true;
      try {
        Dalama.spawn(
          {
            m: Dalama.Paths.models.llama7b,
            p: prompt,
          },
          callback
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  read(message: Message) {
    if (message.text === "/stop") {
      Dalama.stop();
      this.loading = false;
    } else {
      this.dialog.add(message.text, message.author.name);
    }
  }
  write() {
    const { message, context } = this;
    let ctx = String(context);
    this.spawn(ctx, (token) => {
      // console.log("TOKEN: ", token);
      if (ctx.length > 0) {
        // context tokens
        ctx = ctx.slice(token.length - 1, ctx.length);
        return;
      }
      if (token.includes("<end>")) {
        // last token
        this.loading = false;
        return this.read(message);
      }
      message.text = message.text + token;
      this.output(message);
    });
  }
  constructor({ output, name = "LlamAI" }: Partial<LlamAI>) {
    this.output = output;
    this.user = new User({ name });
    this.dialog = new Dialog(name);
    this.dialog.tag = (m = "", n = this.name) => `[${n}]: ${m}`;
  }
}
