import axios from "axios";

export default class Messager {
  static data(to: string, text: string) {
    return JSON.stringify({
      messaging_product: "whatsapp",
      preview_url: false,
      recipient_type: "individual",
      to,
      type: "text",
      text: {
        body: text,
      },
    });
  }
  static send(to: string, text: string) {
    return axios({
      method: "post",
      url: `https://graph.facebook.com/${process.env.CLOUD_API_VERSION}/${process.env.WA_PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: Messager.data(to, text),
    });
  }
}
