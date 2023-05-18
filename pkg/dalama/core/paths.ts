import * as os from "node:os";

/**
 * The DalamaPaths class in the provided code defines paths to various directories and files related to the Llama.cpp program, assuming that Llama.cpp is located in the system's home directory. Here's an overview of its properties:
 *
 * - homedir: Retrieves the system's home directory using the os.homedir() function from the node:os module.
 * - llamadir: Represents the path to the Llama.cpp directory, which is constructed by appending /llama.cpp to the homedir path.
 * - maindir: Represents the path to the main directory within the Llama.cpp directory.
 * - modelsdir: Represents the path to the models directory within the Llama.cpp directory.
 * - models: An object that contains paths to specific model files.
 * - promptsdir: Represents the path to the prompts directory within the Llama.cpp directory.
 * - prompts: An empty object, potentially intended to store paths to specific prompt files in the future.
 */
export default class DalamaPaths {
  static homedir = os.homedir();
  static llamadir = this.homedir + "/llama.cpp";
  static maindir = this.llamadir + "/main";
  static modelsdir = this.llamadir + "/models";
  static models = {
    llama7b: this.modelsdir + "/llama/7B/ggml-model-q4_0.bin",
    // alpaca7b: this.modelsdir + "/alpaca/ggml-model-q8_0.bin",
    // vicuna7b: this.modelsdir + "/vicuna/7B/ggml-vic7b-uncensored-q5_1.bin",
  };
  static promptsdir = this.llamadir + "/prompts";
  static prompts = {};
}
