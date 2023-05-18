import Dalama from "../../core";
import Dialog from "../../dialog";

const USER_NAME = "USER_NAME";

export default class LlamAI {
  loading = false;
  name = "LlamAI";
  dialog = new Dialog();
  get context() {
    return `### CONTEXT:
    You are ${
      this.name
    }, an artificial intelligence chatting by WhatsApp; Able to parse images into text if sent;
    ### INSTRUCTION:
    Respond a single reply as ${this.name};
    ### DIALOG:
    ${this.dialog.history}
    ${this.dialog.tag()}
    ### REPLY:`;
  }
  get message() {
    const { name } = this;
    return { name, text: "" };
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
  read(text = "", name = USER_NAME) {
    if (text.startsWith("/")) {
      if (text === "/reset") {
        this.dialog.history = "";
        this.loading = false;
      }
      if (text === "/kill") Dalama.die();
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
            this.read(message.text, message.name);
            respond(message.text);
          }
          message.text = message.text + token;
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  constructor(name = "LlamAI") {
    this.name = name;
    this.dialog = new Dialog(name);
    this.dialog.tag = (m = "", n = this.name) => `[${n}]: ${m}`;
  }
}
