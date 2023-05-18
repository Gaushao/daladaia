import User from "./user";

interface MessageFc {
  id: string;
  text: string;
  time: string;
  author: User;
}

function pad(n: number, size = 2) {
  let num = n.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export default class Message implements MessageFc {
  id = "";
  time = "";
  text = "";
  author = new User();
  constructor(message: Partial<MessageFc>) {
    const now = Date.now();
    const self = {
      ...this,
      ...message,
    };
    const datenow = new Date(now);
    const hours = pad(datenow.getHours());
    const minutes = pad(datenow.getMinutes());
    return {
      ...self,
      id: `${self.author.name}-${now}`,
      time: hours + ":" + minutes,
      ...message,
    };
  }
}
