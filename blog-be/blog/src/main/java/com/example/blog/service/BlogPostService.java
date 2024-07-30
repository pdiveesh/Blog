package com.example.blog.service;


import com.example.blog.model.BlogPost;
import com.example.blog.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BlogPostService {
    @Autowired
    private BlogPostRepository blogPostRepository;

    public BlogPost createBlogPost(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }

    public List<BlogPost> searchBlogPosts(String query) {
        return blogPostRepository.findByTitleContainingIgnoreCase(query);
    }
    public Optional<BlogPost> getBlogPostById(String id) {
        return blogPostRepository.findById(id);
    }
}