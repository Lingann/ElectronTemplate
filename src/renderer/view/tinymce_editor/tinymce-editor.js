const tempalte = require('./tinymce-editor.ejs');


// Import TinyMCE
import tinymce from 'tinymce/tinymce';
// A theme is also required
import 'tinymce/themes/silver';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

require.context('file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins', true, /.*/);


export default (function () {
    return {
        template : tempalte,
        tinymce : tinymce,
        init: function () {
            tinymce.init({
                selector : "#tiny",
                plugins: ['paste', 'link']
            })
        }
    }
})();