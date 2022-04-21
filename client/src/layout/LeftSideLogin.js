import React from 'react';
import background from '../assets/background.jpg';
const LeftSideLogin = () => {
  return (
    <div
      className="order-2 hidden md:block md:order-1 h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className=" h-screen px-7 md:flex justify-center items-center text-light text-4xl md:text-6xl drop-shadow-md">
        Awrow social network free and open to all. Where we value the freedom of
        expression.
      </div>
    </div>
  );
};

export default LeftSideLogin;
