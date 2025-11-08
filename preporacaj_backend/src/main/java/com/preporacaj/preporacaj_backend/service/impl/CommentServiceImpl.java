package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.model.Comment;
import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.dto.CommentDto;
import com.preporacaj.preporacaj_backend.repository.CommentRepository;
import com.preporacaj.preporacaj_backend.repository.ProfileRepository;
import com.preporacaj.preporacaj_backend.repository.RecommendationRepository;
import com.preporacaj.preporacaj_backend.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ProfileRepository profileRepository;
    private final RecommendationRepository recommendationRepository;

    @Override
    public Page<Comment> getAll(Pageable pageable) {
        return commentRepository.findAll(pageable);
    }

    @Override
    public Page<Comment> getByRecommendationId(String recommendationId, Pageable pageable) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        return commentRepository.findAllByRecommendation(recommendation, pageable);
    }

    @Override
    public Comment addComment(String recommendationId, CommentDto commentDto) {
        Comment newComment = new Comment();
        return saveComment(recommendationId, commentDto, newComment);
    }

    @Override
    public Comment editComment(String commentId, String recommendationId, CommentDto commentDto) {
        Comment oldComment = commentRepository.findById(commentId).orElseThrow(NoSuchElementException::new);
        return saveComment(recommendationId, commentDto, oldComment);
    }

    private Comment saveComment(String recommendationId, CommentDto commentDto, Comment comment) {
        if (comment.getProfile() == null) {
            Profile profile = profileRepository
                    .findById(commentDto.getProfileId())
                    .orElseThrow(NoSuchElementException::new);
            comment.setProfile(profile);
        }

        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        comment.setRecommendation(recommendation);
        comment.setCommentContent(commentDto.getContent());
        return commentRepository.save(comment);
    }

    @Override
    public Comment removeComment(String commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(NoSuchElementException::new);
        commentRepository.delete(comment);
        return comment;
    }
}
