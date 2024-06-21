import React, { useState, useEffect } from "react";

interface Odontologo {
  id?: number;
  nombre: string;
  apellido: string;
  matricula: string;
}

const OdontologoForm: React.FC = () => {
  const [odontologos, setOdontologos] = useState<Odontologo[]>([]);
  const [form, setForm] = useState<Odontologo>({
    nombre: "",
    apellido: "",
    matricula: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchOdontologos = async () => {
      try {
        const response = await fetch("http://localhost:8080/odontologos");
        if (!response.ok) {
          throw new Error("Error fetching odontologos");
        }
        const data = await response.json();
        setOdontologos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchOdontologos();
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
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `http://localhost:8080/odontologos/${form.id}`
        : "http://localhost:8080/odontologos";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Error creating or updating odontologo");
      }
      const updatedOdontologo = await response.json();
      if (isEditing) {
        setOdontologos(
          odontologos.map((o) =>
            o.id === updatedOdontologo.id ? updatedOdontologo : o
          )
        );
      } else {
        setOdontologos([...odontologos, updatedOdontologo]);
      }
      setIsEditing(false);
      setForm({
        nombre: "",
        apellido: "",
        matricula: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (odontologo: Odontologo) => {
    setForm(odontologo);
    setIsEditing(true);
  };

  const handleDelete = async (id?: number) => {
    try {
      await fetch(`http://localhost:8080/odontologos/${id}`, {
        method: "DELETE",
      });
      setOdontologos(odontologos.filter((o) => o.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="mb-6 text-2xl">
          {isEditing ? "Edit Odontologo" : "Create Odontologo"}
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
          <label className="block mb-2">Matricula</label>
          <input
            name="matricula"
            value={form.matricula}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="w-full p-2 text-white bg-blue-500">
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
      <h2 className="mt-10 text-2xl">Odontologos</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Apellido</th>
            <th className="py-2">Matricula</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {odontologos.map((odontologo) => (
            <tr key={odontologo.id}>
              <td className="px-4 py-2 border">{odontologo.nombre}</td>
              <td className="px-4 py-2 border">{odontologo.apellido}</td>
              <td className="px-4 py-2 border">{odontologo.matricula}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(odontologo)}
                  className="px-4 py-2 mr-2 text-white bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(odontologo.id)}
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

export default OdontologoForm;
