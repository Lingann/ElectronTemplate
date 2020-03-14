const tempalte = require('./tinymce-editor.ejs');
require ('./tinymce-editor.scss');

// Import TinyMCE
import tinymce from 'tinymce/tinymce';
// A theme is also required
import 'tinymce/themes/silver';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/textpattern';
// require.context('file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins', true, /.*/);



export default (function () {
    return {
        template : tempalte,
        tinymce : tinymce,
        init: function () {
            tinymce.init({
                selector : "#tiny",
                plugins: ['paste', 'link','textpattern'],     // 设置插件
                base_url: './lib/tinymce',      // 设置根目录
                content_css: "./css/main.css",
                language: 'zh_CN',              // 本地化
                inline: true, //开启内联模式
                // skin: "oxide",
                // skin_url: './lib/tinymce/skins',
                formats: {
                    // A custom format that wraps blocks into a div with the specified wrapper class
                    'custom-wrapper': { block: 'div', classes: 'wrapper', wrapper: true, styles: {'color': 'red','background':'#ededed'} }
                },
                textpattern_patterns: [
                    {start: '$', end: '$', format: 'custom-wrapper'},
                ]
            }).then(function (editors) {
                console.log(editors);
                alert(11);
            })
        }
    }
})();
