import webp from "gulp-webp";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";

const imgMinOptions = (isBuild) => {
  const opts = [
    gifsicle({ interlaced: true }),
    svgo({
      plugins: [
        {
          name: "removeViewBox",
          active: false,
        },
      ],
    }),
  ];

  if (isBuild) {
    opts.push(
      mozjpeg({ quality: 75, progressive: true }),
      optipng({ optimizationLevel: app.isBuild ? 3 : 0 })
    );
  }

  return opts;
};

const images = () =>
  app.gulp
    .src(app.path.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(imagemin(imgMinOptions(app.isBuild)))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());

export default images;
