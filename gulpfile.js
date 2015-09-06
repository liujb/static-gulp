var gulp = require('gulp');
var fs = require('fs');
var fse = require('fs-extra');
var process = require('child_process');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var flatten = require('gulp-flatten');
var minifyHtml = require('gulp-compressor');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var frep = require('gulp-frep');
var jshint = require('gulp-jshint');

// conf
var ignoreDir = '!./src/base/bower_components/**';
var minOpts = require('./conf/minify.js');
var patterns = require('./conf/replace.js');
var concatOpts = require('./conf/concat.js');

/**
 * minify css files
 */
gulp.task('mincss', function() {
    return gulp.src(['src/**/*.css', ignoreDir])
        .pipe(minifyCSS(minOpts.css))
        .pipe(gulp.dest('dist'));
});

/**
 * minify javascript
 */
gulp.task('minjs', function() {
    return gulp.src(['src/**/*.js', '!./src/base/bower/**', ignoreDir])
        .pipe(uglify(minOpts.js))
        .pipe(gulp.dest('dist'));
});

/**
 * minify html files
 */
gulp.task('minhtml', function() {

    return gulp.src(['src/**/*.html', ignoreDir])
        .pipe(minifyHtml(minOpts.html))
        .pipe(gulp.dest('dist'));
});

/**
 * minify images
 */
gulp.task('minimg', function() {
    return gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', ignoreDir])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist'));
});

/**
 * 处理bower安装的package
 * 主要是对requirejs做一个特殊处理
 */
gulp.task('bower', function() {
    var srcPath = 'src/base/bower',
        destPath = 'dist/base/bower',
        pkgsConf = require('./conf/bower.js');

    pkgsConf.forEach(function(it) {
        gulp.src(it.src + it.fileName)
            .pipe(uglify())
            .pipe(rename(it.rename))
            .pipe(gulp.dest(srcPath));
    });

    return gulp.src(['src/base/bower_components/**/*.min.*'])
        .pipe(flatten())
        .pipe(gulp.dest(srcPath));
});

/**
 * cpdist 特定的资源到特定的文件夹
 */
gulp.task('cpdist', ['bower'], function() {
    fse.copy('src/base/fonts', 'dist/base/fonts', function(err) {
        if (err) return console.error(err);
    });
    fse.copy('src/base/bower', 'dist/base/bower', function(err) {
        if (err) return console.error(err);
    });
});

/**
 * 文件合并
 */
gulp.task('concat', function() {
    var tmpConf = {};
    var getMinOpts = function(fileName) {
        var ext = fileName.split('.').pop();
        return {
            handler: (ext === 'js') ? uglify : minifyCSS,
            opts: (ext === 'js') ? minOpts.js : minOpts.css,
        };
    };
    concatOpts.forEach(function(it) {
        tmpConf = getMinOpts(it.name);
        gulp.src(it.src)
            .pipe(concat(it.name))
            .pipe(tmpConf.handler(tmpConf.opts))
            .pipe(gulp.dest(it.dest));
    });
});

/**
 * 替换links
 */
var replaceLinks = function(env) {
    var opts = (env === 'test') ? patterns.test : patterns.deploy;
    return gulp.src(['dist/**/main.js'])
        .pipe(frep(opts))
        .pipe(gulp.dest('dist'));
};

/**
 * 注册minify任务，用户集合所有的minify
 */
gulp.task('min', ['minimg', 'minhtml', 'mincss', 'minjs'], function() {

    // 特殊处理My97DatePicker/zh-cn.js
    return gulp.src('src/base/js/My97DatePicker/lang/zh-*.js')
        .pipe(uglify({
            output: {
                ascii_only: true
            }
        }))
        .pipe(gulp.dest('dist/base/js/My97DatePicker/lang/'));
});

/**
 * dev
 */
gulp.task('dev', ['bower']);

/**
 * 测试环境尽量要接近线上环境
 * 替换/static/src/ 为 /static/dist/
 */
gulp.task('test', ['cpdist', 'concat', 'min'], function() {
    replaceLinks('test');
});
gulp.task('default', ['test']);

/**
 * 这个在静态资源没有部署到静态集群之前暂时用不上
 * 替换成/static/src/ 和 /static/dist/ 为 
 * http://static.diditaxi.com.cn/dist/
 */
gulp.task('deploy', ['test'], function() {
    replaceLinks('deploy');
});


/**
 * 检查js语法
 */
gulp.task('jshint', function() {
    return gulp.src('src/auth/**/*.js')
        .pipe(jshint({}))
        .pipe(jshint.reporter('jshint-stylish'));
});
