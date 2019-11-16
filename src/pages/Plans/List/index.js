import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import Table from '~/components/Table';

import { ListHeader } from './styles';

export default function PlanList({ plans }) {
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
};

PlanList.defaultProps = {
  plans: [],
};
