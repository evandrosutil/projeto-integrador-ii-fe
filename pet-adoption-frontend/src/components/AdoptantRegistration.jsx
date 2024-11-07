import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdoptantRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile: {
      first_name: '',
      last_name: '',
      phone: '',
      birth_date: '',
      street_name: '',
      street_number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipcode: '',
      residence_type: 'HOUSE',
      has_screens: false,
      number_of_residents: 1,
      has_children: false,
      has_allergic_residents: false,
      has_other_pets: false,
      number_of_pets: 0,
      adoption_motivation: '',
      acknowledges_costs: false
    }
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('profile.')) {
      const profileField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [profileField]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register/adopter/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: 'adopter',
        profile: formData.profile
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErrors(error.response?.data || { general: "Erro ao registrar novo adotante" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registro de Adotante</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos básicos de usuário */}
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
 
        {/* Campos do perfil */}  
        <div>
          <label className="block mb-2">Telefone</label>
          <input
            name="profile.phone"
            type="phone"
            value={formData.profile.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
       <div>
          <label className="block mb-2">Nome</label>
          <input
            type="text"
            name="profile.first_name"
            value={formData.profile.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
       <div>
          <label className="block mb-2">Sobrenome</label>
          <input
            type="text"
            name="profile.last_name"
            value={formData.profile.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Informações Adicionais</h3>
          <div>
            <label className="block mb-2">Data de Nascimento</label>
            <input
              type="date"
              name="profile.birth_date"
              value={formData.profile.birth_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Logradouro</label>
            <input
             type="text"
             name="profile.street_name"
             value={formData.profile.street_name}
             onChange={handleChange}
             className="w-full p-2 border rounded"
             />
          </div>
          <div>
            <label className="block mb-2">Número</label>
            <input
             type="text"
             name="profile.street_number"
             value={formData.profile.street_number}
             onChange={handleChange}
             className="w-full p-2 border rounded"
             />
          </div>
          <div>
            <label className="block mb-2">Complemento</label>
            <input
             type="text"
             name="profile.complement"
             value={formData.profile.complement}
             onChange={handleChange}
             className="w-full p-2 border rounded"
             />
          </div>
          <div>
            <label className="block mb-2">Bairro</label>
            <input
             type="text"
             name="profile.neighborhood"
             value={formData.profile.neighborhood}
             onChange={handleChange}
             className="w-full p-2 border rounded"
             />
          </div>
          <div>
            <label className="block mb-2">Cidade</label>
            <input
             type="text"
             name="profile.city"
             value={formData.profile.city}
             onChange={handleChange}
             className="w-full p-2 border rounded"
             />
          </div>
          <div>
            <label className="block mb-2">Estado</label>
            <input
             type="text"
             name="profile.state"
             value={formData.profile.state}
             onChange={handleChange}
             className="w-full p-2 border rounded"
             />
          </div>
          <div>
            <label className="block mb-2">CEP</label>
            <input
             type="text"
             name="profile.zipcode"
             value={formData.profile.zipcode}
             onChange={handleChange}
             className="w-full p-2 border rounded"
             />
          </div>
          <div>
            <label className="block mb-2">Tipo de residência: </label>
            <select
              name="profile.residence_type"
              value={formData.profile.residence_type}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              >
                <option value="HOUSE">Casa</option>
                <option value="APARTMENT">Apartamento</option>
                <option value="FARM">Fazenda</option>
              </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="has_screens" className="ml-2 block text-sm">
              A residência possui telas de proteção
            </label>
            <input
              type="checkbox"
              id="has_screens"
              name="profile.has_screens"
              checked={formData.profile.has_screens}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Número de pessoas que moram na residência:</label>
            <input
              type="number"
              name="profile.number_of_residents"
              value={formData.profile.number_of_residents}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              step="1"
              min="1"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="has_children" className="ml-2 block text-sm">
              Crianças moram na residência
            </label>
            <input
              type="checkbox"
              id="has_children"
              name="profile.has_children"
              checked={formData.profile.has_children}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="has_allergic_residents" className="ml-2 block text-sm">
              Há pessoas com alergia na residência
            </label>
            <input
              type="checkbox"
              id="has_allergic_residents"
              name="profile.has_allergic_residents"
              checked={formData.profile.has_allergic_residents}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="has_other_pets" className="ml-2 block text-sm">
              Há outros pets na residência
            </label>
            <input
              type="checkbox"
              id="has_other_pets"
              name="profile.has_other_pets"
              checked={formData.profile.has_other_pets}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Motivos que o levararam a adotar um pet: </label>
            <textarea
              name="profile.adoption_motivation"
              value={formData.profile.adoption_motivation}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="acknowledges_costs" className="ml-2 block text-sm">
              Reconheço os custos e as responsabilidades relacionadas a adoção de um pet
            </label>
            <input
              type="checkbox"
              id="acknowledges_costs"
              name="profile.acknowledges_costs"
              checked={formData.profile.acknowledges_costs}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>

        {errors.general && (
          <div className="text-red-500 mt-2">{errors.general}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default AdoptantRegistration;