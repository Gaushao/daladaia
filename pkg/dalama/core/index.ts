import DalamaPaths from "./paths";
import spawn from "./spawn";
import die from "./die";

export default class DalamaCore {
  static Paths = DalamaPaths;
  static spawn = spawn;
  static die = die;
  static stop = () => spawn({ p: "/stop" });
}
