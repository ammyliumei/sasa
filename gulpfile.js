// 引入需要的插件
var gulp = require('gulp');



// 1.-------创建任务，利用gulp-sass编译sass
    // 引进插件
var sass  = require('gulp-sass');
    // 建立任务
gulp.task('compileSass',function(){
    // 找到sass文件，并返回
    // return的作用是启动链式调用
        // return指示任务是异步的。gulp.src()返回一个流，所以它是异步的。
        // 没有它，任务系统将不知道什么时候完成。
    setInterval(function(){
         return gulp.src('./src/sass/*.scss')
        // 编译
        .pipe(
            sass({outputStyle:'expanded'})
            .on('error',sass.logError)
        )
        // 输出文件
        .pipe(gulp.dest('./src/css/'))
    },100)
   
})

// 2----------自动更新编译
// 监听文件修改
gulp.task('jtSass',function(){
    gulp.watch('./src/**/*.scss',['compileSass'])
})


var browserSync = require('browser-sync');
//3.-----------同步浏览器任务创建任务(此时第2步监听写入，第二部任务可取消)
gulp.task('server',function(){
        gulp.watch('./src/**/*.scss',['compileSass'])
         browserSync({
             // 静态服务器
            server:'./src/',
             //代理服务器(静态服务器无法监听php数据)
            // proxy:'http://localhost:10000' ,
            port:10010,
            files:['./src/**/*.html','./src/css/*.css','./src/scss/*.scss']
            })
   
    
})

// 4------------压缩文件
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('mergeJs',function(){
    return gulp.src(['./src/js/common.js','./src/js/lt_reg.js'])
    // 合并成all.js
    .pipe(concat('all.js'))
    // 输出到dist目录
    .pipe(gulp.dest('./dist/js/'))
     // 压缩
    .pipe(uglify({mangle:false,compress:false}))
    // 重命名
    .pipe(rename({suffix:'.min'}))
    // 输出到dist目录
    .pipe(gulp.dest('./dist/js'))
});