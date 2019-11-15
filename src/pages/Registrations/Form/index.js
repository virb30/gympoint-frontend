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
import SelectInput from '~/components/SelectInput';

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
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector(state => state.registration);
  const students = useSelector(state =>
    state.student.students.map(s => {
      return {
        value: s.id,
        label: s.name,
      };
    })
  );

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

  function handleSelectChange(e) {
    console.tron.log(e);
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>
            {id === 'new' ? 'Cadastro de matrícula' : 'Edição de matrícula'}
          </h1>
          <div>
            <Link to="/registrations">
              <MdChevronLeft color="#fff" size={20} />
              VOLTAR
            </Link>
            <button type="submit" form="registration" disabled={!!loading}>
              <MdCheck color="#fff" size={20} /> SALVAR
            </button>
          </div>
        </header>

        <Form schema={schema} id="registration" onSubmit={handleSubmit}>
          <div>
            <label>
              ALUNO
              <SelectInput
                name="student"
                options={students}
                onChange={handleSelectChange}
              />
            </label>
          </div>
          <div>
            <label>
              PLANO
              <Input
                name="duration"
                type="number"
                value={plan.duration || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              DATA DE INÍCIO
              <Input
                name="price"
                type="number"
                value={plan.price || ''}
                onChange={handleChange}
                step={0.01}
              />
            </label>
            <label>
              DATA DE TÉRMINO
              <Input
                name="totalPrice"
                type="text"
                value={totalPrice || ''}
                disabled
              />
            </label>
            <label>
              VALOR FINAL
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
