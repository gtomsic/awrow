import React from 'react';
import { useDispatch } from 'react-redux';
import { actionLogoutUser } from '../actions/actionUsers';
const Settings = () => {
  const dispatch = useDispatch();
  const userLogoutHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(actionLogoutUser());
  };
  return (
    <div className="mt-4">
      <div className="p-2 font-bold text-xl text-primary">
        <i className="fa-solid fa-gear"></i> General Settings
      </div>
      <div className="my-3 px-2 min-h-[100px]">
        <button
          onClick={userLogoutHandler}
          className="py-2 px-7 rounded-md text-white bg-danger bg-opacity-50 hover:bg-opacity-80 duration-300 drop-shadow-sm"
        >
          Logout
        </button>
      </div>
      <div className="p-2 font-bold text-xl text-primary">Blocks</div>
      <div className="my-3 px-2 min-h-[200px]">
        <div>Undercontructions....</div>
      </div>
    </div>
  );
};

export default Settings;
