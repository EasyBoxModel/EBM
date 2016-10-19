let gulp        = require('gulp');
let sass        = require('gulp-sass');
let rollup      = require('rollup-stream');
let gutil       = require('gulp-util');
let buffer      = require('gulp-buffer');
let rename      = require('gulp-rename');
let sourcemaps  = require('gulp-sourcemaps');
let uglify      = require('gulp-uglify');
let source      = require('vinyl-source-stream');
let resolveNode = require('rollup-plugin-node-resolve')
let commons     = require('rollup-plugin-commonjs');

let fs                = require('fs');
let path              = require('path');
let cssTaskDictionary = [];
let cssTaskList       = [];
let jsTaskDictionary  = [];
let jsTaskList        = [];
let watchTaskList     = [];

// SRC PATH definitions
let publicFolder = './public';

let cssSrcPath = `${publicFolder}/sass/`;
let cssDest    = `${publicFolder}/css/build/`;

let jsSrcPath = `${publicFolder}/js/src`;
let jsDest    = `${publicFolder}/js/build/`;

// Read ./public/sass directory files
(fs.readdirSync(cssSrcPath) || []).filter(file => {
  return /^[a-zA-Z]*\.(scss)$/.test(file) && !/global/.test(file);
}).forEach(fileName => {
  let ctrl = fileName.replace(/\.scss/, '');

  // Output compressed styles for prod and dev
  let outputStyle = {outputStyle: 'expanded'};
  if (process.env.ENV == 'prod' || process.env.ENV == 'dev') {
    outputStyle.outputStyle = 'compressed';
  }

  // Sass will watch for changes in this files
  let srcPathFile  = path.join(cssSrcPath, fileName);
  let ctrlPathFile = path.join(cssSrcPath + ctrl, '_' + fileName);

  // Instantiate ctrl specific style tasks
  let taskName = 'styles-' + ctrl;
  cssTaskList.push(taskName);

  gulp.task(taskName, () => {
  gulp.src([srcPathFile, ctrlPathFile])
    .pipe(sass(outputStyle).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
  });

  // Instantiate ctrl specific watch tasks
  let watchTaskName = 'watch-' + ctrl;
  watchTaskList.push(watchTaskName);

  gulp.task(watchTaskName, () => {
    gulp.watch([srcPathFile, ctrlPathFile], [taskName]);
  })
});

// Read ./public/js/src/ files
(fs.readdirSync(jsSrcPath) || []).filter(file => {
  return fs.lstatSync(path.join(jsSrcPath, file)).isDirectory();
}).forEach(ctrl => {
  // this directory should mirror a controller on zend
  jsTaskDictionary = jsTaskDictionary.concat((fs.readdirSync(path.join(jsSrcPath, ctrl)) || [])
    .filter(fileCtrl => {
      return fs.lstatSync(path.join(jsSrcPath, ctrl, fileCtrl)).isDirectory();
    }).map(actionName => { 
      return { ctrl: ctrl, action: actionName }; 
    }));
});

jsTaskDictionary.forEach(taskDef => {

  let taskSuffix = '-' + taskDef.ctrl + '-' + taskDef.action;
  jsTaskList.push('js' + taskSuffix);
  watchTaskList.push('watch' + taskSuffix);

  // build prod tasks
  gulp.task('js' + taskSuffix, () => {

    let $rollup = rollup({
        entry: path.join(jsSrcPath, taskDef.ctrl, taskDef.action, 'main.js'),
        sourceMap: true,
        format: 'iife',
        moduleName: taskDef.ctrl + '.' + taskDef.action + '.js',
        plugins: [
          resolveNode({ jsnext: true, main: true }),
          commons(),
        ],
      })
      .pipe(source('main.js'))
      .pipe(buffer());
      if (process.env.ENV == 'prod' || process.env.ENV == 'dev') {
        $rollup.pipe(uglify());
      }
      $rollup.pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(rename(taskDef.ctrl + '.' + taskDef.action + '.js'))
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(jsDest));

      return $rollup;
  });

  // watch tasks
  gulp.task('watch' + taskSuffix, () => {
    gulp.watch(path.join(jsSrcPath, taskDef.ctrl, taskDef.action, '*.js'), ['js' + taskSuffix]);
  })
});

gulp.task('control', () => {
  gulp.watch(`${publicFolder}/js/control/*.js`, jsTaskList);
});
watchTaskList.push('control');

// Build styles task
gulp.task('styles', cssTaskList);

// Build js task
gulp.task('js', jsTaskList);

// Keep watching both CSS and JS changes
gulp.task('watch', watchTaskList);

// Build both CSS and JS tasks in Jenkins build
gulp.task('default', ['styles', 'js']);
