import React from 'react';
import { useSelector } from 'react-redux';

const BoxesFive = ({ photos }) => {
  const baseURL = useSelector((state) => state.baseURL);
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 my-3 gap-1  bg-light rounded-md overflow-hidden">
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
        <div className="grid grid-cols-3 gap-1 h-[70px]">
          <div
            className="h-full"
            style={{
              backgroundImage: `url('${baseURL}/${photos[2].images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          <div
            className="h-full"
            style={{
              backgroundImage: `url('${baseURL}/${photos[3].images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          <div
            className="h-full"
            style={{
              backgroundImage: `url('${baseURL}/${photos[4].images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className={
                photos.length > 5
                  ? 'bg-dark bg-opacity-50 h-full w-full text-xl flex justify-center items-center text-light'
                  : ''
              }
            >
              {photos.length > 5 ? `+ ${Number(photos.length) - 5}` : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BoxesFive;
