package com.clinica.clinica_dental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.clinica.clinica_dental.model.Paciente;

import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
  Optional<Paciente> findByDni(String dni);
}
