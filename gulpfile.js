var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  changed = require('gulp-changed'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  header = require('gulp-header'),
  runSequence = require('run-sequence'),
  rename = require('gulp-rename'),
	injector = require('gulp-injector'),
  browserSync = require('browser-sync');

var pkg = require('./package.json'),
    paths = {
    	src: ['src/main.js'],
			scripts: ['src/*.js'],
    	dist: 'dist'
  	},
  	uncompressedJs = 'template.js',
  	compressedJs = 'template.min.js';


var banner = [
   '/*',
   ' * <%= pkg.title || pkg.name %>',
   ' * <%= pkg.version %> (<%= new Date().toISOString().slice(0, 10) %>)',
   ' *',
   ' * Released under the MIT license',
   ' * http://opensource.org/licenses/MIT',
   ' *',
   ' * Copyright 2011-<%= new Date().getFullYear() %> <%= pkg.author.name %>[<%= pkg.author.email %>]',
   ' *',
   ' */',
   ' ',
   ' ' ].join('\n');

gulp.task('clean', function(cb) {
  del([paths.dist], cb);
});

gulp.task('remote_scripts', function(){
  var files = paths.remote_scripts;

  for(var i = 0, l = files; i < l; i++){
    download(files[i]).pipe(gulp.dest(paths.lib));
  }
});

gulp.task('templates', function(){
  return gulp.src(paths.views)
    .pipe
});

gulp.task('scripts', function() {

 return gulp.src(paths.src)
  .pipe(concat(uncompressedJs))
	.pipe(injector())
  .pipe(header(banner, { pkg: pkg } ))
  .pipe(gulp.dest(paths.dist))
//  .pipe(sourcemaps.init())
//  .pipe(uglify({preserveComments: 'all'}))
  .pipe(rename(compressedJs))
  .pipe(gulp.dest(paths.dist))

});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./examples",
      routes: {
        '/dist/template.js': './dist/template.js'
      }
    }
  });
});

gulp.task('build', function(cb){
  runSequence('clean', 'scripts', cb)
});

gulp.task('default', function(cb){
  runSequence('clean', 'scripts', ['browser-sync', 'watch'])
});
