import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { src, dest } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
const bulk = require("gulp-sass-bulk-importer");
import autoprefixer from "gulp-autoprefixer";
import clean from "gulp-clean-css";
import concat from "gulp-concat";

export default function style() {
  return src("./src/scss/main.scss")
    .pipe(bulk())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
        browsers: [
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 11",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6",
        ],
      })
    )
    .pipe(
      clean({
        level: 2,
      })
    )
    .pipe(concat("main.css"))
    .pipe(dest("./src/styles/"));
}
