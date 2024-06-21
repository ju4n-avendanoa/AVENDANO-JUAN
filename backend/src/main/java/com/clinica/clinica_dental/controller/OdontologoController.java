package com.clinica.clinica_dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.clinica.clinica_dental.model.Odontologo;
import com.clinica.clinica_dental.service.OdontologoService;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologos")
public class OdontologoController {
  
  @Autowired
  private OdontologoService odontologoService;
  
  @GetMapping
  public List<Odontologo> getAllOdontologos() {
    return odontologoService.getAllOdontologos();
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<Odontologo> getOdontologoById(@PathVariable Long id) {
    Optional<Odontologo> odontologo = odontologoService.getOdontologoById(id);
    return odontologo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }
  
  @PostMapping
  public ResponseEntity<Odontologo> createOdontologo(@RequestBody Odontologo odontologo) {
    Odontologo savedOdontologo = odontologoService.saveOdontologo(odontologo);
    return ResponseEntity.ok(savedOdontologo);
  }
  
  @PutMapping("/{id}")
  public ResponseEntity<Odontologo> updateOdontologo(@PathVariable Long id, @RequestBody Odontologo updatedOdontologo) {
    try {
      Odontologo odontologo = odontologoService.updateOdontologo(id, updatedOdontologo);
      return ResponseEntity.ok(odontologo);
    } catch (Exception e) {
      return ResponseEntity.status(400).body(null);
    }
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteOdontologo(@PathVariable Long id) {
    odontologoService.deleteOdontologo(id);
    return ResponseEntity.noContent().build();
  }
}
