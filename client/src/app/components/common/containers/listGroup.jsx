import React from 'react';
import PropTypes from 'prop-types';
import { isFuncEmpty } from '../../../core/utils';

const ListGroup = ({ data, onClick = () => {} }) => {
  return (
    <div className="list-group" id="list-tab" role="tablist" data={data}>
      {data.map((item, idx) => (
        <a
          key={idx}
          className="list-group-item list-group-item-action "
          id="list-home-list"
          data-bs-toggle="list"
          href="#list-home"
          role="tab"
          aria-controls="list-home"
          onClick={() => !isFuncEmpty(onClick) && onClick(item)}
        >
          {item.text}
        </a>
      ))}
    </div>
  );
};

ListGroup.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
};

export default ListGroup;
