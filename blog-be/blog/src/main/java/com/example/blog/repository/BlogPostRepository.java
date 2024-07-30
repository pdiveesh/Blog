package com.example.blog.repository;


import com.example.blog.model.BlogPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BlogPostRepository extends MongoRepository<BlogPost, String> {
    List<BlogPost> findByTitleContainingIgnoreCase(String title);
}