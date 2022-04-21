import React from 'react';
import { useSelector } from 'react-redux';

const BoxOne = ({ photos }) => {
  const baseURL = useSelector((state) => state.baseURL);
  const singleImage = `${baseURL}/${photos[0].images}`;
  return (
    <div className="flex flex-col my-3 gap-1  bg-light rounded-md overflow-hidden">
      <div
        className="gap-1 h-[143px]"
        style={{
          backgroundImage: `url('${singleImage}')`,
          backgroundReapeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );
};

export default BoxOne;
