import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      console.log("Fazendo requisição para a API...");
      const response = await api.get('/animals/');
      console.log("Resposta da API:", response.data);
      
      // Verificar se response.data é um objeto com results
      const animalData = response.data.results || response.data;
      
      // Garantir que temos um array
      if (Array.isArray(animalData)) {
        setAnimals(animalData);
      } else {
        console.error("Dados recebidos não são um array:", animalData);
        setError('Formato de dados inválido');
      }
      setLoading(false);
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError('Erro ao carregar os animais: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'available': 'Disponível',
      'adopted': 'Adotado',
      'under_treatment': 'Em tratamento',
      'quarantine': 'Em quarentena'
    };
    return statusMap[status] || status;
  };

  const getGenderLabel = (gender) => {
    return gender === 'M' ? 'Macho' : gender === 'F' ? 'Fêmea' : gender;
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Carregando...</div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto p-4">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Erro</p>
        <p>{error}</p>
      </div>
    </div>
  );

  if (!Array.isArray(animals)) {
    console.error("animals não é um array:", animals);
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Erro</p>
          <p>Erro no formato dos dados</p>
        </div>
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Lista de Animais</h2>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          Nenhum animal cadastrado.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Lista de Animais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map(animal => (
          <div key={animal.id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  animal.status === 'available' ? 'bg-green-100 text-green-800' :
                  animal.status === 'adopted' ? 'bg-blue-100 text-blue-800' :
                  animal.status === 'under_treatment' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {getStatusLabel(animal.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Espécie:</p>
                  <p className="font-medium">{animal.species}</p>
                </div>
                <div>
                  <p className="text-gray-600">Raça:</p>
                  <p className="font-medium">{animal.breed || 'Não informada'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Gênero:</p>
                  <p className="font-medium">{getGenderLabel(animal.gender)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Idade:</p>
                  <p className="font-medium">{animal.age_estimated} anos</p>
                </div>
                <div>
                  <p className="text-gray-600">Peso:</p>
                  <p className="font-medium">{animal.weight} kg</p>
                </div>
              </div>

              <div className="text-sm mb-4">
                <p className="text-gray-600">Descrição:</p>
                <p className="mt-1">{animal.description || 'Sem descrição'}</p>
              </div>

              <div className="flex space-x-4 text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${animal.vaccinated ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>Vacinado</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${animal.neutered ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>Castrado</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimalList;