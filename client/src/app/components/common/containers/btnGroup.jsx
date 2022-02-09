import React from 'react';
import PropTypes from 'prop-types';
import { isFuncEmpty } from '../../../core/utils';

const BtnGroup = ({ label, data, onClick = () => {} }) => {
  return (
    <div className="btn-group mb-4" style={{ width: '100%' }}>
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {label}
      </button>
      <ul className="dropdown-menu">
        {data.map((item, idx) => (
          <li
            key={idx}
            onClick={() => !isFuncEmpty(onClick) && onClick(item.text)}
          >
            <span className="dropdown-item btn">
              {item.text} {item.icon}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

BtnGroup.propTypes = {
  label: PropTypes.string,
  data: PropTypes.array,
  onClick: PropTypes.func,
};

export default BtnGroup;
