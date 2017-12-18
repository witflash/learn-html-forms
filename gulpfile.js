var gulp = require('gulp'), // Подключаем Gulp
	sass = require('gulp-sass'), // Подключаем Sass пакет 
	nunjucks = require('gulp-nunjucks'), // Подключаем nunjucks
	htmlbeautify = require('gulp-html-beautify'), // Вложенность в html после nunjucks 
	browserSync = require('browser-sync'), // Подключаем Browser Sync
	autoprefixer = require('gulp-autoprefixer'); // Автоматическая поддержка разных браузеров

gulp.task('nunjucks', function () { // Создаем таск для Nunjucks
	return gulp.src('app/templates/index.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true})) // Обновляем HTML на странице
});

/* Таск для оформления отступов в html файлах */
gulp.task('htmlbeautify', function(){ 
	var options = {
		"indent_size": 4,
		"indent_with_tabs": true
	}
	gulp.src('app/*.html')
		.pipe(htmlbeautify(options))
		.pipe(gulp.dest('app'))
});

gulp.task('sass', ['nunjucks'], function () { // Создаем таск "sass"
	return gulp.src('app/sass/**/*.scss') // Берем основной файл с импортами
		.pipe(sass().on('error', function(err) {
            console.error(err.message);
            browserSync.notify(err.message, 3000); // Display error in the browser
            this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
        })) // Преобразовываем SCSS в CSS посредством gulp-sass
		.pipe(gulp.dest('app/css')) // Вывод результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: true // Отключаем уведомления
	});
});

gulp.task('watch', ['browser-sync', 'nunjucks', 'sass'], function() {
	gulp.watch(['app/sass/**/*.scss'], ['sass']); // Наблюдение за scss файлами
	gulp.watch(['app/**/*.html'], ['nunjucks']); // Наблюдение за HTML файлами
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS
	// Наблюдение за другими типами файлов
});

/*  ФИНАЛИЗИРУЕМ ПРОЕКТ:
	- применяем autoprefixer;
	- применяем htmlbeautify; */
gulp.task('finalize', ['htmlbeautify'], function() {
	gulp.src('app/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'))
});