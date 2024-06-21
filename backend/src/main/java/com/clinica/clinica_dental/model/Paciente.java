package com.clinica.clinica_dental.model;

import jakarta.persistence.*;

@Entity
public class Paciente {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nombre;
  private String apellido;
  @Column(unique = true)
  private String dni;
  
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "domicilio_id", referencedColumnName = "id")
  private Domicilio domicilio;
  
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
  
  public String getDni() {
    return dni;
  }
  
  public void setDni(String dni) {
    this.dni = dni;
  }
  
  public Domicilio getDomicilio() {
    return domicilio;
  }
  
  public void setDomicilio(Domicilio domicilio) {
    this.domicilio = domicilio;
  }
}
