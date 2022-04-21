import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeLayout from '../layout/HomeLayout';
import {
  actionUpdateProfileAvatar,
  actionUpdateProfileWallpaper,
} from '../actions/actionUsers';
import ProfileInfo from '../components/ProfileInfo';

const PageProfileUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUser.login);
  const baseURL = useSelector((state) => state.baseURL);
  useEffect(() => {});
  const avatarOnChangeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setAvatar({ avatar: URL.createObjectURL(e.target.files[0]) });
    const data = new FormData();
    data.append('image', e.target.files[0]);
    data.append('title', user.name);
    dispatch(actionUpdateProfileAvatar(data, user.token));
  };
  const wallpaperOnChangeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData();
    data.append('image', e.target.files[0]);
    dispatch(actionUpdateProfileWallpaper(data, user.token));
  };
  const avatarUrl =
    user && user.avatar
      ? `url('${baseURL}/${user.avatar}')`
      : `url('${baseURL}/images/1defaults/profile.jpg')`;
  const wallpaperUrl =
    user && user.wallpaper
      ? `url('${baseURL}/${user.wallpaper}')`
      : `url('${baseURL}/images/1defaults/wallpaper.jpg')`;
  return (
    <HomeLayout>
      <div className="relative">
        <div
          className="h-[250px] mt-4"
          style={{
            backgroundImage: wallpaperUrl,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute right-2 top-2 w-[40px] group h-[40px]  flex justify-center items-center ">
            <div className="absolute bg-opacity-50 bg-dark justify-center w-full h-full items-center flex rounded-full group-hover:bg-dark group-hover:bg-opacity-80 group-hover:duration-300">
              <i className=" fa-solid text-xl text-gray-light fa-camera"></i>
            </div>
            <input
              onChange={wallpaperOnChangeHandler}
              type="file"
              name="image"
              accept=".png, .jpg, .JPEG"
              className="h-full absolute w-full rounded-full overflow-hidden cursor-pointer"
            />
          </div>

          <div className="flex flex-col h-full items-center">
            <div
              className=" w-[160px] h-[160px] my-4 rounded-full"
              style={{
                backgroundImage: avatarUrl,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="relative group h-full w-full flex justify-center items-center border-4 border-light rounded-full">
                <div className="absolute hidden justify-center items-center group-hover:flex  group-hover:bg-dark group-hover:bg-opacity-80 rounded-full w-full h-full group-hover:duration-500">
                  <i className=" fa-solid text-5xl text-gray fa-camera"></i>
                </div>
                <input
                  onChange={avatarOnChangeHandler}
                  type="file"
                  name="image"
                  accept=".png, .jpg, .JPEG"
                  className="h-full w-full rounded-full overflow-hidden cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-1 py-3 mt-3 font-bold text-xl text-white bg-primary w-full text-center">
              {user && user.name}
            </div>
          </div>
        </div>
        <ProfileInfo />
      </div>
    </HomeLayout>
  );
};

export default PageProfileUser;
