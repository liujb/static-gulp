// html minify options
// https://www.npmjs.com/package/gulp-compressor
// html minify is use htmlcompressor,all configs are valid.
// https://code.google.com/p/htmlcompressor/
//'simple-bool-attr': false, ng-checked和ng-disabled压缩完成后缺少一个 = 号，导致功能不好使
var htmlOpts = {
    'remove-intertag-spaces': true,
    'compress-js': true,
    'compress-css': true
};

// javascript minify options
// https://github.com/mishoo/UglifyJS
var jsOpts = {

};

// css minify options
// https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically
var cssOpts = {
    keepSpecialComments: 0,
    compatibility: 'ie8',
    advanced: false,
    aggressiveMerging: false
};

// exports the object
module.exports = {
    js: jsOpts,
    css: cssOpts,
    html: htmlOpts
};
