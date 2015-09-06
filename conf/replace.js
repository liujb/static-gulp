/**
 * 替换配置
 * @type {Array}
 */
var patterns = {
    test: [{
        pattern: /\/static\/src\//g,
        replacement: '/static/dist/'
    }],
    deploy: [{
        pattern: /\/static\/src\//g,
        replacement: 'http://static.diditaxi.com.cn/dist/'
    }, {
        pattern: /\/static\/dist\//g,
        replacement: 'http://static.diditaxi.com.cn/dist/'
    }]
};


module.exports = patterns;
