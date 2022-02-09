import React from 'react';
import PropTypes from 'prop-types';

const SelectImageField = ({ label, name, onChange, error, ...rest }) => {
  const handleChange = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ name: target.name, value: reader.result });
    };
    reader.readAsDataURL(file);
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : ' is-valid');
  };

  return (
    <div className="mb-3">
      <label htmlFor="formFile" className="form-label">
        {label}
      </label>
      <input
        className={getInputClasses()}
        type="file"
        name={name}
        onChange={handleChange}
        {...rest.onKeyDown}
      />
      {error && <div className="invalid-feedback ">{error}</div>}
    </div>
  );
};

SelectImageField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default React.memo(SelectImageField);
