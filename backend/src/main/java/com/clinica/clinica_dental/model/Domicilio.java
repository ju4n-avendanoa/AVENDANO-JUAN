package com.clinica.clinica_dental.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Domicilio {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String calle;
  private String ciudad;
  private String provincia;
  private String pais;
  
  // Getters y Setters
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getCalle() {
    return calle;
  }
  
  public void setCalle(String calle) {
    this.calle = calle;
  }
  
  public String getCiudad() {
    return ciudad;
  }
  
  public void setCiudad(String ciudad) {
    this.ciudad = ciudad;
  }
  
  public String getProvincia() {
    return provincia;
  }
  
  public void setProvincia(String provincia) {
    this.provincia = provincia;
  }
  
  public String getPais() {
    return pais;
  }
  
  public void setPais(String pais) {
    this.pais = pais;
  }
}
