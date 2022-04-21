import React from 'react';
import { Link } from 'react-router-dom';

import Container from './Container';
import logo from '../assets/awrow.png';

const Header = ({ color }) => {
  return (
    <header>
      <Container>
        <div className="flex justify-between items-end min-h-[70px]">
          <div
            className="logo w-[45px] h-[45px] border-2 border-light rounded-full"
            style={{
              backgroundImage: `url('${logo}')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <nav>
            <ul className="flex">
              <Link to="/login">
                <li className="mx-3 px-3 py-1 text-gray text-lg rounded-md border-gray border hover:border-primary hover:text-primary duration-500">
                  Login
                </li>
              </Link>
              <Link to="/register">
                <li className="mx-3 px-3 py-1 text-gray text-lg rounded-md border-gray border hover:border-primary hover:text-primary duration-500">
                  Register
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
