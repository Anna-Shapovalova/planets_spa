/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import error from '../../assets/img/404.png';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <section className="h-[75vh] flex items-center justify-center mb-32 my-24 text-gray-800 text-center">
        <div className="flex flex-wrap mb-6">
          <div className="grow-0 shrink-0 basis-auto w-full md:w-8/12 px-3 mb-6 md:mb-0 m-auto">
            <div
              className="relative overflow-hidden w-full bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <img
                src={error}
                alt="404 error"
                className="error-img"
              />
              <p className="text-yellow uppercase mt-20">
                This page is not fully armed and operational
              </p>
              <button
                type="button"
                className="uppercase text-yellow underline"
                onClick={() => navigate('/')}
              >
                try something else
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
