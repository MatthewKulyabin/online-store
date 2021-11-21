import React from 'react';

const Sort = () => {
  return (
    <div className="btn-group mb-4" style={{ width: '100%' }}>
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sort
      </button>
      <ul className="dropdown-menu">
        <li>
          <span className="dropdown-item btn">Action</span>
        </li>
        <li>
          <span className="dropdown-item btn">Another action</span>
        </li>
        <li>
          <span className="dropdown-item btn">Something else here</span>
        </li>
        <li>
          <hr className="dropdown-divider " />
        </li>
        <li>
          <span className="dropdown-item btn">Separated link</span>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
