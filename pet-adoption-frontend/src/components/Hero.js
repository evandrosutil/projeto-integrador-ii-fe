import React from 'react';
import Slider from 'react-slick';
import '../App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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

const getPorte = (weight) => {
  if (weight <= 15) return 'pequeno';
  if (weight <= 25) return 'médio';
  if (weight <= 45) return 'grande';
  return 'gigante';
}

const Hero = ({ animals }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
    ],
  };
  console.log("animais: ", animals.length);
  console.log(animals);

  return (
    <section className="hero">
      <h1>Aqui você pode encontrar uma nova amizade</h1>
      {animals.length > 0 ? (
        <Slider {...settings} className="animal-carousel">
          {animals.map(animal => (
            <div key={animal.id} className="animal-card">
              <img src={animal.image} alt={animal.name} className="animal-image" />
              <div className="animal-info">
                <h3 className="animal-name">{animal.name}</h3>
                <p className="animal-details">
                  {getGenderLabel(animal.gender)} • {getIdadeGroup(animal.age_estimated)} • {getPorte(animal.weight)}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Carregando animais...</p>
      )}
      <button className="adopt-btn">Adote</button>
    </section>
  );
};

export default Hero;
