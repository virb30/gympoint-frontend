import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  deleteRegistrationRequest,
  getRegistrationsRequest,
} from '~/store/modules/registration/actions';

import Table from '~/components/Table';

import { Container, Content } from './styles';

export default function Registrations() {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    id => {
      if (
        global.confirm(
          'Deseja excluir esta Matrícula? Esta operação não poderá ser desfeita'
        )
      ) {
        dispatch(deleteRegistrationRequest(id));
      }
    },
    [dispatch]
  );

  const registrations = useSelector(state =>
    state.registration.registrations.map(r => ({
      ...r,
      student: r.student.name,
      plan: r.plan.title,
      start_date: format(parseISO(r.start_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
      end_date: format(parseISO(r.end_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
      active: <MdCheckCircle color={r.active ? '#42cb49' : '#ddd'} size={20} />,
      actions: (
        <div>
          <Link to={`/registrations/${r.id}`}>editar</Link>
          <button onClick={() => handleDelete(r.id)} type="button">
            apagar
          </button>
        </div>
      ),
    }))
  );

  useEffect(() => {
    dispatch(getRegistrationsRequest());
  }, [dispatch]);

  const headers = [
    { key: 'student', title: 'ALUNO', align: 'left' },
    { key: 'plan', title: 'PLANO', align: 'center' },
    { key: 'start_date', title: 'INÍCIO', align: 'center' },
    { key: 'end_date', title: 'TÉRMINO', align: 'center' },
    { key: 'active', title: 'ATIVA', align: 'center' },
    { key: 'actions', title: '', align: 'right' },
  ];

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando Matrículas</h1>
          <div>
            <Link to="/registrations/new" type="button">
              <MdAdd color="#fff" size={20} />
              CADASTRAR
            </Link>
          </div>
        </header>

        <Table
          data={registrations}
          headers={headers}
          keyExtractor={item => item.id}
        />
      </Content>
    </Container>
  );
}
