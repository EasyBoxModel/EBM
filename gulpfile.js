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
let publicFolder = './PUBLIC';
let srcFolder = './SRC_FOLDER';

let cssSrcPath = `${srcFolder}/sass`;
let cssDest    = `${publicFolder}/css`;

let jsSrcPath = `${srcFolder}/js/src`;
let jsDest    = `${publicFolder}/js/build`;

// Gather Scss src files to watch and compile
(fs.readdirSync(cssSrcPath) || []).filter(directory => {
  var isDirectory = fs.lstatSync(path.join(cssSrcPath, directory)).isDirectory();
  return !/global/.test(directory) && isDirectory;
}).forEach(module => {
  (fs.readdirSync(path.join(cssSrcPath, module)) || []).filter(moduleCtrl => {
    return fs.lstatSync(path.join(cssSrcPath, module, moduleCtrl)).isDirectory();
  }).forEach(ctrl => {
    fs.readdirSync(path.join(cssSrcPath, module, ctrl)).forEach(file => {
      cssTaskDictionary.push({ module: module, ctrl: ctrl, file: file });
    });
  });
});

cssTaskDictionary.forEach(taskDef => {

  var file = taskDef.file.replace(/\.scss/, '');
  file = file.replace(/_/, '');
  var taskSuffix = '-' + taskDef.module + '-' + taskDef.ctrl + '-' + file;
  var taskName = 'css' + taskSuffix;
  cssTaskList.push(taskName);

  // Output compressed styles for prod and dev
  var outputStyle = {outputStyle: 'expanded'};
  if (process.env.ENV == 'prod' || process.env.ENV == 'dev') {
    outputStyle.outputStyle = 'compressed';
  }

  // Sass will watch for changes in these files
  var srcPathFile = path.join(cssSrcPath, taskDef.module, taskDef.ctrl, taskDef.file);

  gulp.task(taskName, () => {
    gulp.src([srcPathFile])
      .pipe(sass(outputStyle).on('error', sass.logError))
      .pipe(gulp.dest(path.join(cssDest, taskDef.module, taskDef.ctrl))
    );
  });

  // Instantiate ctrl specific watch tasks
  var watchTaskName = 'watch-' + taskName;
  watchTaskList.push(watchTaskName);
  gulp.task(watchTaskName, () => {
    gulp.watch([srcPathFile], [taskName]);
  });
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
      .pipe(gulp.dest(path.join(jsDest, taskDef.ctrl, taskDef.action)));

      return $rollup;
  });

  // watch tasks
  gulp.task('watch' + taskSuffix, () => {
    gulp.watch(path.join(jsSrcPath, taskDef.ctrl, taskDef.action, '*.js'), ['js' + taskSuffix]);
  })
});

// Watch for js/control files changes
// It will trigger all js tasks
gulp.task('control', () => {
  gulp.watch(`${publicFolder}/js/control/*.js`, jsTaskList);
});
watchTaskList.push('control');

// Watch for css/global
// Triggers all css tasks
gulp.task('global', () => {
  gulp.watch(`${cssSrcPath}/global/*.scss`, cssTaskList);
  gulp.watch(`${cssSrcPath}/_ebm-overrides.scss`, cssTaskList);
  gulp.watch(`${cssSrcPath}/global.scss`, cssTaskList);
});
watchTaskList.push('global');

// Build styles task
gulp.task('styles', cssTaskList);

// Build js task
gulp.task('js', jsTaskList);

// Keep watching both CSS and JS changes
gulp.task('watch', watchTaskList);

// Build both CSS and JS tasks in Jenkins build
gulp.task('default', ['styles', 'js']);
