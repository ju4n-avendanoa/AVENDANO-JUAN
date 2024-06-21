package com.clinica.clinica_dental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.clinica.clinica_dental.model.Domicilio;

public interface DomicilioRepository extends JpaRepository<Domicilio, Long> {
}
