import React from "react";

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: string;
}

interface Props {
  pacientes: Paciente[];
  onDelete: (id: number) => void;
}

const PacienteList: React.FC<Props> = ({ pacientes, onDelete }) => {
  return (
    <div className="space-y-4">
      {pacientes.map((paciente) => (
        <div
          key={paciente.id}
          className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-medium text-gray-900">
              {paciente.nombre} {paciente.apellido}
            </p>
            <p className="text-sm text-gray-500">DNI: {paciente.dni}</p>
            <p className="text-sm text-gray-500">
              Domicilio: {paciente.domicilio}
            </p>
          </div>
          <button
            onClick={() => onDelete(paciente.id)}
            className="text-red-600 hover:text-red-800"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default PacienteList;
