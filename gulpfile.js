var gulp = require('gulp'), // Подключаем Gulp
	scss = require('gulp-scss'); // Подключаем Scss пакет 
	browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('scss', function () { // Создаем таск "scss"
	return gulp.src('app/scss/style.scss') // Берем все файлы scss из папки и подпапок
		.pipe(scss()) // Преобразовываем Scss в CSS посредством gulp-scss
		.pipe(gulp.dest('app/css')) // Вывод результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', ['browser-sync', 'scss'], function() {
	gulp.watch(['app/scss/**/*.scss', 'app/blocks/**/*.scss'], ['scss']); // Наблюдение за scss файлами
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS
	// Наблюдение за другими типами файлов
});