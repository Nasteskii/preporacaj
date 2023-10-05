package com.preporacaj.preporacaj_backend.service;

import com.preporacaj.preporacaj_backend.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    Page<Comment> getAll(Pageable pageable);
    Page<Comment> getByRecommendationId(String recommendationId, Pageable pageable);
    Comment addComment(String profileId, String recommendationId, String commentContent);
    Comment editComment(String commentId, String profileId, String recommendationId, String commentContent);
    Comment removeComment(String commentId);
}
