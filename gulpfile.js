var gulp         = require('gulp'),
    gp           = require('gulp-load-plugins')(),
    uglifyEs = require('gulp-uglify-es').default,
    // sass         = require('gulp-sass'), // Sass компілятор в css
    // sourcemaps   = require('gulp-sourcemaps'),
    // concat       = require('gulp-concat'), // З'єднує (конкатенує) файли
    autoprefixer = require('autoprefixer'), // PostCss autoprefixer - автоматично формує вендорні префікси
    // cssmin       = require('gulp-cssmin'), // Мініфікація css
    // rename       = require('gulp-rename'), // Перейменування файлу
    // postcss      = require('gulp-postcss'), // PostCss
    // mqpacker     = require('css-mqpacker'), // Збирає всі медіа-запити в одному місці
    // imagemin     = require('gulp-imagemin'),
    // svgstore     = require('gulp-svgstore'),
    // svgmin       = require('gulp-svgmin'),
    del          = require('del'), // Видаляє папки, файли
    // run          = require('run-sequence'), // Запускає послідовно задачі
    // plumber      = require('gulp-plumber'), // Відслідковування і вивід в консоль помилок
    // notify       = require("gulp-notify"), // Вивід повідомлення про помилку
    // cheerio      = require('gulp-cheerio'),
    // browserify = require('browserify'),
    // source = require('vinyl-source-stream'),
    gcmq         = require('gulp-group-css-media-queries'),
    browserSync  = require('browser-sync').create(); // Сервер

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    // tunnel: 'sedona',
    notify: false
  });
});

gulp.task('html', function() {
  gulp.src('app/*.{html,php}')
    .pipe(gp.plumber())
    .pipe(gp.rigger())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});


gulp.task('styles', function() {
  return gulp.src('app/sass/style.sass')
  .pipe(gp.plumber())
  .pipe(gp.sourcemaps.init())
  .pipe(gp.sass({outputStyle: 'nested'}).on('error', gp.notify.onError()))
  .pipe(gp.sourcemaps.write())
  .pipe(gp.postcss([
      autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
      }),
      // mqpacker({
      //   sort: true
      // })
    ]))
  .pipe(gcmq())
  .pipe(gulp.dest('app/css'))
  .pipe(gp.csso({
    comments: false
  }))
  .pipe(gp.rename({suffix: '.min'}))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('app/js/common.js')
  .pipe(gp.plumber())
  .pipe(uglifyEs())
  .pipe(gp.rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.stream());
});

gulp.task('script', function() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jquery-popup-overlay/jquery.popupoverlay.js',
      'node_modules/jquery-validation/dist/jquery.validate.min.js',
      'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
      'node_modules/swiper/dist/js/swiper.min.js',
      'node_modules/jscrollpane/script/jquery.mousewheel.js',
      'node_modules/jscrollpane/script/jquery.jscrollpane.min.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      'node_modules/jquery-match-height/dist/jquery.matchHeight-min.js'
    ])
  .pipe(gp.concat('script.js'))
  // .pipe(gp.uglify())
  .pipe(gulp.dest('build/js/'));
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('build/fonts'))
});

gulp.task('images', function() {
  return gulp.src('app/img/**/*')
    // .pipe(imagemin([
    //  imagemin.optipng({optimizationLevel: 3}),
    //  imagemin.jpegtran({progressive: true})
    // ]))
    .pipe(gulp.dest('build/img'))
});

gulp.task('bat', function() {
  gulp.src('app/bat/**/*')
    .pipe(gulp.dest('build/bat'))
    .pipe(browserSync.stream());
});

gulp.task('svg', function() {
  return gulp.src('app/img/icon/*.svg')
  .pipe(gp.svgmin({
    js2svg: {
      pretty: true
    }
  }))
  .pipe(gp.cheerio({
    run: function($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
  }))
  .pipe(gp.replace('&gt;', '>'))
  .pipe(gp.svgSprite({
    mode: {
      symbol: {
        sprite: "../symbols.svg"
      }
    }
  }))
  .pipe(gulp.dest('build/img/icon/'));
});

// gulp.task('symbols', function() {
//   return gulp.src('app/img/icon/*.svg')
//     .pipe(svgmin())
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(cheerio({
//       run: function($) {
//         $('[fill]').removeAttr('fill');
//         $('[style]').removeAttr('style');
//         $('[class]').removeAttr('class');
//         $('title').remove();
//         $('defs').remove();
//         $('style').remove();
//         $('svg').attr('style', 'display:none');
//       }
//     }))
//     .pipe(rename('symbols.html'))
//     .pipe(gulp.dest('app/img'));
// });

gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.sass', ['styles']);
  gulp.watch('app/**/*.{html,php}', ['html']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('app/img/**/*.{png,jpg,svg}', ['images']);
  gulp.watch('app/bat/**/*', ['bat']);
  gulp.watch('app/js/common.js', ['js']);
});


/* Project transfer to production */
gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('clean:img', function() {
  return del.sync('build/img');
});

gulp.task('build', ['clean', 'styles', 'svg'], function(){
  gulp.src(['app/css/style.min.css'])
    .pipe(gulp.dest('dist/css'));

  gulp.src(['app/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts'));

  gulp.src(['app/js/**/*'])
    .pipe(gulp.dest('dist/js'));

  gulp.src(['app/img/symbols.html'])
    .pipe(gulp.dest('dist/img'));

  gulp.src(['app/*.html'])
    .pipe(gulp.dest('dist'));
});


gulp.task('default', ['html', 'styles', 'script', 'js', 'fonts', 'images', 'bat', 'watch', 'browser-sync']);