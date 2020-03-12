const _ = require('lodash');
module.exports =  (function () {
    _.mixin({
        log : function (returnValue) {
            const console = window.console;
            console.log(returnValue);
        },
        error : function (msg) {
            console.error(msg);
        },
        cover: function (defaults, options) {
            // @ https://gist.github.com/cferdinandi/4f8a0e17921c5b46e6c4
            let extended = {};
            let prop;
            for (prop in defaults) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    extended[prop] = defaults[prop];
                }
            }
            for (prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    extended[prop] = options[prop];
                }
            }
            return extended;
        },
        compiled: function (source,data,minify) {
            const _minify = !minify? typeof(minify) === "undefined" : true;
            let template =  _.isFunction(source)? source() : source;
            if(_minify){
                // template= template.replace(/\s/g,"");
                template= template.trim();
            }
            return _.template(template)(data);
        },
        render : function (data,minify) {
            const _minify = !minify? typeof(minify) === "undefined" : true;
            let template = _.isFunction(data.template) ? data.template() : data.template;
            if(_minify){
                // template= template.replace(/\s/g,"");
                template= template.trim();
            }
            return _.template(template)(data.data);
        },
    });
    return _;
})();
