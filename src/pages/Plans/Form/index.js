import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';

import Content from '~/components/DefaultForm';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .typeError('A duração deve ser um número')
    .integer('A duração deve ser um número inteiro')
    .positive('A duração deve ser um número positivo')
    .required('A duração é obrigatória'),
  price: Yup.number()
    .typeError('O Preço deve ser um número')
    .required('O preço é obrigatório'),
});

export default function PlanForm({ initialData }) {
  const [planValues, setPlanValues] = useState({ ...initialData });
  const [loading, setLoading] = useState(false);

  const totalPrice = useMemo(() => {
    if (planValues.price && planValues.duration) {
      return formatPrice(planValues.price * planValues.duration);
    }

    return 0.0;
  }, [planValues]);

  const handleChange = useCallback(
    e => {
      console.tron.log('called');
      const { name, value } = e.target;
      setPlanValues({ ...planValues, [name]: value });
    },
    [planValues]
  );

  async function handleSubmit({ title, duration, price }) {
    setLoading(true);
    try {
      if (initialData) {
        await api.put(`/plans/${initialData.id}`, {
          title,
          duration,
          price,
        });
      } else {
        await api.post('/plans', {
          title,
          duration,
          price,
        });
      }

      history.push('/plans');
    } catch (err) {
      toast.error('Não foi possível salvar o plano. Tente novamente');
    }
    setLoading(false);
  }

  return (
    <Content>
      <header>
        <h1>{!initialData ? 'Cadastro de plano' : 'Edição de plano'}</h1>
        <div>
          <Link to="/plans">
            <MdChevronLeft color="#fff" size={20} />
            VOLTAR
          </Link>
          <button type="submit" form="plan" disabled={loading}>
            <MdCheck color="#fff" size={20} /> SALVAR
          </button>
        </div>
      </header>

      <Form
        schema={schema}
        id="plan"
        onSubmit={handleSubmit}
        initialData={initialData}
      >
        <div>
          <label>
            TÍTULO DO PLANO
            <Input name="title" type="text" />
          </label>
        </div>
        <div>
          <label>
            DURAÇÃO (em meses)
            <Input name="duration" type="number" onChange={handleChange} />
          </label>
          <label>
            PREÇO MENSAL
            <Input
              name="price"
              type="number"
              onChange={handleChange}
              step={0.01}
            />
          </label>
          <label>
            PREÇO TOTAL
            <Input
              name="totalPrice"
              type="text"
              value={totalPrice || ''}
              disabled
            />
          </label>
        </div>
      </Form>
    </Content>
  );
}

PlanForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.number,
    duration: PropTypes.number,
  }),
};

PlanForm.defaultProps = {
  initialData: null,
};
