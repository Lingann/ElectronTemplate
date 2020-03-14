const info = require('./views/info/info');
const tinymceEditor = require('./views/tinymce_editor/tinymce-editor');
console.log(tinymceEditor);
document.getElementById('body').innerHTML = tinymceEditor.default.template();
tinymceEditor.default.init();
console.log(tinymceEditor.tinymceEditor);