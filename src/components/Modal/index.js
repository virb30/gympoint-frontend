import React from 'react';
import PropTypes from 'prop-types';
import { Background, Container } from './styles';

export default function Modal({ showModal, children }) {
  return (
    <>
      {showModal && (
        <Background>
          <Container>{children}</Container>
        </Background>
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  showModal: PropTypes.bool,
};

Modal.defaultProps = {
  showModal: false,
};
