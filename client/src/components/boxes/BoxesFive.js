import React from 'react';
import { useSelector } from 'react-redux';

const BoxesFive = ({ photos, clickHandler }) => {
  const baseURL = useSelector((state) => state.baseURL);
  const returnIndex = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    clickHandler(index);
  };
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 my-3 gap-2  bg-light rounded-md overflow-hidden">
        <div className="grid grid-cols-2 gap-2 h-[150px] md:h-[200px]">
          <div
            onClick={(e) => returnIndex(e, 0)}
            className="h-full"
            style={{
              backgroundImage: `url('${baseURL}/${photos[0].images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          <div
            onClick={(e) => returnIndex(e, 1)}
            className="h-full"
            style={{
              backgroundImage: `url('${baseURL}/${photos[1].images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-2 h-[130px] md:h-[160px]">
          <div
            onClick={(e) => returnIndex(e, 2)}
            className="h-full"
            style={{
              backgroundImage: `url('${baseURL}/${photos[2].images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          <div
            onClick={(e) => returnIndex(e, 3)}
            className="h-full"
            style={{
              backgroundImage: `url('${baseURL}/${photos[3].images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div
            onClick={(e) => returnIndex(e, 4)}
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
                  ? 'bg-dark bg-opacity-30 h-full w-full text-4xl text-light drop-shadow-md flex justify-center items-center'
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
