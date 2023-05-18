export default class Contact {
  stored: Partial<Record<string, string>> = {};
  store(id: string, command: string) {
    const name = command.replace("/name", "").trim();
    if (name.length) this.stored[id] = name;
  }
  find(id: string) {
    const name = this.stored[id];
    return name || id;
  }
}
