import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./source";

const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    manifest: `${srcFolder}/*.webmanifest`,
    favicon: `${srcFolder}/*.{ico,png}`,
    js: `${srcFolder}/js/main.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
};

export default path;
