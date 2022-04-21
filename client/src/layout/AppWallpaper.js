import React from 'react';
import { useSelector } from 'react-redux';

const AppWallpaper = () => {
  const user = useSelector((state) => state.loginUser.login);
  const baseURL = useSelector((state) => state.baseURL);

  const profileWallpaper =
    user && user.wallpaper
      ? `url('${baseURL}/${user.wallpaper}')`
      : `url('${baseURL}/images/1defaults/wallpaper.jpg')`;
  return (
    <div
      className="wallapper h-[200px] md:h-[300px]"
      style={{
        backgroundImage: profileWallpaper,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    ></div>
  );
};

export default AppWallpaper;
