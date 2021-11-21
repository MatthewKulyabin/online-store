import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ categories }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="list-group" id="list-tab" role="tablist">
        {categories.map((category) => (
          <a
            key={category._id}
            className="list-group-item list-group-item-action "
            id="list-home-list"
            data-bs-toggle="list"
            href="#list-home"
            role="tab"
            aria-controls="list-home"
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
};

export default Categories;
