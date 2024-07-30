document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        try {
            const response = await fetch(`http://localhost:8080/blogposts/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blog = await response.json();
            displayBlogDetails(blog);
        } catch (error) {
            console.error('Error fetching blog details:', error);
        }
    }

    document.getElementById('show-content-button').addEventListener('click', () => {
        const contentDiv = document.getElementById('blog-content');
        contentDiv.classList.toggle('hidden');
        const button = document.getElementById('show-content-button');
        button.textContent = contentDiv.classList.contains('hidden') ? 'Show Content' : 'Hide Content';
    });
});

function displayBlogDetails(blog) {
    document.getElementById('blog-title').textContent = blog.title;
    document.getElementById('blog-category').textContent = blog.category;
    document.getElementById('blog-tags').textContent = blog.tags;
    document.getElementById('blog-read-time').textContent = blog.readTime;
    document.getElementById('blog-content-text').textContent = blog.content;
}
