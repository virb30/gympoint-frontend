import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { formatPrice } from '~/util/format';
import api from '~/services/api';

import List from './List';
import Form from './Form';

import { Container, Content } from './styles';

export default function Plans({ history }) {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const loadPlans = useCallback(async (page = 1) => {
    const response = await api.get('/plans', { params: { page } });
    setCurrentPage(page);
    setPlans(response.data.plans);
    setNumPages(response.data.num_pages);
  }, []);

  function handleChangePage(page) {
    loadPlans(page);
  }

  useEffect(() => {
    if (!showForm) {
      loadPlans();
    }
  }, [loadPlans, showForm]);

  useEffect(() => {
    const { state } = history.location;
    if (!state) {
      setShowForm(false);
      setSelected(null);
      return;
    }
    const { edit, selectedPlan } = state;
    setShowForm(edit);

    if (selectedPlan) {
      setSelected(plans.find(s => s.id === Number(selectedPlan)));
    }
  }, [history.location, plans]);

  const handleDelete = useCallback(
    async id => {
      if (
        global.confirm(
          'Deseja excluir este plano? Esta operação não poderá ser desfeita'
        )
      ) {
        try {
          await api.delete(`/plans/${id}`);
          setPlans(plans.filter(p => p.id !== id));
        } catch (err) {
          toast.error('Não foi possível excluir o plano. Tente novamente');
        }
      }
    },
    [plans]
  );

  const renderPlans = useCallback(() => {
    const data = plans.map(plan => ({
      ...plan,
      durationFormatted: `${plan.duration} ${
        plan.duration === 1 ? 'mês' : 'meses'
      }`,
      priceFormatted: formatPrice(plan.price),
      actions: (
        <div>
          <Link
            to={{
              pathname: '/plans',
              state: { edit: true, selectedPlan: plan.id },
            }}
          >
            editar
          </Link>
          <button
            onClick={() => handleDelete(plan.id)}
            type="button"
            className="delete"
          >
            apagar
          </button>
        </div>
      ),
    }));

    return data;
  }, [handleDelete, plans]);

  return (
    <Container>
      <Content maxWidth={900}>
        {!showForm ? (
          <List
            plans={renderPlans()}
            onChangePage={handleChangePage}
            numPages={numPages}
            currentPage={currentPage}
          />
        ) : (
          <Form initialData={selected} />
        )}
      </Content>
    </Container>
  );
}

Plans.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        edit: PropTypes.bool,
        selectedPlan: PropTypes.number,
      }),
    }),
  }),
};

Plans.defaultProps = {
  history: {
    location: {
      state: {
        edit: false,
        selectedStudent: null,
      },
    },
  },
};
