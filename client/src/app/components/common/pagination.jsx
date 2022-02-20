import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ pagesCount, currentPage, onClick }) => {
  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {_.range(0, pagesCount).map((page, idx) => (
          <li
            key={idx}
            className={`page-item btn p-0 ${
              page === currentPage ? 'active' : ''
            }`}
            aria-current="page"
            onClick={() => onClick(page)}
          >
            <span className="page-link">{page + 1}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pagesCount: PropTypes.number,
  currentPage: PropTypes.number,
  onClick: PropTypes.func,
};

export default Pagination;
