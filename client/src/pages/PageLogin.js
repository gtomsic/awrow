import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../layout/Header';
import InputLabel from '../components/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { actionLoginUser } from '../actions/actionUsers';
import Footer from '../layout/Footer';
import LeftSideLogin from '../layout/LeftSideLogin';

const PageLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login, error } = useSelector((state) => state.loginUser);
  const submitLoginHandler = (e) => {
    e.preventDefault();
    if ((username, password)) {
      dispatch(actionLoginUser({ username, password }));
    }
  };
  useEffect(() => {
    if (login?.id) {
      navigate(`/${login.username}`);
    }
  }, [login, navigate]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <LeftSideLogin />
      <div className="order-1 h-screen pb-10 bg-dark md:order-2">
        <div className="mx-7">
          <Header />
        </div>
        <div className="flex items-center justify-center mt-[100px]">
          {loading ? (
            <Spinner title="User verification in progress..." />
          ) : (
            <form
              onSubmit={submitLoginHandler}
              className="flex flex-col min-w-[350px] px-4 py-5 rounded-xl "
            >
              <h1 className="text-3xl text-light text-center py-4">Login</h1>
              <InputLabel>
                <label htmlFor="username" className="text-light">
                  Username/Email
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  className="w-full py-2 px-3 rounded-md text-dark"
                />
              </InputLabel>
              <InputLabel>
                <label htmlFor="password" className="text-light">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  className="w-full py-2 px-3 rounded-md text-dark"
                />
              </InputLabel>
              <p className="my-2">
                No account with us?{' '}
                <Link to="/register" className="text-primary ml-2">
                  Register Here
                </Link>
              </p>
              <button className="bg-primary hover:bg-opacity-30 duration-500 text-light p-3">
                Login
              </button>
              <p className="text-danger my-3">{error ? error : null}</p>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLogin;
