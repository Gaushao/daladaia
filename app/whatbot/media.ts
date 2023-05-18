import axios from "axios";

export default class Media {
  // static data(to: string, text: string) {
  //   return JSON.stringify({
  //     messaging_product: "whatsapp",
  //     preview_url: false,
  //     recipient_type: "individual",
  //     to,
  //     type: "text",
  //     text: {
  //       body: text,
  //     },
  //   });
  // }
  static download(url: string) {
    return axios({
      method: "get",
      responseType: "stream",
      url,
      headers: {
        Authorization: `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`,
        // "Content-Type": "application/json",
      },
    });
  }
  static info(id: string) {
    return axios({
      method: "get",
      url: `https://graph.facebook.com/${process.env.CLOUD_API_VERSION}/${id}`,
      headers: {
        Authorization: `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`,
        // "Content-Type": "application/json",
      },
    });
  }
}
