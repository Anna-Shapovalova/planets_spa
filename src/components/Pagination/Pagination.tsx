/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';
import { getNumbers } from '../../utils/utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const onFirstPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const onLastPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination flex flex-col items-center">
      <span className="text-yellow text-sm text-gray-700 dark:text-gray-400">
        {'Showing '}
        <span className="text-yellow font-semibold text-gray-900 dark:text-white">
          {currentPage}
        </span>
        {' to '}
        <span className="text-yellow font-semibold text-gray-900 dark:text-white">
          {pages[pages.length - 1]}
        </span>
        {' of '}
        <span className="text-yellow font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
        {' Planets'}
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          type="button"
          className={classNames(
            'text-yellow px-4 py-2 text-sm font-medium bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700',
            {
              'hover:bg-gray-800 dark:hover:bg-gray-800': isFirstPage,
            },
          )}
          disabled={isFirstPage}
          onClick={onFirstPage}
        >
          Prev
        </button>
        <button
          type="button"
          className={classNames(
            'text-yellow px-4 py-2 text-sm font-medium bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700',
            {
              'hover:bg-gray-800 dark:hover:bg-gray-800': isLastPage,
            },
          )}
          disabled={isLastPage}
          onClick={onLastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};
