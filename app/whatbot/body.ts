import { WebhookObject } from "whatsapp/build/types/webhooks";

export default class WebhookBody implements WebhookObject {
  object: WebhookObject["object"];
  entry: WebhookObject["entry"];
  constructor({ object, entry }: WebhookObject) {
    this.object = object;
    this.entry = entry;
  }
  get lastchange() {
    return this.entry[0].changes[0];
  }
  get lastmessage() {
    if (!this.lastchange.value.messages) return null;
    const message = this.lastchange.value.messages[0];
    const late = Date.now() > Number(message.timestamp) * 1000 + 5000;
    if (late) return null;
    return this.lastchange.value.messages[0];
  }
  get lastmetadata() {
    if (!this.lastchange.value.metadata) return null;
    return this.lastchange.value.metadata;
  }
  get laststatuses() {
    if (!this.lastchange.value.statuses) return null;
    return this.lastchange.value.statuses;
  }
}
