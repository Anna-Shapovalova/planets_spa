import { Link } from 'react-router-dom';

/* eslint-disable max-len */
export const Footer: React.FC = () => (
  <footer className="sticky top-[100vh]">
    <div className="footer bg-black navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-center">
      <div className="px-6 flex flex-wrap items-center justify-center">
        <Link
          to="/"
          className="text-yellow nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          You were the Chosen One! It was said that you would destroy the Sith, not join them. Bring balance to the force, not leave it in darkness.
        </Link>
      </div>
    </div>
  </footer>
);
