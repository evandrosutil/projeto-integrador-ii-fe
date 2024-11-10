import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Hero from './Hero';
import Reviews from './Reviews';

const Home = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar os animais da API
        const fetchAnimals = async () => {
            try {
                const response = await api.get('/animals/');
                setAnimals(response.data.results || response.data);
                setLoading(false);
                console.log("encontrados ", response.data.results.length, " animais");
            } catch (err) {
                setError('Erro ao carregar os animais.');
                setLoading(false);
            }
        };

        fetchAnimals();
    }, []);


    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <Hero animals={animals} />
            <Reviews />
        </div>
    );
};

export default Home;
