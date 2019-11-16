import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { CustomInput } from './styles';

export default function DateInput({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={name}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        customInput={<CustomInput />}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
};
