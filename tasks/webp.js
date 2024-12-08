import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { src, dest } from "gulp";

import webpConv from "gulp-webp";
import changed from "gulp-changed";
const plumber = require("gulp-plumber");

export default function webp() {
  return src("source-images/**/*.+(png|jpg|jpeg)", {
    encoding: false,
  })
    .pipe(plumber())
    .pipe(
      changed("src/public/images", {
        extension: ".webp",
      })
    )
    .pipe(webpConv())
    .pipe(dest("src/public/images"));
}
