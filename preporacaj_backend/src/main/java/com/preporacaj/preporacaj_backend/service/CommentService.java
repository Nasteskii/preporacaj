package com.preporacaj.preporacaj_backend.service;

import com.preporacaj.preporacaj_backend.model.Comment;
import com.preporacaj.preporacaj_backend.model.dto.CommentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    Page<Comment> getAll(Pageable pageable);
    Page<Comment> getByRecommendationId(String recommendationId, Pageable pageable);
    Comment addComment(String recommendationId, CommentDto commentDto);
    Comment editComment(String commentId, String recommendationId, CommentDto commentDto);
    Comment removeComment(String commentId);
}
