package com.clinica.clinica_dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.clinica.clinica_dental.model.Turno;
import com.clinica.clinica_dental.model.Paciente;
import com.clinica.clinica_dental.model.Odontologo;
import com.clinica.clinica_dental.repository.TurnoRepository;
import com.clinica.clinica_dental.repository.PacienteRepository;
import com.clinica.clinica_dental.repository.OdontologoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
  
  @Autowired
  private TurnoRepository turnoRepository;
  
  @Autowired
  private PacienteRepository pacienteRepository;
  
  @Autowired
  private OdontologoRepository odontologoRepository;
  
  public List<Turno> getAllTurnos() {
    return turnoRepository.findAll();
  }
  
  public Optional<Turno> getTurnoById(Long id) {
    return turnoRepository.findById(id);
  }
  
  public Turno saveTurno(Turno turno) throws Exception {
    System.out.println(turno);
    Optional<Paciente> paciente = pacienteRepository.findByDni(turno.getPaciente().getDni());
    Optional<Odontologo> odontologo = odontologoRepository.findByMatricula(turno.getOdontologo().getMatricula());
    if (paciente.isPresent() && odontologo.isPresent()) {
      turno.setPaciente(paciente.get());
      turno.setOdontologo(odontologo.get());
      return turnoRepository.save(turno);
    } else {
      throw new Exception("Paciente u Odontólogo no existen");
    }
  }
  
  public Turno updateTurno(Long id, Turno updatedTurno) throws Exception {
    Optional<Turno> optionalTurno = turnoRepository.findById(id);
    if (optionalTurno.isPresent()) {
      Turno turno = optionalTurno.get();
      Optional<Paciente> paciente = pacienteRepository.findByDni(updatedTurno.getPaciente().getDni());
      Optional<Odontologo> odontologo = odontologoRepository.findByMatricula(updatedTurno.getOdontologo().getMatricula());
      if (paciente.isPresent() && odontologo.isPresent()) {
        turno.setPaciente(paciente.get());
        turno.setOdontologo(odontologo.get());
        turno.setFechaHora(updatedTurno.getFechaHora());
        return turnoRepository.save(turno);
      } else {
        throw new Exception("Paciente u Odontólogo no existen");
      }
    } else {
      throw new Exception("Turno no encontrado");
    }
  }
  
  public void deleteTurno(Long id) {
    turnoRepository.deleteById(id);
  }
}
