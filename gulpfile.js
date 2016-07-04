var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
//重命名:简写属性等
var alias = require('postcss-alias');
//内置简写
var crip = require('postcss-crip');
//font相关
var magician = require('postcss-font-magician');
//三角形
var triangle = require('postcss-triangle');
//圆形
var circle = require('postcss-circle');
//链接颜色
var linkColors = require('postcss-all-link-colors');
//居中
var center = require('postcss-center');
//清除
var clearfix = require('postcss-clearfix');
//位置
var position = require('postcss-position');
//size大小
var size = require('postcss-size');
//水平或者垂直的空间
var verthorz = require('postcss-verthorz');
//颜色的简写
var colorShort = require('postcss-color-short');
//placeholder
var placehold=require('postcss-placehold');
//bem元素的处理
var bem=require('postcss-bem');
var nested=require('postcss-nested');
//grid
//var grid = require('postcss-grid');
//precss
var precss      = require('precss');
//雪碧图
var sprites = require('postcss-sprites').default;
//css bug fix
var cssgrace    = require('cssgrace');
//自动补充前缀
var autoprefixer= require('autoprefixer');
//压缩
var cssnano     = require('cssnano');
var processors=[alias,crip,magician,triangle,circle,linkColors,center,clearfix,position,
size,verthorz,colorShort,bem,nested,precss,sprites，cssgrace,autoprefixer,cssnano];
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/postcss/*.css", ['css']);
    gulp.watch("app/*.html").on('change', reload);
    gulp.watch("app/css/*.css").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('css', function() {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('app/postcss/*.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('app/css') );
});

gulp.task('default', ['serve'])