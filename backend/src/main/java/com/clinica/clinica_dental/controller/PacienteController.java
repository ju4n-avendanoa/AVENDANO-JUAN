package com.clinica.clinica_dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.clinica.clinica_dental.model.Paciente;
import com.clinica.clinica_dental.service.PacienteService;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {
  
  @Autowired
  private PacienteService pacienteService;
  
  @GetMapping
  public List<Paciente> getAllPacientes() {
    return pacienteService.getAllPacientes();
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<Paciente> getPacienteById(@PathVariable Long id) {
    Optional<Paciente> paciente = pacienteService.getPacienteById(id);
    return paciente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }
  
  @PostMapping
  public ResponseEntity<Paciente> createPaciente(@RequestBody Paciente paciente) {
    System.out.println(paciente);
    Paciente savedPaciente = pacienteService.savePaciente(paciente);
    return ResponseEntity.ok(savedPaciente);
  }
  
  @PutMapping("/{id}")
  public ResponseEntity<Paciente> updatePaciente(@PathVariable Long id, @RequestBody Paciente updatedPaciente) {
    try {
      Paciente paciente = pacienteService.updatePaciente(id, updatedPaciente);
      return ResponseEntity.ok(paciente);
    } catch (Exception e) {
      return ResponseEntity.status(400).body(null);
    }
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
    pacienteService.deletePaciente(id);
    return ResponseEntity.noContent().build();
  }
}
