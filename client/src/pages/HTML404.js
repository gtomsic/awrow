import React from 'react';
import { Link } from 'react-router-dom';

const HTML404 = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="min-w-[300px] p-3 drop-shadow-sm bg-white rounded-md text-center">
        <h1 className="text-5xl p-2">Youre not suppost to be here!</h1>
        <h3 className="text-3xl p-2 mt-2">Please go back to home page!</h3>
        <div className="min-h-[300px] text-center flex justify-center items-center">
          <i className="fa-solid fa-face-frown text-7xl text-secondary"></i>
        </div>

        <div className="mb-11">
          <Link
            to="/login"
            className="text-xl font-bold p-3 rounded-md bg-primary text-white hover:bg-opacity-80 duration-300"
          >
            <i className="fa-solid fa-chevron-left"></i> <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HTML404;
