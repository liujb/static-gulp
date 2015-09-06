var conf = [{
    tag: 'mainHeaderCss',
    src: [
        'src/base/bower/bootstrap.min.css',
        'src/base/bower/bootstrap-theme.min.css',
        'src/base/css/common.css',
        'src/base/css/index.css',
        'src/base/css/comp.css',
        'src/auth/css/auth.css',
        'src/base/css/milk.css'
    ],
    name: 'main-all.min.css',
    dest: 'dist/fist/concat/'
}, {
    tag: 'mainHeaderJS',
    src: [
        'src/base/bower/jquery.min.js',
        'src/base/bower/bootstrap.min.js',
        'src/base/js/comp.js',
        'src/base/js/validate.js',
        'src/base/js/ajaxGlobal.js'
    ],
    name: 'main-all.min.js',
    dest: 'dist/fist/concat/'
}, {
    tag: 'kefuMainAllCss',
    src: [
        'src/base/bower/bootstrap.min.css',
        'src/base/css/common.css',
        'src/base/css/index.css',
        'src/base/css/milk.css',
        'src/kefu/css/kefu-base.css',
        'src/kefu/css/kefu-common.css',
        'src/base/css/areaComp.css'
    ],
    name: 'kefu-all.min.css',
    dest: 'dist/kefu/concat/'
}];

module.exports = conf;
