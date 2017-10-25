# gulp-compress
gulp压缩html、css、js、image

## 项目结构：
gulpDome：
 * dist
   * images
   * styles
   * scripts
   * htmls
 * src
   * images
   * styles
   * scripts
   * htmls
 * gulpfile.js
 * package.json
 * node_modules

## 安装gulp：
   1、全局安装，执行：npm install gulp -g
   
   2、本地安装，cd到项目根目录，执行：npm install gulp --save-dev
## 安装插件：
  * 自动添加css前缀（gulp-autoprefixer）
  * 压缩css(gulp-clean-css)
  * 压缩html（gulp-htmlmin）
  * 修改文件名（gulp-rename）
  * 更新提示（gulp-notify）
  * js代码校验（gulp-jshint）
  * 压缩js（gulp-uglify）
  * 压缩图片（gulp-imagemin）
  * 清除文件（del）
  * 合并js文件（gulp-concat）
  * 图片缓存，只有图片替换了才压缩（gulp-cache）
  * 自动刷新页面（gulp-livereload）
