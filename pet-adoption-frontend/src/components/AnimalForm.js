import React, { useState } from 'react';
import api from '../services/api';

function AnimalForm() {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    gender: '',
    age_estimated: '',
    weight: '',
    status: 'available',
    description: '',
    vaccinated: false,
    neutered: false
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.post('/animals/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setMessage('Animal cadastrado com sucesso!');
      setFormData({
        name: '',
        species: '',
        breed: '',
        gender: '',
        age_estimated: '',
        weight: '',
        status: 'available',
        description: '',
        vaccinated: false,
        neutered: false
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar animal');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Cadastrar Novo Animal</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium mb-1">Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Espécie */}
          <div>
            <label className="block text-sm font-medium mb-1">Espécie:</label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Raça */}
          <div>
            <label className="block text-sm font-medium mb-1">Raça:</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gênero */}
          <div>
            <label className="block text-sm font-medium mb-1">Gênero:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione</option>
              <option value="M">Macho</option>
              <option value="F">Fêmea</option>
            </select>
          </div>

          {/* Idade Estimada */}
          <div>
            <label className="block text-sm font-medium mb-1">Idade Estimada:</label>
            <input
              type="number"
              name="age_estimated"
              value={formData.age_estimated}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          {/* Peso */}
          <div>
            <label className="block text-sm font-medium mb-1">Peso (kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              step="0.01"
              min="0"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="available">Disponível</option>
              <option value="adopted">Adotado</option>
              <option value="under_treatment">Em tratamento</option>
              <option value="quarantine">Em quarentena</option>
            </select>
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium mb-1">Descrição:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vaccinated"
              name="vaccinated"
              checked={formData.vaccinated}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="vaccinated" className="ml-2 block text-sm">
              Vacinado
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="neutered"
              name="neutered"
              checked={formData.neutered}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="neutered" className="ml-2 block text-sm">
              Castrado
            </label>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cadastrar Animal
        </button>
      </form>
    </div>
  );
}

export default AnimalForm;