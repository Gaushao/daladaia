/**
 * provides a convenient way to construct and manipulate the parameters for the Llama.cpp file in TypeScript.
 */
export default class DalamaParams {
  /**
   * @param m - `-m FNAME, --model FNAME`: Specify the path to the LLaMA model file (e.g., `models/7B/ggml-model.bin`).
   */
  m?: string;
  /**
   * @param p - `-p PROMPT. --prompt PROMPT`: Provide a prompt directly as a command-line option.
   */
  p?: string;
  /**
   * @param f - `-f FNAME, --file FNAME`: Provide a file containing a prompt or multiple prompts.
   */
  f?: string;

  /**
   * @param c - `-c N, --ctx_size N`: Set the size of the prompt context. The default is 512, but LLaMA models were built with a context of 2048, which will provide better results for longer input/inference.
   */
  c?: string;
  /**
   * @param ins - `-ins, --instruct`: Run the program in instruction mode, which is specifically designed to work with Alpaca models that excel in completing tasks based on user instructions.
   */
  ins?: string;
  /**
   * @param {Partial<DalamaParams>} params - wraps the value of the p property with double quotes, creates a new instance of DalamaParams with the provided params, and converts the properties into an array of key-value pairs.
   * @returns Each property is mapped to an array in the format ["-" + key, value], and the resulting array is flattened before being returned.
   */
  static entries(params: Partial<DalamaParams>) {
    params.p = `"${params.p}"`;
    return Object.entries(new DalamaParams(params))
      .map(([k, v]) => ["-" + k, v])
      .flat();
  }
  constructor(params: Partial<DalamaParams>) {
    return params;
  }
}
