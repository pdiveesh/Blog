// script.js
function openEditor() {
    document.getElementById('editor-modal').style.display = 'block';
}

function closeEditor() {
    document.getElementById('editor-modal').style.display = 'none';
}

function saveBlog() {
    const content = document.getElementById('blog-editor').value;
    console.log('Blog content:', content);
    // Add logic to save the blog content
    closeEditor();
}