var gulp        = require('gulp');
var sass        = require('gulp-sass');
var rollup      = require('rollup-stream');
var gutil       = require('gulp-util');
var buffer      = require('gulp-buffer');
var rename      = require('gulp-rename');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream');
var resolveNode = require('rollup-plugin-node-resolve')
var commons     = require('rollup-plugin-commonjs');

var fs                = require('fs');
var path              = require('path');
var cssTaskDictionary = [];
var cssTaskList       = [];
var jsTaskDictionary  = [];
var jsTaskList        = [];
var watchTaskList     = [];

var publicFolder = './public';

var cssSrcPath = './public/scss/';
var cssDest    = './public/css/build/';

var jsSrcPath = './public/js/src';
var jsDest    = './public/js/build/';

// Read ./public/sass directory files
(fs.readdirSync(cssSrcPath) || []).filter(function (file) {
  return /^[a-zA-Z]*\.(scss)$/.test(file) && !/global/.test(file);
}).forEach(function(fileName){
  var ctrl = fileName.replace(/\.scss/, '');

  // Output compressed styles for prod and dev
  var outputStyle = {outputStyle: 'expanded'};
  if (process.env.ENV == 'prod' || process.env.ENV == 'dev') {
    outputStyle.outputStyle = 'compressed';
  }

  // Sass will watch for changes in this files
  var srcPathFile  = path.join(cssSrcPath, fileName);
  var ctrlPathFile = path.join(cssSrcPath + ctrl, '_' + fileName);

  // Instantiate ctrl specific style tasks
  var taskName = 'styles-' + ctrl;
  cssTaskList.push(taskName);

  gulp.task(taskName, function() {
  gulp.src([srcPathFile, ctrlPathFile])
    .pipe(sass(outputStyle).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
  });

  // Instantiate ctrl specific watch tasks
  var watchTaskName = 'watch-' + ctrl;
  watchTaskList.push(watchTaskName);

  gulp.task(watchTaskName, function () {
    gulp.watch([srcPathFile, ctrlPathFile], [taskName]);
  })
});

// Read ./public/js/src/ files
(fs.readdirSync(jsSrcPath) || []).filter(function (file) {
  return fs.lstatSync(path.join(jsSrcPath, file)).isDirectory();
}).forEach(function (ctrl) {
  // this directory should mirror a controller on zend
  jsTaskDictionary = jsTaskDictionary.concat((fs.readdirSync(path.join(jsSrcPath, ctrl)) || [])
    .filter(function (fileCtrl) {
      return fs.lstatSync(path.join(jsSrcPath, ctrl, fileCtrl)).isDirectory();
    }).map(function (actionName) { return { ctrl: ctrl, action: actionName }; }));
});

jsTaskDictionary.forEach(function (taskDef) {

  var taskSuffix = '-' + taskDef.ctrl + '-' + taskDef.action;
  jsTaskList.push('js' + taskSuffix);
  watchTaskList.push('watch' + taskSuffix);

  // build prod tasks
  gulp.task('js' + taskSuffix, function () {

    var $rollup = rollup({
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
  gulp.task('watch' + taskSuffix, function () {
    gulp.watch(path.join(jsSrcPath, taskDef.ctrl, taskDef.action, '*.js'), ['js' + taskSuffix]);
  })
});

gulp.task('control', function(){
  gulp.watch('./public/js/control/*.js', jsTaskList);
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
