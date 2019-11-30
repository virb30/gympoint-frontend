import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import Table from '~/components/Table';

import { ListHeader } from './styles';
import Pagination from '~/components/Pagination';

export default function PlanList({
  plans,
  onChangePage,
  currentPage,
  numPages,
}) {
  const headers = [
    { key: 'title', title: 'TÍTULO', align: 'left' },
    { key: 'durationFormatted', title: 'DURAÇÃO', align: 'center' },
    { key: 'priceFormatted', title: 'VALOR p/ MÊS', align: 'center' },
    { key: 'actions', title: '', align: 'right' },
  ];

  return (
    <>
      <ListHeader>
        <h1>Gerenciando Planos</h1>
        <div>
          <Link
            to={{
              pathname: '/plans',
              state: { edit: true, selectedPlan: null },
            }}
          >
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </Link>
        </div>
      </ListHeader>

      <Table data={plans} headers={headers} keyExtractor={item => item.id} />

      <Pagination
        onChangePage={onChangePage}
        currentPage={currentPage}
        numPages={numPages}
      />
    </>
  );
}

PlanList.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      durationFormatted: PropTypes.string,
      priceFormatted: PropTypes.string,
      actions: PropTypes.element,
    })
  ),
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
};

PlanList.defaultProps = {
  plans: [],
  onChangePage: () => {},
  currentPage: 1,
  numPages: 1,
};
