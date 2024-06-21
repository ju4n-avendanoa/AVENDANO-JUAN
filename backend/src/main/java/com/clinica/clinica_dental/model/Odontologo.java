package com.clinica.clinica_dental.model;

import jakarta.persistence.*;

@Entity
public class Odontologo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nombre;
  private String apellido;
  @Column(unique = true)
  private String matricula;
  
  // Getters y Setters
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getNombre() {
    return nombre;
  }
  
  public void setNombre(String nombre) {
    this.nombre = nombre;
  }
  
  public String getApellido() {
    return apellido;
  }
  
  public void setApellido(String apellido) {
    this.apellido = apellido;
  }
  
  public String getMatricula() {
    return matricula;
  }
  
  public void setMatricula(String matricula) {
    this.matricula = matricula;
  }
}
