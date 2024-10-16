import webpack from 'webpack-stream';
import TerserPlugin from 'terser-webpack-plugin';

const mode = {
  dev: 'development',
  prod: 'production',
};

const options = (isBuild) => ({
  mode: isBuild ? mode.prod : mode.dev,
  output: {
    filename: 'main.min.js',
  },
  devtool: isBuild ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: isBuild ? true : false,
    minimizer: [
        new TerserPlugin({}),
    ],
  },
});

const js = () => (
  app.gulp.src(app.path.src.js)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>',
      }),
    ))
    .pipe(webpack(options(app.isBuild)))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream())
);

export default js;
