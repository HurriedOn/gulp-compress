// 引入 gulp及组件
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), //自动添加css前缀
    cleanCSS = require('gulp-clean-css'),  //压缩css
    htmlmin = require('gulp-htmlmin'),     //压缩html
    rename = require('gulp-rename'),       //修改文件名
    notify = require('gulp-notify'),       //更新提示
    jshint = require('gulp-jshint'),       //js代码校验
    uglify = require('gulp-uglify'),       //压缩JS
    imagemin = require('gulp-imagemin'),   //压缩图片
    del = require('del'),                  //清除文件
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
    

//Html
gulp.task('htmls',function(){
	var options={
		removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked/>
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
	};
	return gulp.src('src/htmls/*.html')
	.pipe(htmlmin(options))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/htmls'))
	.pipe(notify({ message: 'Htmls task complete' }));
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*.css')
  	.pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean  任务执行前，先清除之前生成的文件
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

// Default task  设置默认任务
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});


// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/styles/**/*.css', ['styles']);
  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});
