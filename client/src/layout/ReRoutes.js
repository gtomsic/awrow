import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ReRoutes = () => {
  const user = useSelector((state) => state.loginUser.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id && user?.token) {
      navigate(`/${user.username}`);
    }
  }, [user, navigate]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default ReRoutes;
