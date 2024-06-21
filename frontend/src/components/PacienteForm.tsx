import React, { useState, useEffect } from "react";

interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: {
    calle: string;
    ciudad: string;
    provincia: string;
    pais: string;
  };
}

const PacienteForm: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [form, setForm] = useState<Paciente>({
    nombre: "",
    apellido: "",
    dni: "",
    domicilio: {
      calle: "",
      ciudad: "",
      provincia: "",
      pais: "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/pacientes");
        if (!response.ok) {
          throw new Error("Error fetching pacientes");
        }
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPacientes();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes("domicilio")) {
      const [_, key] = name.split(".");
      setForm((prev) => ({
        ...prev,
        domicilio: {
          ...prev.domicilio,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `http://localhost:8080/pacientes/${form.id}`
        : "http://localhost:8080/pacientes";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Error creating or updating paciente");
      }
      const updatedPaciente = await response.json();
      if (isEditing) {
        setPacientes(
          pacientes.map((p) =>
            p.id === updatedPaciente.id ? updatedPaciente : p
          )
        );
      } else {
        setPacientes([...pacientes, updatedPaciente]);
      }
      setIsEditing(false);
      setForm({
        nombre: "",
        apellido: "",
        dni: "",
        domicilio: {
          calle: "",
          ciudad: "",
          provincia: "",
          pais: "",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (paciente: Paciente) => {
    setForm(paciente);
    setIsEditing(true);
  };

  const handleDelete = async (id?: number) => {
    try {
      await fetch(`http://localhost:8080/pacientes/${id}`, {
        method: "DELETE",
      });
      setPacientes(pacientes.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="mb-6 text-2xl">
          {isEditing ? "Edit Paciente" : "Create Paciente"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Apellido</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">DNI</label>
          <input
            name="dni"
            value={form.dni}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Calle</label>
          <input
            name="domicilio.calle"
            value={form.domicilio.calle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ciudad</label>
          <input
            name="domicilio.ciudad"
            value={form.domicilio.ciudad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Provincia</label>
          <input
            name="domicilio.provincia"
            value={form.domicilio.provincia}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Pais</label>
          <input
            name="domicilio.pais"
            value={form.domicilio.pais}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="w-full p-2 text-white bg-blue-500">
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
      <h2 className="mt-10 text-2xl">Pacientes</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Apellido</th>
            <th className="py-2">DNI</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td className="px-4 py-2 border">{paciente.nombre}</td>
              <td className="px-4 py-2 border">{paciente.apellido}</td>
              <td className="px-4 py-2 border">{paciente.dni}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(paciente)}
                  className="px-4 py-2 mr-2 text-white bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(paciente.id)}
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

export default PacienteForm;
