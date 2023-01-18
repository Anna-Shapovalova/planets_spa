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
    <ul className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <li>
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          disabled={isFirstPage}
          onClick={onFirstPage}
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </button>
      </li>

      <li className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {pages.map((page) => {
          const isCurrent = currentPage === page;

          return (
            <div key={page}>
              <button
                type="button"
                aria-current="page"
                className={classNames(
                  'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                  {
                    'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': isCurrent,
                  },
                )}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </div>
          );
        })}
      </li>

      <li className="pagination__arrow_next">
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          disabled={isLastPage}
          onClick={onLastPage}
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>
      </li>
    </ul>
  );
};
