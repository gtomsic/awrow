import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetSingleUser } from '../actions/actionUsers';

const AppWallpaper = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser.login);
  const userInfo = useSelector((state) => state.userInfo.profile);
  const user =
    loginUser?.id && loginUser.username !== params.username
      ? userInfo?.id && userInfo
      : loginUser;
  const baseURL = useSelector((state) => state.baseURL);

  useEffect(() => {
    if (params?.username && params.username !== userInfo?.username) {
      dispatch(actionGetSingleUser(params.username));
    }
  }, [dispatch, userInfo, params, user]);

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
