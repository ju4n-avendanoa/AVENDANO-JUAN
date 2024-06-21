package com.clinica.clinica_dental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.clinica.clinica_dental.model.Odontologo;

import java.util.Optional;

public interface OdontologoRepository extends JpaRepository<Odontologo, Long> {
  Optional<Odontologo> findByMatricula(String matricula);
}
