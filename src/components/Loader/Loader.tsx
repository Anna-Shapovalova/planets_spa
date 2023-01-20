/* eslint-disable max-len */
export const Loader: React.FC = () => (
  <div className="text-yellow fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div className="text-yellow loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
    <h2 className="text-yellow text-center text-xl font-semibold">Loading...</h2>
    <p className="text-yellow w-1/3 text-center">This may take a few seconds, please don&rsquo;t close this page.</p>
  </div>
);
