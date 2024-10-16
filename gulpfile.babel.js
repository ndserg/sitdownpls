import gulp from "gulp";

import path from "./gulp/config/path.js";

import plugins from "./gulp/config/plugins.js";

import clean from "./gulp/tasks/clean.js";
import copy from "./gulp/tasks/copy.js";
import html from "./gulp/tasks/html.js";
import scss from "./gulp/tasks/scss.js";
import js from "./gulp/tasks/js.js";
import images from "./gulp/tasks/images.js";
import svgSprite from "./gulp/tasks/svg-sprite.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import server from "./gulp/tasks/server.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

const watcher = () => {
  gulp.watch(path.watch.scss, { usePolling: true }, scss);
  gulp.watch(path.watch.html, { usePolling: true }, html);
  gulp.watch(path.watch.images, { usePolling: true }, images);
  gulp.watch(path.watch.svgicons, { usePolling: true }, svgSprite);
  gulp.watch(path.watch.js, { usePolling: true }, js);
};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
  fonts,
  images,
  gulp.parallel(copy, html, scss, svgSprite, js)
);

const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const prod = gulp.series(clean, mainTasks);

gulp.task("default", dev);
gulp.task("build", prod);
