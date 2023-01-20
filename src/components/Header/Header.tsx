import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.png';

/* eslint-disable max-len */
export const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-black navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between">
        <div className="px-6 flex flex-wrap items-center justify-between">
          <ul className="flex items-center justify-center navbar-nav mr-auto lg:flex lg:flex-row">
            <li className="text-center nav-item">
              <Link
                className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                to="/"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                <img
                  src={logo}
                  alt="logo"
                  className="page__logo"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="text-yellow nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                to="/"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                The Force, it`s calling to you. Just let it in.
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
