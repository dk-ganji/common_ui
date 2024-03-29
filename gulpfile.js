// Gulp 모듈 호출 
const { series, parallel, src, dest, watch, lastRun } = require('gulp'), // gulp
	  fileinclude = require('gulp-file-include'), //html include 모듈
	  scss = require('gulp-sass')(require('sass')), // scss 컴파일용
	  minifycss = require('gulp-clean-css'), // CSS MINIFY
	  sourcemaps  = require('gulp-sourcemaps'), // scss 소스맵
	  concat = require('gulp-concat'), //concat 플러그인(script 파일을 하나로 뭉침)
	  uglify = require('gulp-uglify'), //minify 후 코드 난독화 // script 파일을 전달해야 할 경우 사용 자제 할것
	  babel = require("gulp-babel"), // babel
	  imagemin = require('gulp-imagemin'), // 이미지 최적화
	  changed = require('gulp-changed'), // 변경된 파일만 캐치
	  spritesmith = require('gulp.spritesmith'), // 이미지 스프라이트 만들기
	  del = require('del'), // 삭제 모듈
	  rename = require('gulp-rename'), // gulp-rename 모듈 호출
	  nodemon = require('gulp-nodemon'), // 웹서버
	  browserSync = require('browser-sync'), //브라우저싱크 화면 자동 새로 고침
	  cached = require('gulp-cached'), //cached
	  stripDebug = require('gulp-strip-debug'); //stripDebug - console, alert 을 void 0 으로 전체 치환, 상황 봐가면서 써야 할듯

// 파일 경로
const paths = {
	all: {
		dest: './project/dist/'
	},
	html: {
        src: './project/src/**/*.html',
        dest: './project/dist/'
	},
    styles: {
        src: './project/src/assets/scss/common.scss',
        dest: './project/dist/assets/css/'
    },
    eventStyles: {
        src: './project/src/assets/scss/event-sm.scss',
        dest: './project/dist/assets/css/'
    },
	partnershipStyles: {
        src: './project/src/assets/scss/ptnr-pc-common.scss',
        dest: './project/dist/assets/css/'
    },
	onsale_tel: {
        src: './project/src/assets/scss/onsale_tel.scss',
        dest: './project/dist/assets/css/'
    },
    scripts: {
		src:  './project/src/assets/js/*.js',
		dest: './project/dist/assets/js/'
    },
	wsg:{
		src: './project/src/status/**/*',
		dest: './project/dist/status/'
	},	
	assets:{
		js:{
			src: './project/src/assets/js/*',
			dest: './project/dist/assets/js/'
		},
		import: {
			src: './project/src/assets/js/import/*',
			dest: './project/dist/assets/js/import/'
		},
		libraries:{
			src: './project/src/assets/js/libraries/*',
			dest: './project/dist/assets/js/libraries/'
		},
		plugins:{
			src: './project/src/assets/js/plugins/*',
			dest: './project/dist/assets/js/plugins/'
		},
		fonts:{
			src: './project/src/assets/fonts/*',
			dest: './project/dist/assets/fonts/'
		},
		images:{
			src: './project/src/assets/images/**/*',
			dest: './project/dist/assets/images/'
		},
		mov:{
			src: './project/src/assets/videos/**/*',
			dest: './project/dist/assets/videos/'
		},
		sprite:{
			src: './project/src/assets/sp_images/*.png',
			dest: './project/dist/assets/images/sp_images/'
		}
	}
};

// 웹서버 스타트
function serverStart(){
	nodemon({
		script: 'app.js',
		watch: 'app' 
	});
};

// 브라우저 싱크 실행(화면 새로고침)
function liveServer(){
	browserSync.init( null, { proxy: 'http://localhost:8090' , port: 8091 });
};

//html 관련
function htmlCompile(done){
	return src([paths.html.src, '!./project/src/pages/includes/*'])
			.pipe(fileinclude({ prefix: '@@', basepath: './project/src/', indent : true}))
			.pipe(cached(htmlCompile))
			.pipe(dest(paths.html.dest))
			.pipe( browserSync.reload({stream: true}) );

	done();
};


//html include
function htmlInclude(done){
	return src([paths.html.src, '!./project/src/pages/includes/*'])
			.pipe(cached(htmlInclude))
			.pipe(fileinclude({ prefix: '@@', basepath: './project/src/'}))
			.pipe(dest(paths.html.dest))
			.pipe(browserSync.reload({stream: true}));

	done();
};

//script 관련
function jsCompile(done){
	return src([paths.scripts.src, '!./project/src/assets/js/main.js', '!./project/src/assets/js/ptnr-pc-common.js'], { sourcemaps: true })
			.pipe(cached(jsCompile))
			.pipe(concat('ui.common.js'))
		    // .pipe(babel())
			.pipe(dest(paths.scripts.dest))
//			.pipe(stripDebug())
			.pipe(uglify())
			.pipe(rename('ui.common.min.js'))
			.pipe(dest(paths.scripts.dest))
			.pipe( browserSync.reload({stream: true}) );

	done();
};


function handleError(err) {
	/*console.log(err);*//*09.19 주석처리*/
	this.emit('end');
  }
// main script 배포
function mainJsCompile(done){
	return src('./project/src/assets/js/main.js', { sourcemaps: true })
			.pipe(cached(mainJsCompile))
		    // .pipe(babel())
			// .pipe(uglify())
			.pipe(dest(paths.scripts.dest))
			.pipe( browserSync.reload({stream: true}) );
	done();
};


//scss compile
function scssCompile(done){

	//scss compile option
	let scssOptions = {
		outputStyle : "expanded", // Values : nested, expanded, compact, compressed
		indentType : "space", // Values : space , tab
		indentWidth : 0, // outputStyle 이 nested, expanded 인 경우에 사용
		precision: 4, // 컴파일 된 CSS 의 소수점 자리수
		sourceComments: true // 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시.
	};

	return src(paths.styles.src)
			.pipe(sourcemaps.init())
			.pipe(changed(paths.styles.dest))
			.pipe(scss(scssOptions.normal).on('error', scss.logError))
			.pipe(dest(paths.styles.dest), { sourcemaps:  true })
			.pipe(minifycss())
			.pipe(rename('common.min.css'))
			.pipe(sourcemaps.write())
			.pipe(dest(paths.styles.dest), { sourcemaps:  true })
			.pipe(browserSync.reload({stream: true}) );
	done();
};



// js 플러그인, 라이브러리 import 배포
function importJS(done){
	return src(paths.assets.import.src)
			.pipe(dest(paths.assets.import.dest));
	done();
};

// js 라이브러리 배포
function libraryJS(done){
	return src(paths.assets.libraries.src)
			.pipe(dest(paths.assets.libraries.dest));
	done();
};

// js 플러그인 배포
function pluginJS(done){
	return src(paths.assets.plugins.src)
			.pipe(dest(paths.assets.plugins.dest));
	done();
};

// html guide
function libraryWsg(done){
	return src(paths.wsg.src)
			.pipe(dest(paths.wsg.dest));
	done();
};

// 웹폰트 배포
function libraryFonts(done){
	return src(paths.assets.fonts.src)
			.pipe(dest(paths.assets.fonts.dest));
	done();
};

// 영상 배포
function libraryMovs(done){
	return src(paths.assets.mov.src)
			.pipe(dest(paths.assets.mov.dest));
	done();
};

// 이미지 배포
function libraryImages(done){
	return src(paths.assets.images.src)
			.pipe(cached(libraryImages))
			.pipe(changed(paths.assets.images.dest))
			/*
			.pipe( 
			imagemin([ 
				imagemin.gifsicle({interlaced: false}),
				imagemin.mozjpeg({quality: 75, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
					plugins: [
						{removeViewBox: true},
						{cleanupIDs: false}
					]
				}) 
			]))
			*/
			.pipe(dest(paths.assets.images.dest))
			.pipe(browserSync.reload({stream: true})
	);
	done();

};

//이미지 최적화
function optImage(done){
	
	return src(paths.assets.images.src)
			.pipe( 
			imagemin([ 
				imagemin.gifsicle({interlaced: false}),
				imagemin.mozjpeg({quality: 75, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
					plugins: [
						{removeViewBox: true},
						{cleanupIDs: false}
					]
				}) 
			]))
			.pipe(dest(paths.assets.images.dest));

	done();
};

// sprite images 만들기
function spritesImage(done){

	let spriteData = src(paths.assets.sprite.src)
			.pipe(spritesmith({
				imgName: 'sprites.png',
				padding: 10,
				cssName: 'sprites.css'
			}));
			

	spriteData.img.pipe(dest(paths.assets.sprite.dest));
	spriteData.css.pipe(dest(paths.styles.dest + 'common/')).pipe( browserSync.reload({stream: true}));
	done(); //task가 정상 종료 안됐을때 callback 함수를 사용 해서 태스크가 종료 되었음을 시스템에 알려준다.
};

// clean
function clean(done){
	del.sync(paths.all.dest);
	done();
};

// 지정한 파일, 경로에 대해 실시간 파일 변경 감지
function watchFiles() {
	watch(paths.assets.sprite.src, series([spritesImage]));
	watch(paths.html.src, series([htmlCompile]));
	watch(['./project/src/assets/js/*.js', '!./project/src/assets/js/main.js'], series([jsCompile]));
	watch('./project/src/assets/js/libraries/*.js', series([libraryJS]));
	watch('./project/src/assets/js/plugins/*.js', series([pluginJS]));
	watch('./project/src/assets/js/main.js', series([mainJsCompile]));
	watch(['./project/src/assets/scss/**/*.scss','!./project/src/assets/scss/event-sm.scss'], series([scssCompile]));
	watch(paths.assets.images.src, series([libraryImages]));
	watch(paths.assets.mov.src, series([libraryMovs]));
	watch(paths.wsg.src, series([libraryWsg]));
};

exports.default = series(parallel(serverStart, liveServer, watchFiles)); // 기본 task liveserver용으로
exports.build = series(parallel(clean, htmlCompile, jsCompile, mainJsCompile, importJS, libraryJS, pluginJS, scssCompile, libraryImages, spritesImage, libraryMovs, libraryWsg, libraryFonts)); // 전체 빌드 task
exports.semibuild = series(parallel(htmlCompile ,jsCompile, mainJsCompile, scssCompile, libraryImages, libraryMovs)); // 세미 빌드 task
exports.sprite = series(parallel(spritesImage)); // 이미지 스프라이프 태스크
exports.optImage = series(parallel(optImage)); // 이미지 최적화