package com.clinica.clinica_dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.clinica.clinica_dental.model.Turno;
import com.clinica.clinica_dental.service.TurnoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
  
  @Autowired
  private TurnoService turnoService;
  
  @GetMapping
  public List<Turno> getAllTurnos() {
    return turnoService.getAllTurnos();
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<Turno> getTurnoById(@PathVariable Long id) {
    Optional<Turno> turno = turnoService.getTurnoById(id);
    return turno.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }
  
  @PostMapping
  public ResponseEntity<?> createTurno(@RequestBody Turno turno) {
    try {
      Turno savedTurno = turnoService.saveTurno(turno);
      return ResponseEntity.ok(savedTurno);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }
  
  @PutMapping("/{id}")
  public ResponseEntity<?> updateTurno(@PathVariable Long id, @RequestBody Turno updatedTurno) {
    try {
      Turno turno = turnoService.updateTurno(id, updatedTurno);
      if (turno != null) {
        return ResponseEntity.ok(turno);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTurno(@PathVariable Long id) {
    turnoService.deleteTurno(id);
    return ResponseEntity.noContent().build();
  }
}
