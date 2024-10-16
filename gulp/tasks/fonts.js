import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

const otfToTtf = () => (
  app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>',
      }),
    ))
    .pipe(fonter({
      formats: ['ttf'],
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
);

const ttfToWoff = () => (
  app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>',
      }),
    ))
    .pipe(fonter({
      formats: ['woff'],
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
);

const fontsStyle = () => {
  // Файл стилей подключения шрифтов
  const fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет создаем его
        fs.writeFile(fontsFile, '', (error) => { if (error) throw error; });

        const allFiles = [];

        for (let i = 0; i < fontsFiles.length; i++) {
          // Записываем подключение шрифтов в файл стилей
          const fontFileName = fontsFiles[i].split('.')[0];
          if (!allFiles.includes(fontFileName)) {
            allFiles.push(fontFileName);
            const fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: "${fontName}";\n\tfont-style: normal;\n\tfont-weight: ${fontWeight};\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"),\n\turl("../fonts/${fontFileName}.woff") format("woff");\n\tfont-display: swap;\n}\r\n\n`, (error) => { if (error) throw error; });
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log('Файл scss/fonts.scss уже существует. Для обновления файла его нужно удалить вручную! Чтоб Gulp не перезаписывал ваши шрифты.');
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
};

export { otfToTtf, ttfToWoff, fontsStyle };
