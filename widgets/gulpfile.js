'use strict'
//utils
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var exec = require('child_process');

//js
var uglify = require('gulp-uglify');

//less
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var comstrip = require('gulp-strip-css-comments');

var dist = 'dist/'

var widgets = {
  battery: {
    in: {
	  folder: 'battery/',
	  img: 'battery/battery.png',
	  idejs: ['battery/battery.ide.js'],
      runtimejs: ['battery/battery.runtime.js'],
	  depjs: ['battery/battery.js'],
      idescss: ['battery/battery.scss'],
      runtimescss: ['battery/battery.scss']
    },
    out: {
	  folder: './../ui/battery/',
	  idejs: 'battery.ide.js',
      runtimejs: 'battery.runtime.js',
	  depjs: 'battery.js',
      idecss: 'battery.ide.css',
      runtimecss: 'battery.runtime.css'
	}
  }
};

gulp.task('ide:scss', function() {
    return	gulp.src(widgets.battery.in.idescss)
					.pipe(sass())
					.pipe(comstrip({
						preserve: false
					}))
					.pipe(autoprefixer({
						browsers: ['last 5 versions']
					}))
					.pipe(csso())
					.pipe(rename(widgets.battery.out.idecss))
					.pipe(gulp.dest(widgets.battery.out.folder))
});

gulp.task('runtime:scss', function() {
    return	gulp.src(widgets.battery.in.runtimescss)
					.pipe(sass())
					.pipe(comstrip({
						preserve: false
					}))
					.pipe(autoprefixer({
						browsers: ['last 5 versions']
					}))
					.pipe(csso())
					.pipe(rename(widgets.battery.out.runtimecss))
					.pipe(gulp.dest(widgets.battery.out.folder))
});

gulp.task('build:css', ['ide:scss', 'runtime:scss']);

gulp.task('ide:js', function() {
    return gulp.src(widgets.battery.in.idejs)
        .pipe(concat(widgets.battery.out.idejs))
        .pipe(uglify())
        .pipe(gulp.dest(widgets.battery.out.folder));
});

gulp.task('runtime:js', function() {
    return gulp.src(widgets.battery.in.runtimejs)
        .pipe(concat(widgets.battery.out.runtimejs))
        .pipe(uglify())
        .pipe(gulp.dest(widgets.battery.out.folder));
});

gulp.task('dep:js', function() {
    return gulp.src(widgets.battery.in.depjs)
        .pipe(concat(widgets.battery.out.depjs))
        .pipe(uglify())
        .pipe(gulp.dest(widgets.battery.out.folder));
});

gulp.task('build:js', ['ide:js', 'runtime:js', 'dep:js']);

gulp.task('build:img', function() {
    return gulp.src(widgets.battery.in.img)
        .pipe(gulp.dest(widgets.battery.out.folder));
});

gulp.task('build:extension', ['build:js', 'build:css', 'build:img'], function() {
	return exec.exec('ant build -f ./../build-extension.xml', function (err, stdout, stderr) {
				//console.log(stdout);
				console.log(stderr);
			  });
});

gulp.task('default', ['build:js', 'build:css', 'build:img', 'build:extension']);