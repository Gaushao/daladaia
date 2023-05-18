import { Message, User } from "@daladaia/schema";
import Dalama from "../core";
import Dialog from "../dialog";

export default class JimIA {
  loading = false;
  user = new User();
  dialog = new Dialog();
  get context() {
    return `### CONTEXT:
    You are ${
      this.name
    }, an artificial intelligence chatting by WhatsApp; Being developed by Jayme Santos, hosted on his PC as an NodeJS API which cache the dialog context and runs LLaMA-7B to reply; Jayme Santos is web developer, AI enthusiast and is working hard to turn you into a powerful AI;
    ### INSTRUCTION:
    Help Jayme Santos to develop your API by telling him your needs; Reply as ${
      this.name
    };
    ### DIALOG:
    ${this.dialog.history}
    ${this.dialog.tag()}
    ### REPLY:`;
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
  read(text = "", name = "Jayme Santos") {
    if (text.startsWith("/")) {
      if (text === "/reset") {
        this.dialog.history = "";
        this.loading = false;
      }
    } else this.dialog.add(text, name);
  }
  get write() {
    return new Promise<string>((respond, reject) => {
      try {
        const { message, context, dialog } = this;
        if (!dialog.history.length) return reject("no dialog history");
        let ctx = String(context);
        this.spawn(ctx, (token) => {
          // console.log("TOKEN: ", token);
          if (ctx.length > 0) {
            // slice out the context
            ctx = ctx.slice(token.length - 1, ctx.length);
            return;
          }
          if (token.includes("<end>")) {
            // last token
            this.loading = false;
            this.read(message.text, message.author.name);
            respond(message.text);
          }
          message.text = message.text + token;
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  constructor({ name = "JimIA" }: Partial<JimIA> = { name: "JimIA" }) {
    this.user = new User({ name });
    this.dialog = new Dialog(name);
    this.dialog.tag = (m = "", n = this.name) => `[${n}]: ${m}`;
  }
}
