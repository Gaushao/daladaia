import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import { WaitLlamAI } from "@daladaia/dalama";
import tesseract from "@daladaia/tesseract";
import Messager from "./messager";
import WebhookBody from "./body";
import Contact from "./contact";
import Media from "./media";

dotenv.config();
const PORT = process.env.LISTENER_PORT;
const TOKEN = process.env.WEBHOOK_VERIFICATION_TOKEN;

const ai = new WaitLlamAI();

const { send } = Messager;
const { log } = console;
const app = express();
app.use(express.json());
express.urlencoded({ extended: false });

// authentication
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  log(`${mode}: succeed`);
  if (mode === "subscribe") {
    const token = req.query["hub.verify_token"];
    log(`${mode}: succeed, ${token}`);
    if (token === TOKEN) {
      const challenge = req.query["hub.challenge"];
      log(`${mode}: succeed, ${token} ${challenge}`);
      return res.send(challenge);
    }
  }
  log(req, mode, ": exception");
  return res.sendStatus(400);
});

function phone(n: string | number) {
  let r = String(n);
  if (r.startsWith("55")) {
    if (r.length === 12) r = r.slice(0, 4) + "9" + r.slice(4);
  }
  return r;
}

const contact = new Contact();

const imagepath = __dirname + "/temp/image.jpeg";

// parser
app.post("/webhook", async (req, res) => {
  try {
    if (req && req?.body) {
      const body = new WebhookBody(req.body);
      const { lastchange, lastmessage, lastmetadata, laststatuses } = body;
      if (lastmessage) {
        const { from, image, text: { body: text } = {} } = lastmessage;
        const to = phone(from);
        const name = contact.find(from);
        if (image) {
          console.log(image, "image");
          // get url
          const {
            data: { url },
          } = await Media.info(image.id);
          if (url) {
            // download
            const { data } = await Media.download(url);
            // cache
            await data.pipe(fs.createWriteStream(imagepath));
            // parse with tesseract and format text
            const reply = (await tesseract(imagepath)).trim();
            // reply with text
            await send(to, reply);
            ai.read("<sent_image>", name);
            ai.read(reply);
          }
        }
        if (text) {
          if (text.startsWith("/name")) contact.store(from, text);
          ai.read(text, name);
          log({ lastmessage });
          const reply = await ai.write;
          log(`will reply ${to}: ${reply}`);
          await send(to, reply);
        }
      } else {
        if (lastmetadata) {
          // log({ lastmetadata });
        } else if (laststatuses) {
          log({ laststatuses });
        } else {
          log({ lastchange });
        }
      }
    } else {
      // console.log(req);
    }
  } catch (e) {
    log(e);
    // res.status(500).send("unexpected webhook");
  }
  res.status(200).end();
});

app.listen(PORT, () => log(`🤖 listening to ${PORT} 🤖`));
