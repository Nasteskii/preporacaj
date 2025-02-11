package com.preporacaj.preporacaj_backend.controller;


import com.preporacaj.preporacaj_backend.model.Comment;
import com.preporacaj.preporacaj_backend.model.dto.CommentDto;
import com.preporacaj.preporacaj_backend.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173", "http://localhost:5174"})
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/public/{recommendationId}")
    public List<Comment> getByRecommendationId(@PathVariable String recommendationId, Pageable pageable) {
        try {
            return commentService.getByRecommendationId(recommendationId, pageable).getContent();
        } catch (NoSuchElementException e) {
            return new ArrayList<>();
        }
    }

    @PostMapping("/{recommendationId}/add")
    public ResponseEntity<Comment> add(@PathVariable String recommendationId,
                                       @RequestBody CommentDto commentDto) {
        try {
            return new ResponseEntity<>(commentService.addComment(
                    recommendationId,
                    commentDto),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{recommendationId}/edit/{commentId}")
    public ResponseEntity<Comment> edit(@PathVariable String recommendationId,
                                        @PathVariable String commentId,
                                        @RequestBody CommentDto commentDto) {
        try {
            return new ResponseEntity<>(commentService.editComment(
                    commentId,
                    recommendationId,
                    commentDto),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Comment> delete(@PathVariable String commentId) {
        try {
            return new ResponseEntity<>(commentService.removeComment(
                    commentId),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}