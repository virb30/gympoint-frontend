import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import colors from '~/styles/colors';

import { Container, Page } from './styles';

export default function Pagination({ currentPage, onChangePage, numPages }) {
  const pages = [];
  for (let i = 1; i <= numPages; i += 1) {
    pages.push(i);
  }

  function handleChangePage(page) {
    if (page !== currentPage) {
      onChangePage(page);
    }
  }

  return (
    <Container>
      <Page>
        <button
          type="button"
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdChevronLeft size={16} color={colors.primary} />
        </button>
      </Page>
      {pages.map(page => (
        <Page active={page === currentPage} key={page}>
          <button type="button" onClick={() => handleChangePage(page)}>
            {page}
          </button>
        </Page>
      ))}

      <Page>
        <button
          type="button"
          onClick={() => {
            handleChangePage(currentPage + 1);
          }}
          disabled={currentPage === numPages}
        >
          <MdChevronRight size={16} color={colors.primary} />
        </button>
      </Page>
    </Container>
  );
}

Pagination.propTypes = {
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
};

Pagination.defaultProps = {
  onChangePage: () => {},
  currentPage: 1,
  numPages: 1,
};
