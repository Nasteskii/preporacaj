package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.model.Comment;
import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.repository.CommentRepository;
import com.preporacaj.preporacaj_backend.repository.ProfileRepository;
import com.preporacaj.preporacaj_backend.repository.RecommendationRepository;
import com.preporacaj.preporacaj_backend.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.net.ContentHandler;
import java.util.List;
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
    public Comment addComment(String profileId, String recommendationId, String commentContent) {
        Comment newComment = new Comment();
        Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);

        newComment.setProfile(profile);
        newComment.setRecommendation(recommendation);
        newComment.setCommentContent(commentContent);
        return commentRepository.save(newComment);
    }

    @Override
    public Comment editComment(String commentId, String profileId, String recommendationId, String commentContent) {
        Comment oldComment = commentRepository.findById(commentId).orElseThrow(NoSuchElementException::new);
        Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);

        oldComment.setProfile(profile);
        oldComment.setRecommendation(recommendation);
        oldComment.setCommentContent(commentContent);
        return commentRepository.save(oldComment);
    }

    @Override
    public Comment removeComment(String commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(NoSuchElementException::new);
        commentRepository.delete(comment);
        return comment;
    }
}
