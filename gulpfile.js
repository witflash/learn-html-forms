var gulp = require('gulp'), // Подключаем Gulp
	sass = require('gulp-sass'), // Подключаем Sass пакет 
	browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('sass', function () { // Создаем таск "sass"
	return gulp.src('app/sass/style.scss') // Берем основной файл с импортами
		.pipe(sass()) // Преобразовываем SCSS в CSS посредством gulp-sass
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

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch(['app/sass/**/*.scss', 'app/blocks/**/*.scss'], ['sass']); // Наблюдение за scss файлами
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS
	// Наблюдение за другими типами файлов
});