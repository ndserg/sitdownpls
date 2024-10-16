import * as sassCompiler from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(sassCompiler);

const scss = () => (
  app.gulp.src(app.path.src.scss)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SCSS',
        message: 'Error: <%= error.message %>',
      }),
    ))
    .pipe(app.plugins.if(!app.isBuild, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(autoprefixer({
      grid: true,
      cascade: true,
    }))
    // Раскомментировать если нужен не сжатый дубль файла стилей
    //.pipe(app.gulp.dest(app.path.build.css))
    .pipe(
      app.plugins.if(app.isBuild, cleanCss()),
    )
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(app.plugins.if(!app.isBuild, sourcemaps.write('sourcemaps')))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream())
);

export default scss;
