package com.example.blog.controller;

import com.example.blog.model.BlogPost;
import com.example.blog.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/blogposts")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping
    public ResponseEntity<?> createBlogPost(@RequestParam("title") String title,
                                            @RequestParam("content") String content,
                                            @RequestParam("category") String category,
                                            @RequestParam("tags") String tags,
                                            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            if (title == null || content == null || category == null || tags == null) {
                return ResponseEntity.badRequest().body("Missing required fields.");
            }

            BlogPost blogPost = new BlogPost();
            blogPost.setTitle(title);
            blogPost.setContent(content);
            blogPost.setCategory(category);
            blogPost.setTags(tags);

            if (image != null && !image.isEmpty()) {
                blogPost.setImage(image.getBytes());
            }

            BlogPost createdBlogPost = blogPostService.createBlogPost(blogPost);
            return ResponseEntity.ok(createdBlogPost);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing file.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred.");
        }
    }

    @GetMapping("/search")
    public List<BlogPost> searchBlogPosts(@RequestParam String q) {
        return blogPostService.searchBlogPosts(q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable String id) {
        return blogPostService.getBlogPostById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
