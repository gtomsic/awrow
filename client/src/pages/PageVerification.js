import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Header from '../layout/Header';
import { actionRequestVerification } from '../actions/actionUsers';
import Spinner from '../components/Spinner';
import Footer from '../layout/Footer';
import LeftSideLogin from '../layout/LeftSideLogin';

const PageVerification = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.activated);
  useEffect(() => {
    dispatch(
      actionRequestVerification(params.id, params.is_activated, params.email)
    );
  }, [params, dispatch]);
  useEffect(() => {
    if (user?.id && user.is_activated) {
      setTimeout(() => {
        navigate(`/login`);
      }, 3000);
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
                  Hi {user && user.name}! your account is verified! Please
                  continue to login.
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

export default PageVerification;
