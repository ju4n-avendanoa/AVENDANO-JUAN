package com.clinica.clinica_dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.clinica.clinica_dental.model.Odontologo;
import com.clinica.clinica_dental.repository.OdontologoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {
  
  @Autowired
  private OdontologoRepository odontologoRepository;
  
  public List<Odontologo> getAllOdontologos() {
    return odontologoRepository.findAll();
  }
  
  public Optional<Odontologo> getOdontologoById(Long id) {
    return odontologoRepository.findById(id);
  }
  
  public Odontologo saveOdontologo(Odontologo odontologo) {
    return odontologoRepository.save(odontologo);
  }
  
  public Odontologo updateOdontologo(Long id, Odontologo updatedOdontologo) throws Exception {
    Optional<Odontologo> optionalOdontologo = odontologoRepository.findById(id);
    if (optionalOdontologo.isPresent()) {
      Odontologo odontologo = optionalOdontologo.get();
      odontologo.setNombre(updatedOdontologo.getNombre());
      odontologo.setApellido(updatedOdontologo.getApellido());
      odontologo.setMatricula(updatedOdontologo.getMatricula());
      return odontologoRepository.save(odontologo);
    } else {
      throw new Exception("Odontólogo no encontrado");
    }
  }
  
  public void deleteOdontologo(Long id) {
    odontologoRepository.deleteById(id);
  }
}
