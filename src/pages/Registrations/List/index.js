import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import Table from '~/components/Table';

import { ListHeader } from './styles';

export default function RegistrationList({ registrations }) {
  const headers = [
    { key: 'student', title: 'ALUNO', align: 'left' },
    { key: 'plan', title: 'PLANO', align: 'center' },
    { key: 'start_date', title: 'INÍCIO', align: 'center' },
    { key: 'end_date', title: 'TÉRMINO', align: 'center' },
    { key: 'active', title: 'ATIVA', align: 'center' },
    { key: 'actions', title: '', align: 'right' },
  ];

  return (
    <>
      <ListHeader>
        <h1>Gerenciando Matrículas</h1>
        <div>
          <Link
            to={{
              pathname: '/registrations',
              state: { edit: true, selectedRegistration: null },
            }}
            type="button"
          >
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </Link>
        </div>
      </ListHeader>

      <Table
        data={registrations}
        headers={headers}
        keyExtractor={item => item.id}
      />
    </>
  );
}

RegistrationList.propTypes = {
  registrations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      student: PropTypes.string,
      plan: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      active: PropTypes.element,
      actions: PropTypes.element,
    })
  ),
};

RegistrationList.defaultProps = {
  registrations: [],
};
