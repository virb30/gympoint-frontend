import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import Content from '~/components/DefaultForm';
import SelectInput from '~/components/SelectInput';
import DateInput from '~/components/DateInput';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('Selecione um aluno')
    .required('Selecione o aluno'),
  plan_id: Yup.number()
    .typeError('Selecione um plano')
    .required('Selecione o plano'),
  start_date: Yup.date()
    .typeError('Informe a data de início')
    .required('Informe a data de início'),
});

export default function RegistrationForm({ initialData }) {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(
    initialData ? initialData.plan_id : null
  );
  const [startDate, setStartDate] = useState(
    initialData ? initialData.start_date : null
  );
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

  const endDate = useMemo(() => {
    if (startDate && selectedPlan) {
      const plan = plans.find(p => p.id === Number(selectedPlan));

      if (!plan) {
        return '';
      }

      return addMonths(startDate, plan.duration);
    }

    return '';
  }, [selectedPlan, startDate, plans]);

  const finalPrice = useMemo(() => {
    if (selectedPlan) {
      const plan = plans.find(p => p.id === Number(selectedPlan));

      if (!plan) {
        return '';
      }

      return formatPrice(plan.duration * plan.price);
    }

    return '';
  }, [selectedPlan, plans]);

  async function handleSubmit({ student_id, plan_id, start_date }) {
    setLoading(true);
    try {
      if (!initialData) {
        await api.post('/registrations', {
          student_id,
          plan_id,
          start_date,
        });
      } else {
        const { id } = initialData;
        await api.put(`/registrations/${id}`, {
          student_id,
          plan_id,
          start_date,
        });
      }
      history.push('/registrations');
    } catch (err) {
      toast.error('Não foi possível matricular o aluno. Tente novamente');
    }
    setLoading(false);
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
          <button type="submit" form="registration" disabled={loading}>
            <MdCheck color="#fff" size={20} /> SALVAR
          </button>
        </div>
      </header>

      <Form
        id="registration"
        initialData={initialData}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            ALUNO
            <SelectInput
              name="student_id"
              loadOptions={loadOptions}
              defaultOptions
            />
          </label>
        </div>
        <div>
          <label htmlFor="plan">
            PLANO
            <Select
              options={plans}
              name="plan_id"
              onChange={e => setSelectedPlan(e.target.value)}
            />
          </label>
          <label htmlFor="start_date">
            DATA DE INÍCIO
            <DateInput
              name="start_date"
              locale={pt}
              popperPlacement="bottom"
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </label>
          <label htmlFor="end_date">
            DATA DE TÉRMINO
            <DateInput
              name="end_date"
              locale={pt}
              selected={endDate}
              popperPlacement="bottom"
              dateFormat="dd/MM/yyyy"
              disabled
            />
          </label>
          <label>
            VALOR FINAL
            <Input name="totalPrice" value={finalPrice} type="text" disabled />
          </label>
        </div>
      </Form>
    </Content>
  );
}

RegistrationForm.propTypes = {
  initialData: PropTypes.shape({
    student_id: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    }),
    id: PropTypes.number,
    plan_id: PropTypes.number,
    start_date: PropTypes.instanceOf(Date),
  }),
};

RegistrationForm.defaultProps = {
  initialData: null,
};
