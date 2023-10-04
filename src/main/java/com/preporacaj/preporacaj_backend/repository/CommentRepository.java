package com.preporacaj.preporacaj_backend.repository;

import com.preporacaj.preporacaj_backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
}
