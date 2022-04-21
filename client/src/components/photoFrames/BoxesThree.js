import React from 'react';
import { useSelector } from 'react-redux';

const BoxesFour = ({ photos }) => {
  const baseURL = useSelector((state) => state.baseURL);
  return (
    <div className="grid grid-cols-1 my-3 gap-1 bg-light rounded-md overflow-hidden">
      <div className="grid grid-cols-2 gap-1 h-[70px]">
        <div
          className="h-full"
          style={{
            backgroundImage: `url('${baseURL}/${photos[0].images}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        <div
          className="h-full"
          style={{
            backgroundImage: `url('${baseURL}/${photos[1].images}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </div>
      <div className="grid grid-cols-1 gap-1 h-[70px]">
        <div
          className="w-full"
          style={{
            backgroundImage: `url('${baseURL}/${photos[2].images}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </div>
    </div>
  );
};

export default BoxesFour;
