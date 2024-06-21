package com.clinica.clinica_dental.repository;

import com.clinica.clinica_dental.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByEmail(String email);
}
