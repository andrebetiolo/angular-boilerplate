/*Carregamento das váriavies*/
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');

/** Task para dar reload no browser*/
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

/**Cria o watch dos arquivos js, css e html, que ao salvar/alterar/criar qualquer uma dessas extensões da um reload na página*/
gulp.task('watch-html-js-css', function() {
	gulp.watch(['./**/*.js','./**/*.html', 'css/**/*.css'], reload);
});

/** Task para compilar o SASS, compila a extensão .scss para .css*/
gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

/**Cria o watch dos arquivos dos SASS, para que quando salvar compilar os arquivos*/
gulp.task('watch-sass', function() {
	gulp.watch(['./sass/**'], ['sass']);
});

/** Oque vai ser executado quando digitar "gulp" no terminal*/
gulp.task('default', ['browser-sync','watch-html-js-css','watch-sass']);
