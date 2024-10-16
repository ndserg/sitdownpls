import svgSpriter from "gulp-svg-sprite";

const svgSprite = () =>
  app.gulp
    .src(app.path.src.svgicons)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG-Sprite",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSpriter({
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    name: "removeAttrs",
                    params: {
                      attrs: "(fill)",
                    },
                  },
                ],
              },
            },
          ],
        },
        mode: {
          symbol: {
            sprite: "sprite.svg",
            example: !app.isBuild,
            dest: `./icons/`,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.images));

export default svgSprite;
