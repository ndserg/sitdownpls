const copy = () =>
  app.gulp
    .src([app.path.src.manifest, app.path.src.favicon], {
      base: app.path.srcFolder,
    })
    .pipe(app.gulp.dest(app.path.buildFolder));

export default copy;
