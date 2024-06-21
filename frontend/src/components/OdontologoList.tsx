import React from "react";

interface Odontologo {
  id: number;
  nombre: string;
  apellido: string;
  matricula: string;
}

interface Props {
  odontologos: Odontologo[];
  onDelete: (id: number) => void;
}

const OdontologoList: React.FC<Props> = ({ odontologos, onDelete }) => {
  return (
    <div className="space-y-4">
      {odontologos.map((odontologo) => (
        <div
          key={odontologo.id}
          className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-medium text-gray-900">
              {odontologo.nombre} {odontologo.apellido}
            </p>
            <p className="text-sm text-gray-500">
              Matrícula: {odontologo.matricula}
            </p>
          </div>
          <button
            onClick={() => onDelete(odontologo.id)}
            className="text-red-600 hover:text-red-800"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default OdontologoList;
