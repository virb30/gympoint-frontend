import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import * as PlanActions from '~/store/modules/plan/actions';

import Content from '~/components/DefaultForm';
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

export default function RegistrationForm({ initialData }) {
  const [search, setSearch] = useState('');
  const [registrationValues, setRegistrationValues] = useState(INITIAL_PLAN);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadOptions(inputValue) {
    const { data } = await api.get('/students', { params: { q: inputValue } });

    return data.map(s => ({
      value: s.id,
      label: s.name,
    }));
  }

  useEffect(() => {
    async function loadPlans() {
      const { data } = await api.get('/plans');
      setPlans(data);
    }

    loadPlans();
  }, []);

  function handleSubmit(data) {
    console.tron.log(data);
  }

  function handleSelectChange(e) {
    console.tron.log(e);
  }

  return (
    <Content>
      <header>
        <h1>
          {!initialData ? 'Cadastro de matrícula' : 'Edição de matrícula'}
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

      <Form id="registration" initialData={initialData} onSubmit={handleSubmit}>
        <div>
          <label>
            ALUNO
            <SelectInput
              name="student"
              loadOptions={loadOptions}
              defaultOptions
            />
          </label>
        </div>
        <div>
          <label htmlFor="plan">
            PLANO
            <Select options={plans} name="plan" />
          </label>
          <label>
            DATA DE INÍCIO
            <Input name="price" type="number" step={0.01} />
          </label>
          <label>
            DATA DE TÉRMINO
            <Input name="totalPrice" type="text" disabled />
          </label>
          <label>
            VALOR FINAL
            <Input name="totalPrice" type="text" disabled />
          </label>
        </div>
      </Form>
    </Content>
  );
}

RegistrationForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.number,
    duration: PropTypes.number,
  }),
};

RegistrationForm.defaultProps = {
  initialData: null,
};
