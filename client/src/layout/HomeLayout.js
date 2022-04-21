import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import TopTalk from '../components/TopTalk';
import AppWallpaper from './AppWallpaper';
import NavBar from './NavBar';
import ProfileSideBar from './ProfileSideBar';
const HomeLayout = ({ children }) => {
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state.loginUser.login);
  useEffect(() => {
    if (params.username === 'login' || params.username === 'register') {
      return;
    } else if (!params.username && user?.id) {
      navigate(`/${user.username}`);
    } else if (!user?.id) {
      navigate('/login');
    }
  }, [user, navigate, params]);

  return (
    <div>
      <AppWallpaper />
      <div className="grid grid-cols-9 gap-2 max-w-[976px] mx-auto">
        <div className="col-span-2 hidden md:block md:col-span-3 lg:col-span-2">
          <TopTalk />
        </div>
        <div className="col-span-9 md:col-span-6 lg:col-span-5">
          <div className="mb-[150px]">
            <NavBar />
            <Outlet />
          </div>
        </div>
        <div className="hidden md:hidden lg:block lg:col-span-2">
          <ProfileSideBar />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
