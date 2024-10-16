import fileInclude from "gulp-file-include";
import htmlBeautify from "gulp-html-beautify";
import htmlMinify from "gulp-htmlmin";

const beautifyOptions = {
  indent_size: 2,
  indent_char: " ",
  eol: "\n",
  indent_level: 0,
  indent_with_tabs: false,
  max_preserve_newlines: 1,
  preserve_newlines: true,
};

const html = () =>
  app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude())
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(app.plugins.if(!app.isBuild, htmlBeautify(beautifyOptions)))
    .pipe(
      app.plugins.if(
        app.isBuild,
        htmlMinify({
          removeComments: true,
          collapseWhitespace: true,
          ignoreCustomFragments: [/<br>\s/gi],
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());

export default html;
