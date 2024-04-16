'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const sass = require('gulp-sass')(require('node-sass'));
const cssbeautify = require('gulp-cssbeautify');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const gcmq = require('gulp-group-css-media-queries');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const flatten = require('gulp-flatten');

// New
const webpack = require('webpack-stream');
const cssLoader = require('css-loader');
const styleLoader = require('style-loader');

// Paths
const srcPath = 'src/';
const distPath = 'dist/';

const path = {
	build: {
		html: distPath,
		css: distPath + 'assets/css',
		js: distPath + 'assets/js',
		img: distPath + 'assets/img',
		video: distPath + 'assets/video',
		svg: distPath + 'assets/img/svg',
		vendors: distPath + 'assets/vendors',
		fonts: distPath + 'assets/fonts',
		favicon: distPath + 'assets/favicon',
	},
	src: {
		html: srcPath + '*.html',
		css: srcPath + 'assets/scss/**/*.scss',
		js: srcPath + 'assets/js/**/*.js',
		img: srcPath + 'assets/**/*.{jpg,jpeg,png,webp}',
		video: srcPath + 'assets/video/**/*',
		svg: srcPath + 'assets/**/*.svg',
		vendors: srcPath + 'assets/vendors/**/*.{css,js}',
		fonts: srcPath + 'assets/fonts/**/*',
		favicon: srcPath + 'assets/favicon/**/*',
	},
	clean: distPath,
};

let isProd = false; // dev default

function html() {
	return src(path.src.html)
		.pipe(
			fileinclude({
				prefix: '@',
				basepath: '@file',
			})
		)
		.pipe(dest(path.build.html))
		.pipe(browserSync.reload({ stream: true }));
}

function publicTask() {
	return src(srcPath + 'assets/public/**/*')
		.pipe(dest(path.build.html))
		.pipe(browserSync.reload({ stream: true }));
}

function css() {
	return src(path.src.css)
		.pipe(
			plumber({
				errorHandler: function (err) {
					notify.onError({
						title: 'SCSS Error',
						message: 'Error: <%= error.message %>',
					})(err);
					this.emit('end');
				},
			})
		)
		.pipe(sass())
		.pipe(gcmq())
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cssbeautify())
		.pipe(dest(path.build.css))
		.pipe(browserSync.reload({ stream: true }));
}

function js() {
	return src(path.src.js)
		.pipe(
			plumber({
				errorHandler: function (err) {
					notify.onError({
						title: 'JS Error',
						message: 'Error: <%= error.message %>',
					})(err);
					this.emit('end');
				},
			})
		)
		.pipe(webpack(require('./webpack.config')))
		.pipe(dest(path.build.js))
		.pipe(browserSync.reload({ stream: true }));
}

function img() {
	return src(path.src.img).pipe(flatten()).pipe(dest(path.build.img));
}

function video() {
	return src(path.src.video).pipe(dest(path.build.video));
}

function svgToSprite() {
	return src(path.src.svg)
		.pipe(flatten())
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: '../sprite.svg',
					},
				},
			})
		)
		.pipe(dest(path.build.svg))
		.pipe(browserSync.reload({ stream: true }));
}

function svgNormal() {
	return src(path.src.svg)
		.pipe(flatten())
		.pipe(dest(path.build.svg))
		.pipe(browserSync.reload({ stream: true }));
}

function vendors() {
	return src(path.src.vendors)
		.pipe(dest(path.build.vendors))
		.pipe(browserSync.reload({ stream: true }));
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browserSync.reload({ stream: true }));
}

function favicon() {
	return src(path.src.favicon)
		.pipe(dest(path.build.favicon))
		.pipe(browserSync.reload({ stream: true }));
}

// Minify

function htmlMin() {
	return src(path.src.html)
		.pipe(
			fileinclude({
				prefix: '@',
				basepath: '@file',
			})
		)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest(path.build.html));
}

function cssMin() {
	return src(path.src.css)
		.pipe(sass())
		.pipe(gcmq())
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cleanCSS())
		.pipe(dest(path.build.css));
}

function jsMin() {
	return src(path.src.js)
		.pipe(webpack(require('./webpack.config')))
		.pipe(uglify())
		.pipe(dest(path.build.js));
}

// Other Tasks
function clean() {
	return del(path.clean);
}

function serve() {
	browserSync.init({
		server: {
			baseDir: distPath,
		},
	});
}

function prod(done) {
	!isProd;
	done();
}

const dev = series(
	clean,
	parallel(
		publicTask,
		html,
		css,
		js,
		img,
		video,
		svgToSprite,
		svgNormal,
		vendors,
		fonts,
		favicon
	),
	serve
);

const build = series(
	clean,
	parallel(
		publicTask,
		htmlMin,
		cssMin,
		jsMin,
		img,
		video,
		svgToSprite,
		svgNormal,
		vendors,
		fonts,
		favicon
	)
);

const preview = series(serve);

function watchFiles() {
	watch([path.src.html], html);
	watch([srcPath + 'assets/**/*.html'], html);
	watch([srcPath + 'assets/components/**/*.scss'], css);
	watch([path.src.css], css);
	watch([path.src.js], js);
	watch([srcPath + 'assets/js/**/*.js'], js);
	watch([srcPath + 'assets/**/*.js'], js);
	watch([path.src.img], img);
	watch([srcPath + 'assets/components/**/*.svg'], svgToSprite);
	watch([path.src.video], video);
	watch([path.src.svg], svgToSprite);
	watch([path.src.svg], svgNormal);
	watch([path.src.vendors], vendors);
	watch([path.src.fonts], fonts);
	watch([path.src.favicon], favicon);
	watch([srcPath + 'assets/public/**/*'], publicTask);
}

const runParallel = parallel(dev, watchFiles);

exports.html = html;
exports.htmlMin = htmlMin;
exports.css = css;
exports.cssMin = cssMin;
exports.js = js;
exports.jsMin = jsMin;
exports.img = img;
exports.video = video;
exports.svgToSprite = svgToSprite;
exports.svgNormal = svgNormal;
exports.dev = dev;
exports.build = build;
exports.vendors = vendors;
exports.fonts = fonts;
exports.favicon = favicon;
exports.publicTask = publicTask;
exports.preview = preview;
exports.watchFiles = watchFiles;

exports.default = runParallel;
