export interface Domicilio {
  id: number;
  calle: string;
  ciudad: string;
  provincia: string;
  pais: string;
}

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: Domicilio;
}

export interface Odontologo {
  id: number;
  nombre: string;
  apellido: string;
  matricula: string;
}

export interface TurnoCreado {
  id: number;
  paciente: Paciente;
  odontologo: Odontologo;
  fechaHora: string;
}
