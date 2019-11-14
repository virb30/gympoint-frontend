import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { formatPrice } from '~/util/format';

import {
  deleteRegistrationRequest,
  getRegistrationsRequest,
} from '~/store/modules/registration/actions';

import Table from '~/components/Table';

import { Container, Content } from './styles';

export default function Registrations() {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    async id => {
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

  const plans = useSelector(state =>
    state.plan.plans.map(plan => ({
      ...plan,
      durationFormatted: `${plan.duration} ${
        plan.duration === 1 ? 'mês' : 'meses'
      }`,
      priceFormatted: formatPrice(plan.price),
      actions: (
        <div>
          <Link to={`/registrations/${plan.id}`}>editar</Link>
          <button onClick={() => handleDelete(plan.id)} type="button">
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
    { key: 'title', title: 'TÍTULO', align: 'left' },
    { key: 'durationFormatted', title: 'DURAÇÃO', align: 'center' },
    { key: 'priceFormatted', title: 'VALOR p/ MÊS', align: 'center' },
    { key: 'actions', title: '', align: 'right' },
  ];

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando Matrículas</h1>
          <div>
            <Link to="/plans/new" type="button">
              <MdAdd color="#fff" size={20} />
              CADASTRAR
            </Link>
          </div>
        </header>

        <Table data={plans} headers={headers} keyExtractor={item => item.id} />
      </Content>
    </Container>
  );
}
