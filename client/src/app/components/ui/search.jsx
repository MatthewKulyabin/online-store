import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '../common/form';

const Search = ({ onSearch, placeholder }) => {
  const [search, setSearch] = useState({ text: '' });

  useEffect(() => {
    onSearch(search.text);
  }, [search]);

  const handleChange = (target) => {
    setSearch((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <div className="mb-3">
      <TextField
        label={(!placeholder && 'Search') || ''}
        name="text"
        onChange={handleChange}
        value={search.text}
        className="form-control"
        {...{ placeholder }}
      />
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Search;