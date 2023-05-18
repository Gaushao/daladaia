// import { Message, User } from "@daladaia/schema";
// import Dalama from "../core";
// import Dialog from "../dialog";

// export default class VicunAI {
//   loading = false;
//   spawn = (prompt: string, callback: (token: string) => void) => {
//     if (!this.loading) {
//       this.loading = true;
//       try {
//         Dalama.spawn(
//           {
//             m: Dalama.Paths.models.vicuna7b,
//             p: prompt,
//             // n: "32",
//             // temp: "0.5",
//             // ins: "You are an artificial intelligence in a dialog between humans. Reply the last message.",
//           },
//           callback
//         );
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   };
//   user: User;
//   dialog = new Dialog();
//   get context() {
//     return `${this.dialog.history}
//     ### ${this.name}:`;
//   }
//   output: (m: Message) => void;
//   constructor({ output, name = "VicunaAI" }: Partial<VicunAI>) {
//     this.output = output;
//     this.user = new User({ name });
//     this.dialog = new Dialog(name);
//     this.dialog.tag = (m = "", n = this.name) => `### ${n}: ${m}<end>`;
//   }
//   get message() {
//     return new Message({ author: this.user });
//   }
//   get name() {
//     return this.user.name;
//   }
//   read(message: Message) {
//     if (message.text === "/stop") {
//       Dalama.stop();
//       this.loading = false;
//     } else {
//       this.dialog.add(message.text, message.author.name);
//     }
//   }
//   write() {
//     const { message, dialog, context } = this;
//     let avoid = true;
//     this.spawn(context, (token) => {
//       // console.log("TOKEN: ", token);
//       if (avoid) return (avoid = false);
//       if (token.includes("<end>")) {
//         // last token
//         this.loading = false;
//         return Dalama.stop();
//         // return this.read(message);
//       }
//       message.text = message.text + token;
//       this.output(message);
//     });
//   }
// }
