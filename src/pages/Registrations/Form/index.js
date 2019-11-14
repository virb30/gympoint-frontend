import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import * as PlanActions from '~/store/modules/plan/actions';

import Content from '~/components/DefaultForm';
import { Container } from './styles';

const INITIAL_PLAN = {
  title: '',
  id: '',
  duration: '',
  price: '',
  totalPrice: 0.0,
};

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

export default function PlanForm() {
  const [plan, setPlan] = useState(INITIAL_PLAN);
  const { loading } = useSelector(state => state.student);
  const dispatch = useDispatch();
  const { id } = useParams();

  const totalPrice = useMemo(() => {
    if (plan.price && plan.duration) {
      return formatPrice(plan.price * plan.duration);
    }

    return 0.0;
  }, [plan]);

  useEffect(() => {
    async function loadStudent() {
      if (id !== 'new') {
        const response = await api.get(`/plans/${id}`);
        setPlan({ ...response.data });
      }
    }

    loadStudent();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  }

  function handleSubmit(data) {
    const { title, duration, price } = data;
    if (id === 'new') {
      dispatch(PlanActions.insertPlanRequest(title, duration, price));
    } else {
      dispatch(PlanActions.updatePlanRequest(id, title, duration, price));
    }
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>{id === 'new' ? 'Cadastro de plano' : 'Edição de plano'}</h1>
          <div>
            <Link to="/plans">
              <MdChevronLeft color="#fff" size={20} />
              VOLTAR
            </Link>
            <button type="submit" form="plan" disabled={!!loading}>
              <MdCheck color="#fff" size={20} /> SALVAR
            </button>
          </div>
        </header>

        <Form schema={schema} id="plan" onSubmit={handleSubmit}>
          <div>
            <label>
              TÍTULO DO PLANO
              <Input
                name="title"
                type="text"
                value={plan.title || ''}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              DURAÇÃO (em meses)
              <Input
                name="duration"
                type="number"
                value={plan.duration || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              PREÇO MENSAL
              <Input
                name="price"
                type="number"
                value={plan.price || ''}
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
    </Container>
  );
}
