import React, { useState, useEffect } from "react";
import { TurnoCreado } from "../interface/Clinica";

interface Turno {
  id?: number;
  pacienteDni: string;
  odontologoMatricula: string;
}

const TurnoForm: React.FC = () => {
  const [turnos, setTurnos] = useState<TurnoCreado[]>([]);
  const [form, setForm] = useState<Turno>({
    pacienteDni: "",
    odontologoMatricula: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch("http://localhost:8080/turnos");
        if (!response.ok) {
          throw new Error("Error fetching turnos");
        }
        const data = await response.json();
        console.log(data);
        setTurnos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTurnos();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paciente: {
            dni: form.pacienteDni,
          },
          odontologo: {
            matricula: form.odontologoMatricula,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating turno");
      }
      const updatedTurno = await response.json();
      if (isEditing) {
        setTurnos(
          turnos.map((t) => (t.id === updatedTurno.id ? updatedTurno : t))
        );
      } else {
        setTurnos([...turnos, updatedTurno]);
      }
      setIsEditing(false);
      setForm({
        pacienteDni: "",
        odontologoMatricula: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (turno: TurnoCreado) => {
    setForm({
      pacienteDni: turno.paciente.dni,
      odontologoMatricula: turno.odontologo.matricula,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id?: number) => {
    try {
      await fetch(`http://localhost:8080/turnos/${id}`, {
        method: "DELETE",
      });
      setTurnos(turnos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="mb-6 text-2xl">
          {isEditing ? "Edit Turno" : "Create Turno"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Paciente DNI</label>
          <input
            name="pacienteDni"
            value={form.pacienteDni}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Odontologo Matricula</label>
          <input
            name="odontologoMatricula"
            value={form.odontologoMatricula}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="w-full p-2 text-white bg-blue-500">
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
      <h2 className="mt-10 text-2xl">Turnos</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Paciente DNI</th>
            <th className="py-2">Odontologo Matricula</th>
            <th className="py-2">Fecha</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id}>
              <td className="px-4 py-2 border">{turno.paciente.dni}</td>
              <td className="px-4 py-2 border">{turno.odontologo.matricula}</td>
              <td className="px-4 py-2 border">{turno.fechaHora}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(turno)}
                  className="px-4 py-2 mr-2 text-white bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(turno.id)}
                  className="px-4 py-2 text-white bg-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TurnoForm;
