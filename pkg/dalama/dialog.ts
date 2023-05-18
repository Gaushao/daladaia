/**
 * Overall, the Dialog class provides a way to create dialog instances, assign an AI name to them, add new messages to the dialog's history, and retrieve tagged messages. It can be used to store and manage conversation history for AI interactions.
 */
export default class Dialog {
  /**
   * The name of the AI associated with the dialog.
   */
  name = "";
  /**
   * The history of messages in the dialog.
   */
  history = "";
  /**
   * Constructs a new Dialog instance.
   * @param name The name of the AI. Defaults to "DalAI".
   */
  constructor(name = "DalAI") {
    this.name = name;
  }
  /**
   * Adds a tag to a message.
   * The tag method is used to add a tag to a message. It takes an optional message parameter and an optional name parameter (defaulting to the AI's name). It returns a string representing the tagged message in the format [AI Name]: Message.
   * @param message The message to tag.
   * @param name The name to use for the tag. Defaults to the instance's name.
   * @returns The tagged message.
   */
  tag(message = "", name = this.name) {
    return `[${name}]: ${message}`;
  }
  /**
   * Adds a new message to the dialog's history.
   * The add method is used to add a new message to the dialog's history. It takes an optional message parameter and an optional name parameter (defaulting to the AI's name). It appends the tagged message to the existing history property, separated by newlines.
   * @param message The message to add.
   * @param name The name to associate with the message. Defaults to the AI's name.
   */
  add(message = "", name = this.name) {
    this.history = `${this.history}
    ${this.tag(message, name)}`;
  }
}
