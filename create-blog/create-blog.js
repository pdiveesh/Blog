document.getElementById('create-blog-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('content', document.getElementById('content').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('tags', document.getElementById('tags').value);
    const imageFile = document.getElementById('image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch('http://localhost:8080/blogposts', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Blog post created successfully!');
            window.location.href = '../index.html';
        } else {
            const errorText = await response.text();
            console.error('Failed to create blog post:', errorText);
            alert('Failed to create blog post.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
