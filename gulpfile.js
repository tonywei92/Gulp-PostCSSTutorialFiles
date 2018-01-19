var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('styles', function(){
	return gulp.src('app/assets/styles/styles.css')
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
		.on('error', function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('app/styles'))
});

gulp.task('cssInject', ['styles'], function(){
	return gulp.src('app/styles/styles.css')
		.pipe(browserSync.stream());
});

gulp.task('watch', function(){
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});

	watch('app/index.html', function(){
		browserSync.reload();
	});

	watch('app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});
});