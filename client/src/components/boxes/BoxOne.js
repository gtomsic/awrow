import React from 'react';
import { useSelector } from 'react-redux';

const BoxOne = ({ photos, clickHandler }) => {
  const baseURL = useSelector((state) => state.baseURL);
  const singleImage = `${baseURL}/${photos[0].images}`;
  const returnIndex = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    clickHandler(index);
  };
  return (
    <div className="flex flex-col my-3 gap-2  bg-light rounded-md overflow-hidden">
      <img
        onClick={(e) => returnIndex(e, 0)}
        src={singleImage}
        alt="new images"
      />
    </div>
  );
};

export default BoxOne;
