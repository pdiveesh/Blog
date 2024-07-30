// Toggle side menu
function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('active');
}

// Sample blog data (this would normally come from your backend)
const blogPosts = [
    { title: "Introduction to HTML", excerpt: "Learn the basics of HTML...", readTime: 5 },
    { title: "CSS Flexbox Guide", excerpt: "Master CSS Flexbox layout...", readTime: 7 },
    { title: "JavaScript ES6 Features", excerpt: "Explore the new features in ES6...", readTime: 10 },
    { title: "Getting Started with Java", excerpt: "Begin your journey with Java programming...", readTime: 8 }
];

// Function to create a blog post card
function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <div class="read-time">
            <i class="far fa-eye"></i>
            <span>${post.readTime} min read</span>
        </div>
    `;
    return card;
}

// Function to display blog posts
function displayBlogPosts() {
    const main = document.querySelector('main');
    blogPosts.forEach(post => {
        main.appendChild(createBlogCard(post));
    });
}

// Create Blog button functionality
function setupCreateBlogButton() {
    const createBlogButton = document.getElementById('create-blog');
    createBlogButton.addEventListener('click', () => {
        
        // This is where you'd typically open a form or redirect to a blog creation page
        window.location.href = 'create-blog/createblog.html';
    });
}



// Search functionality (basic)
function setupSearch() {
    // Create a container for the search input and icon
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container'; // Add a class for styling

    // Create the search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search blogs...';
    searchInput.id = 'search-input';
    searchInput.className = 'search-input'; // Add a class for styling
    searchInput.style.paddingLeft = '30px'; // Add padding to make space for the icon

    // Create the search icon
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search';
    searchIcon.style.position = 'absolute';
    searchIcon.style.left = '10px';
    searchIcon.style.top = '50%';
    searchIcon.style.transform = 'translateY(-50%)';
    searchIcon.style.pointerEvents = 'none'; // Make sure the icon doesn't block input events
    searchIcon.style.color = 'black'; // Set the icon color to black

    // Append the search input and icon to the container
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    // Insert the search container into the header
    const header = document.querySelector('header');
    header.insertBefore(searchContainer, document.getElementById('create-blog'));

    // Add event listener for search functionality
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 2) { // Only search if the term is longer than 2 characters
            try {
                const response = await fetch(`/search?q=${encodeURIComponent(searchTerm)}`);
                const results = await response.json();
                displaySearchResults(results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    });
}

function displaySearchResults(results) {
    const blogContainer = document.querySelector('.blog-container');
    blogContainer.innerHTML = ''; // Clear existing results

    results.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.content.substring(0, 100)}...</p>
        `;
        blogContainer.appendChild(blogCard);
    });
}

// Run setup functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayBlogPosts();
    setupCreateBlogButton();
    setupSearch();
});