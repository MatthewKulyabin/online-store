import React from 'react';
import PropTypes from 'prop-types';

const MoneyField = ({
  label,
  name,
  value,
  onChange,
  error,
  min,
  step,
  span,
  ...rest
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: +target.value });
  };

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : ' is-valid');
  };

  return (
    <div className="input-group mb-3">
      <label className="sr-only" htmlFor="exampleInputAmount">
        {label}
      </label>
      <div className="input-group">
        {span && <span className="input-group-text">{span}</span>}
        <input
          type="number"
          min={min}
          step={step}
          value={value || ''}
          name={name}
          className={getInputClasses()}
          onChange={handleChange}
          {...rest}
        />
        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  );
};

MoneyField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string,
  min: PropTypes.string,
  step: PropTypes.string,
  span: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default React.memo(MoneyField);
