import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

export default function SelectInput({ name, options, multiple, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); //eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.value === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.value));
  }

  return (
    <>
      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
  multiple: PropTypes.bool,
};

SelectInput.defaultProps = {
  multiple: false,
};
