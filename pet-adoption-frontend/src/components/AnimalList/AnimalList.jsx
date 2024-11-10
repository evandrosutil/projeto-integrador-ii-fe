import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Search } from 'lucide-react';
import './AnimalList.css';
import dog2 from "../../images/cachorro2.jpg"
import dog3 from "../../images/cachorro3.jpg"
import dog4 from "../../images/cachorro4.jpg"
import { getUserData } from '../../services/auth';


const placeholderImages = [
  dog2,
  dog3,
  dog4,
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  const result = placeholderImages[randomIndex];
  console.log(result);
  return result;
};

function AdopterAnimalList() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [idadeFilter, setIdadeFilter] = useState('todos');
  const [vacinacaoFilter, setVacinacaoFilter] = useState('todos');
  const [porteFilter, setPorteFilter] = useState('todos');
  const [generoFilter, setGeneroFilter] = useState('todos');
  const [castradoFilter, setCastradoFilter] = useState('todos');
  const userData = getUserData();

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await api.get('/animals/');
      setAnimals(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar os animais.');
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

  const getIdadeGroup = (age_estimated) => {
    if (age_estimated <= 1) return 'filhote';
    if (age_estimated <= 7) return 'adulto';
    return 'idoso';
  };

  const getVaccineted = (vaccinated) => {
    if (vaccinated) return "vacinado";
    return "nao_vacinado";
  }

  const getNeutered = (neutered) => {
    if (neutered) return "castrado";
    return "nao_castrado"; 
  }

  const getPorte = (weight) => {
    if (weight <= 15) return 'pequeno';
    if (weight <= 25) return 'médio';
    if (weight <= 45) return 'grande';
    return 'gigante';
  }
  
  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIdade = idadeFilter === 'todos' || getIdadeGroup(animal.age_estimated) === idadeFilter;
    const matchesVacinacao = vacinacaoFilter === 'todos' || getVaccineted(animal.vaccinated) === vacinacaoFilter;
    const matchesStatus = (userData.role === 'admin' && (statusFilter === 'todos' || animal.status === statusFilter)) || animal.status === 'available';
    const matchesGenero = generoFilter === 'todos' || animal.gender === generoFilter;
    const matchesCastrado = castradoFilter === 'todos' || getNeutered(animal.neutered) === castradoFilter;
    const matchesPorte = porteFilter === 'todos' || getPorte(animal.weight) === porteFilter;
  
    return matchesSearch && matchesIdade && matchesVacinacao && matchesStatus && matchesGenero && matchesCastrado && matchesPorte;
  });


  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2 className="page-title">Adoções</h2>

      {/* Campo de Busca */}
      <div className='filters-container'>
        <div className="search-container">
          <div className="relative">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, espécie ou raça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className='select-container'>

            {userData?.role === 'admin' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select-input"
              >
                <option value="todos">Todos os status</option>
                <option value="available">Disponível</option>
                <option value="adopted">Adotado</option>
                <option value="under_treatment">Em tratamento</option>
                <option value="quarantine">Em quarentena</option>
              </select>
            )}

            <select
              className="select-input"
              value={idadeFilter}
              onChange={(e) => setIdadeFilter(e.target.value)}
            >
              <option value="todos">Todas as idades</option>
              <option value="filhote">Filhote (0-1 ano)</option>
              <option value="adulto">Adulto (1-7 anos)</option>
              <option value="idoso">Idoso (7+ anos)</option>
            </select>

            <select
              value={vacinacaoFilter}
              onChange={(e) => setVacinacaoFilter(e.target.value)}
              className="select-input"
            >
              <option value="todos">Todas as vacinações</option>
              <option value="vacinado">Vacinação completa</option>
              <option value="nao_vacinado">Vacinação pendente</option>
            </select>

            <select
              className="select-input"
              value={castradoFilter}
              onChange={(e) => setCastradoFilter(e.target.value)}
            >
              <option value="todos">Todas as castrações</option>
              <option value="castrado">Castrados</option>
              <option value="nao_castrado">Castração pendente</option>
            </select>

            <select
              value={generoFilter}
              onChange={(e) => setGeneroFilter(e.target.value)}
              className='select-input'
            >
              <option value="todos">Todas os gêneros</option>
              <option value="M">Macho</option>
              <option value="F">Fêmea</option>
            </select>

            <select
              value={porteFilter}
              onChange={(e) => setPorteFilter(e.target.value)}
              className='select-input'
            >
              <option value="todos">Todos os portes</option>
              <option value="pequeno">Pequeno</option>
              <option value="médio">Médio</option>
              <option value="grande">Grande</option>
              <option value="gigante">Gigante</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="animal-grid">
        {filteredAnimals.map(animal => (
          <div key={animal.id} className="animal-card">
            {/*Foro*/}
            <img
              src={animal.image}// || getRandomImage()}
              alt={animal.name}
              className="animal-image"
            />

            {/* Informações do Animal */}
            <div className="animal-info">
              <h3 className="animal-name">{animal.name}</h3>
              <p className="animal-details">
                {getGenderLabel(animal.gender)} • {getIdadeGroup(animal.age_estimated)} • {getPorte(animal.weight)}<br/><br/>
                {userData?.role === 'admin' && (getStatusLabel(animal.status))}
              </p>
              <br/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdopterAnimalList;