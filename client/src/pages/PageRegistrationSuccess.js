import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../layout/Header';
import Spinner from '../components/Spinner';
import Footer from '../layout/Footer';
import LeftSideLogin from '../layout/LeftSideLogin';

const PageRegistrationSuccess = () => {
  const navigate = useNavigate();
  const {
    loading,
    register: user,
    error,
  } = useSelector((state) => state.registerUser);
  useEffect(() => {
    if (user?.id) {
      setTimeout(() => {
        navigate(`/login`);
      }, 10000);
    }
  }, [user, navigate]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <LeftSideLogin />
      <div className="order-1 h-screen pb-10 bg-dark md:order-2">
        <div className="mx-7">
          <Header />
        </div>
        <div className="flex items-center justify-center mt-[100px]">
          {loading ? (
            <Spinner title="Activation proccess.." />
          ) : (
            <div className="flex flex-col max-w-[400px] px-4 py-5 rounded-xl">
              <h1 className="text-3xl text-light text-center py-4">
                Account Verification
              </h1>

              <div className="min-h-[30vh] flex flex-col justify-center text-primary items-center text-2xl px-3">
                <span>
                  Hi {user?.name}! Please wait for the email verification and
                  verify your email account to login.
                </span>
                <span className="my-10 text-secondary text-7xl">
                  <i className="fa-solid fa-face-grin-wink"></i>
                </span>
              </div>

              <Link
                to="/"
                className="bg-primary hover:bg-opacity-30 duration-500 text-center w-full text-light p-3"
              >
                Login Here
              </Link>

              {error && <p className="my-3 text-danger">{error}</p>}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageRegistrationSuccess;
