package com.clinica.clinica_dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.clinica.clinica_dental.model.Paciente;
import com.clinica.clinica_dental.repository.PacienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
  
  @Autowired
  private PacienteRepository pacienteRepository;
  
  public List<Paciente> getAllPacientes() {
    return pacienteRepository.findAll();
  }
  
  public Optional<Paciente> getPacienteById(Long id) {
    return pacienteRepository.findById(id);
  }
  
  public Paciente savePaciente(Paciente paciente) {
    return pacienteRepository.save(paciente);
  }
  
  public Paciente updatePaciente(Long id, Paciente updatedPaciente) throws Exception {
    Optional<Paciente> optionalPaciente = pacienteRepository.findById(id);
    if (optionalPaciente.isPresent()) {
      Paciente paciente = optionalPaciente.get();
      paciente.setNombre(updatedPaciente.getNombre());
      paciente.setApellido(updatedPaciente.getApellido());
      paciente.setDni(updatedPaciente.getDni());
      paciente.setDomicilio(updatedPaciente.getDomicilio());
      return pacienteRepository.save(paciente);
    } else {
      throw new Exception("Paciente no encontrado");
    }
  }
  
  public void deletePaciente(Long id) {
    pacienteRepository.deleteById(id);
  }
}
