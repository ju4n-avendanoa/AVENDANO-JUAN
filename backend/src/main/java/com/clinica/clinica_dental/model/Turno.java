package com.clinica.clinica_dental.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Turno {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @ManyToOne
  @JoinColumn(name = "paciente_id")
  private Paciente paciente;
  
  @ManyToOne
  @JoinColumn(name = "odontologo_id")
  private Odontologo odontologo;
  
  private LocalDateTime fechaHora;
  
  @PrePersist
  protected void onCreate() {
    fechaHora = LocalDateTime.now();
  }
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Paciente getPaciente() {
    return paciente;
  }
  
  public void setPaciente(Paciente paciente) {
    this.paciente = paciente;
  }
  
  public Odontologo getOdontologo() {
    return odontologo;
  }
  
  public void setOdontologo(Odontologo odontologo) {
    this.odontologo = odontologo;
  }
  
  public LocalDateTime getFechaHora() {
    return fechaHora;
  }
  
  public void setFechaHora(LocalDateTime fechaHora) {
    this.fechaHora = fechaHora;
  }
  
}
