require.config({
    baseUrl: '/static/src/',
    paths: {
        'jquery': 'base/bower/jquery.min',
        'highcharts': 'base/js/highcharts',
        'milk': 'base/js/milk',
        'date-picker': 'base/js/My97DatePicker/WdatePicker',
        'text': 'base/js/requirejs-plugin/text',
        'angular': 'base/bower/angular.min',
        'angular-route': 'base/js/js/angular-route.min',
        'ui-bootstrap': 'base/js/ui-bootstrap-tpls-0.12.1',
        'app': 'crm/js/app',
        'driverTemplate': 'crm/js/driverTemplate',
        'driverActive': 'crm/js/driverActive',
        'performance': 'crm/js/performance',
        'driver': 'crm/js/driver',
        'other': 'crm/js/other',
        "common": 'crm/js/common',
        'templates': 'crm/templates',
        'menu': 'crm/js/menu'
    },
    shim: {
        'ui-bootstrap': ['angular'],
        "angular-sanitize": ['angular'],
        'angular': {
            exports: 'angular'
        }
    }
});

require(['menu', 'app', (function() {
    var moduleName, arrScripts = document.getElementsByTagName('script');
    for (var i = 0, len = arrScripts.length; i < len; i++) {
        if ((moduleName = arrScripts[i].getAttribute('module'))) {
            return moduleName;
        }
    }
    return 'other';
})() + '/index'], function(menu, crmApp) {
    var JSON_DATA = $.parseJSON($('#sys_menu').val());
    menu.init(JSON_DATA);
    angular.bootstrap(document, ['crmApp']);
});
