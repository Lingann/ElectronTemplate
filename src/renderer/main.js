const info = require('./view/info/info');
const tinymceEditor = require('./view/tinymce_editor/tinymce-editor');
console.log(tinymceEditor);
document.getElementById('body').innerHTML = tinymceEditor.default.template();
tinymceEditor.default.init();
// console.log(tinymceEditor.tinymceEditor);