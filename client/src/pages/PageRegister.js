import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../layout/Header';
import InputLabel from '../components/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionCheckEmail,
  actionCheckUsername,
  actionRegisterUser,
} from '../actions/actionUsers';
import Spinner from '../components/Spinner';
import Footer from '../layout/Footer';
import LeftSideLogin from '../layout/LeftSideLogin';

const PageRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmed_Password] = useState('');
  // CHECKING FOR ERRORS
  const [errName, setErrName] = useState('');
  const [errUsename, setErrUsername] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const { username: checkUsername } = useSelector(
    (state) => state.checkUsername
  );
  const { email: checkEmail } = useSelector((state) => state.checkEmail);
  const [debounceUsername, setDebounceUsername] = useState(username);
  const [debounceEmail, setDebounceEmail] = useState(email);

  const { loading, register, error } = useSelector(
    (state) => state.registerUser
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Using userEffect for checking username
  useEffect(() => {
    if (username.length >= 5) {
      const timerId = setTimeout(() => {
        setDebounceUsername(username);
      }, 500);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [username]);
  useEffect(() => {
    if (!debounceUsername) {
      return;
    }
    dispatch(actionCheckUsername(debounceUsername));
  }, [dispatch, debounceUsername]);

  // Using useEffect to check for email
  useEffect(() => {
    if (
      (email.includes('@') && email.includes('.com')) ||
      email.includes('.net') ||
      email.includes('.edu') ||
      email.includes('.org') ||
      email.includes('.in')
    ) {
      const timerId = setTimeout(() => {
        setDebounceEmail(email);
      }, 500);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [email]);
  useEffect(() => {
    if (!debounceEmail) {
      return;
    }
    dispatch(actionCheckEmail(debounceEmail));
  }, [dispatch, debounceEmail]);

  // useEffect for checking registration success
  useEffect(() => {
    if (register?.id) {
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmed_Password('');
      navigate('/success');
    }
  }, [register, navigate]);

  // Submit handler for registration
  // Public
  const submitRegisterHandler = (e) => {
    e.preventDefault();

    !name ? setErrName('Full name is required!') : setErrName('');
    !username
      ? setErrUsername('Username name is required!')
      : setErrUsername('');
    username.trim(' ').split('').length < 5
      ? setErrUsername('Username name is required!')
      : setErrUsername('');
    !email ? setErrEmail('Email name is required!') : setErrEmail('');
    password !== confirm_password
      ? setErrPassword(`Password don't match!`)
      : setErrPassword('');
    password.split('').length < 6
      ? setErrPassword(`Password at least 6 characters!`)
      : setErrPassword('');
    if (!errName && !errUsename && !errPassword && !errEmail) {
      const data = { name, email, username, password, confirm_password };
      dispatch(actionRegisterUser(data));
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <LeftSideLogin />
      <div className="order-1 h-screen pb-10 bg-dark md:order-2">
        <div className="mx-7">
          <Header />
        </div>
        <div className="flex items-center justify-center mt-[100px]">
          {loading ? (
            <Spinner title="Register new account!" />
          ) : (
            <form
              onSubmit={submitRegisterHandler}
              className="flex flex-col min-w-[350px] px-4 py-5 rounded-xl"
            >
              <h1 className="text-3xl text-light text-center py-4">Register</h1>
              <InputLabel>
                <label htmlFor="name" className="text-light">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  className="w-full py-2 px-3 rounded-md text-dark"
                />
                <p className="text-danger">{errName ? errName : ''}</p>
              </InputLabel>
              <InputLabel>
                <label
                  htmlFor="username"
                  className="text-light flex justify-between"
                >
                  <span> Username</span>{' '}
                  <span
                    className={`${
                      checkUsername && checkUsername.username === 'Available'
                        ? 'text-primary'
                        : 'text-danger'
                    }`}
                  >
                    {username && checkUsername && checkUsername.username}
                  </span>
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim(' '))}
                  id="username"
                  name="username"
                  type="text"
                  className="w-full py-2 px-3 rounded-md text-dark"
                />
                <p className="text-danger">{errUsename ? errUsename : ''}</p>
              </InputLabel>
              <InputLabel>
                <label
                  htmlFor="email"
                  className="text-light flex justify-between"
                >
                  <span> Email</span>{' '}
                  <span
                    className={`${
                      checkEmail && checkEmail.email === 'Available'
                        ? 'text-primary'
                        : 'text-danger'
                    }`}
                  >
                    {email && checkEmail && checkEmail.email}
                  </span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim(' '))}
                  id="email"
                  name="email"
                  type="text"
                  className="w-full py-2 px-3 rounded-md text-dark"
                />
                <p className="text-danger">{errEmail ? errEmail : ''}</p>
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
              <InputLabel>
                <label htmlFor="confirm_password" className="text-light">
                  Confirm Password
                </label>
                <input
                  value={confirm_password}
                  onChange={(e) => setConfirmed_Password(e.target.value)}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  className="w-full py-2 px-3 rounded-md text-dark"
                />
                <p className="text-danger">{errPassword ? errPassword : ''}</p>
              </InputLabel>
              <p className="my-2">
                Have account with us?{' '}
                <Link to="/login" className="text-primary ml-2">
                  Login Here
                </Link>
              </p>
              <button className="bg-primary hover:bg-opacity-30 duration-500 text-light p-3">
                Submit To Register
              </button>
              {error ? <p className="text-danger my-3 ">{error}</p> : ''}
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageRegister;
