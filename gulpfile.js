import { watch, parallel, series } from "gulp";
import styleTask from "./tasks/style.js";
import rastrTask from "./tasks/rastr.js";
import webpTask from "./tasks/webp.js";

export const style = styleTask;
export const rastr = rastrTask;
export const webp = webpTask;

function watching() {
  watch("./src/scss/**/*.scss", parallel(style));
  watch("./source-images/**/*.+(svg|ico)", parallel(rastr));
  watch("./source-images/**/*.+(png|jpg|jpeg|gif)", series(rastr, webp));
}

export default parallel(style, rastr, webp, watching);
