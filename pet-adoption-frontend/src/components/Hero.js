import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="images">
        <img src="../images/cachorro2.jpg" alt="Dog 1" />
        <img src="dog2.png" alt="Dog 2" />
      </div>
      <h1>Aqui você pode encontrar uma nova amizade</h1>
      <button className="adopt-btn">Adote</button>
    </section>
  );
};

export default Hero;