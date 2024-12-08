import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { src, dest } from "gulp";
import changed from "gulp-changed";
import imagemin, { gifsicle, optipng, svgo } from "gulp-imagemin";
const recompress = require("imagemin-jpeg-recompress");
import pngquant from "imagemin-pngquant";
const plumber = require("gulp-plumber");

export default function rastr() {
  return src("source-images/**/*.+(png|jpg|jpeg|gif|svg|ico)", {
    encoding: false,
  })
    .pipe(plumber())
    .pipe(changed("src/public/images"))
    .pipe(
      imagemin(
        {
          interlaced: true,
          progressive: true,
          optimizationLevel: 5,
        },
        [
          recompress({
            loops: 6,
            min: 50,
            max: 90,
            quality: "high",
            use: [
              pngquant({
                quality: [0.8, 1],
                strip: true,
                speed: 1,
              }),
            ],
          }),
          gifsicle(),
          optipng(),
          svgo(),
        ]
      )
    )
    .pipe(dest("src/public/images"));
}
