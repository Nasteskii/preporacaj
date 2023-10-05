package com.preporacaj.preporacaj_backend.repository;

import com.preporacaj.preporacaj_backend.model.Comment;
import com.preporacaj.preporacaj_backend.model.Recommendation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    Page<Comment> findAllByRecommendation(Recommendation recommendation, Pageable pageable);
}
