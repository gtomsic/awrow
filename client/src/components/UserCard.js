import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, clickHandler }) => {
  const baseURL = useSelector((state) => state.baseURL);
  const navigate = useNavigate();
  const onClickHandler = (username) => {
    navigate(`/${username}`);
    clickHandler();
  };
  return (
    <div
      onClick={() => onClickHandler(user.username)}
      className="p-2 mx-2 my-1 rounded-md bg-light drop-shadow-sm cursor-pointer"
    >
      <div className="flex ">
        <img
          src={
            user?.avatar
              ? `${baseURL}/${user.avatar}`
              : `${baseURL}/images/1defaults/profile.jpg`
          }
          alt={user.name}
          className="w-[50px] h-[50px] rounded-full border-2 border-white"
        />
        <div className="ml-2">
          <div className="text-primary font-bold drop-shadow-sm">
            {user.name}
          </div>
          <div className="text-primary text-opacity-80">@{user.username}</div>
        </div>
      </div>
      <div className="ml-[60px]">
        {user?.city && `${user.city}, ${user.state}, ${user.country}`}
      </div>
    </div>
  );
};

export default UserCard;
