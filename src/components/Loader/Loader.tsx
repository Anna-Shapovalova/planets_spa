/* eslint-disable max-len */
export const Loader: React.FC = () => (
  <div className="flex items-center justify-center">
    <div
      className="
        spinner-border
        animate-spin
        inline-block
        w-8
        h-8
        border-4
        rounded-full"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);
