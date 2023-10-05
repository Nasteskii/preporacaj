package com.preporacaj.preporacaj_backend.service;

import com.preporacaj.preporacaj_backend.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getAll();
    Comment addComment(String profileId, String recommendationId, String commentContent);
    Comment editComment(String commentId, String profileId, String recommendationId, String commentContent);
    Comment removeComment(String commentId);
}
