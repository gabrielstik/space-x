const gulp = require('gulp'),
	gulp_rename = require('gulp-rename'),
	gulp_rm = require('gulp-rm'),
	gulp_plumber = require ('gulp-plumber'),
	gulp_sourcemaps = require ('gulp-sourcemaps'),
	gulp_notify = require('gulp-notify'),
	// index 
	fileinclude = require('gulp-file-include'),
	// CSS/SCSS dependencies
	gulp_autoprefixer = require ('gulp-autoprefixer'),
	gulp_sass = require('gulp-sass'),
	gulp_responsive = require('gulp-responsive'),
	// JS/ES6 dependencies
	gulp_concat = require('gulp-concat'),
	// Images
	gulp_imagemin = require('gulp-imagemin'),
	// Browserify
	gutil = require('gulp-util'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	env = require('babel-preset-env')

const config = {
	dist: 'dist/',
	src : 'src/',
	assets: 'dist/assets/',
	isProd: process.env.NODE_ENV === 'production'
}

// Watch by default
gulp.task('default', ['watch'], () => {})

// SASS to SCSS, compress & prefix styles
gulp.task('styles', () => {
	return gulp.src([`${config.src}styles/**/*.scss`, `!${config.src}styles/vendor/*`])
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Styles error:  <%= error.message %>')}))
		.pipe(gulp_sourcemaps.init())
		.pipe(gulp_concat('style.min.css'))
		.pipe(gulp_sass({
			outputStyle: 'compressed'}).on('error', gulp_sass.logError))
		.pipe(gulp_autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp_sourcemaps.write())
		.pipe(gulp.dest(`${config.assets}css`))
})

gulp.task('vendor', () => {
	return gulp.src(`${config.src}styles/vendor/*`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Fonts error:  <%= error.message %>')}))
		.pipe(gulp.dest(`${config.assets}css/vendor`))
})

// Concat, minify & babel
gulp.task('scripts', () => {
	browserify({
		entries: `${config.src}scripts/app.js`,
		debug: true
	})
		.transform(babelify, { presets: [env] })
		.bundle()
		.on('error', gutil.log)
		.pipe(source('app.js'))
		.on('error', gutil.log)
		.pipe(gulp_rename('app.js'))
		.pipe(gulp.dest(`${config.assets}js`))
})

gulp.task('index', () => {
	return gulp.src(`${config.src}index.html`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('HTML error:  <%= error.message %>')}))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(`${config.dist}`))  
})

gulp.task('fonts', () => {
	return gulp.src(`${config.src}fonts/*`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Fonts error:  <%= error.message %>')}))
		.pipe(gulp.dest(`${config.assets}fonts`))
})

gulp.task('lib', () => {
	return gulp.src(`${config.src}lib/**`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Lib error:  <%= error.message %>')}))
		.pipe(gulp.dest(`${config.assets}lib`))
})

gulp.task('models', () => {
	return gulp.src(`${config.src}models/**`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Models error:  <%= error.message %>')}))
		.pipe(gulp.dest(`${config.assets}models`))
})

gulp.task('images', () => {
	return gulp.src(`${config.src}images/**`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Image error:  <%= error.message %>')}))
		// .pipe(gulp_imagemin([
		// 	gulp_imagemin.gifsicle({interlaced: true}),
		// 	gulp_imagemin.jpegtran({progressive: true}),
		// 	gulp_imagemin.optipng({optimizationLevel: 5}),
		// 	gulp_imagemin.svgo({
		// 		plugins: [
		// 			{removeViewBox: true},
		// 			{cleanupIDs: false}
		// 		]
		// 	})
		// ], {
		// 	verbose: true
		// }))
		.pipe(gulp.dest(`${config.assets}images/src`))
})

// Manual function
gulp.task('clean', () => {
	return gulp.src(`${config.dist}**/*`, { read: false })
		.pipe(gulp_rm())
})

gulp.task('srcset', () => {
	return gulp.src(`${config.assets}images/srcset/*`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Srcset error:  <%= error.message %>')}))	
		.pipe(gulp_responsive({
			'*': [
				{ width: 340, rename: { suffix: '@340' }, },
				{ width: 560, rename: { suffix: '@560' }, },
				{ width: 720, rename: { suffix: '@720' }, },
				{ width: 1280, rename: { suffix: '@1280' }, },
				{ width: 1920, rename: { suffix: '@1920' }, },
				{ rename: { suffix: '' }, }], 
		}, {
			quality: 70,
			progressive: true,
			withMetadata: false,
			skipOnEnlargement: true,
			errorOnEnlargement: false
		}))
		.pipe(gulp.dest(`${config.assets}images`))
})

// Wath changes
gulp.task('watch', ['index', 'styles', 'vendor', 'scripts', 'fonts', 'lib', 'images', 'models'], () => {
	gulp.watch(`${config.src}index.html`, ['index'])
	gulp.watch(`${config.src}views/*.html`, ['index'])
	gulp.watch(`${config.src}includes/**`, ['index'])
	gulp.watch([`${config.src}styles/**/*.scss`, `!${config.src}styles/vendor`], ['styles'])
	gulp.watch(`${config.src}styles/vendor/*.css`, ['vendor'])
	gulp.watch([`${config.src}scripts/**/*.js`, `!${config.src}styles/vendor`], ['scripts'])
	gulp.watch(`${config.src}images/**`, ['images'])
})

gulp.task('default', ['watch'], () => { })
gulp.task('build', ['index', 'styles', 'vendor', 'scripts', 'fonts', 'lib', 'images', 'models'])