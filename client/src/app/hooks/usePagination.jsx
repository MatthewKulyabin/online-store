import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const PaginationContext = React.createContext();

export const usePagination = () => {
  return useContext(PaginationContext);
};

export const PaginationProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [pagesCount, setPagesCount] = useState();
  const [paginatedData, setPaginatedData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    setPage(0);
  }, [initialData]);

  const paginate = (data, limit = 5) => {
    data !== initialData && setInitialData(data);
    setPagesCount(data.length / limit);
    setPaginatedData(
      _(data)
        .slice(page * limit)
        .take(limit)
        .value()
    );
  };

  const updatePage = (page) => {
    setPage(page);
  };

  return (
    <PaginationContext.Provider
      value={{ paginate, pagesCount, paginatedData, updatePage, page }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

PaginationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
