import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import Content from '~/components/DefaultForm';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('A idade deve ser um número')
    .integer('A idade deve ser um número inteiro')
    .positive('A idade deve ser um número positivo')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .typeError('O Peso deve ser um número')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .typeError('A altura deve ser um número')
    .integer('A altura deve ser um número inteiro')
    .required('A altura é obrigatória'),
});

export default function StudentForm({ initialData }) {
  const [loading] = useState(false);

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      if (initialData) {
        await api.put(`/students/${initialData.id}`, {
          name,
          email,
          age,
          weight,
          height,
        });
      } else {
        await api.post('/students', {
          name,
          email,
          age,
          weight,
          height,
        });
      }

      history.push('/students');
    } catch (err) {
      toast.error('Não foi possível cadastrar o Aluno, tente novamente!');
    }
  }

  return (
    <Content>
      <header>
        <h1>{!initialData ? 'Cadastro de Aluno' : 'Edição de aluno'}</h1>
        <div>
          <Link to="/students">
            <MdChevronLeft color="#fff" size={20} />
            VOLTAR
          </Link>
          <button type="submit" form="student" disabled={!!loading}>
            <MdCheck color="#fff" size={20} /> SALVAR
          </button>
        </div>
      </header>

      <Form
        schema={schema}
        id="student"
        onSubmit={handleSubmit}
        initialData={initialData}
      >
        <div>
          <label>
            NOME COMPLETO
            <Input name="name" type="text" placeholder="Nome do Aluno" />
          </label>
        </div>
        <div>
          <label>
            ENDEREÇO DE E-MAIL
            <Input name="email" type="email" placeholder="exemplo@email.com" />
          </label>
        </div>
        <div>
          <label>
            IDADE
            <Input name="age" type="number" />
          </label>
          <label>
            PESO (em kg)
            <Input name="weight" type="number" step={0.1} />
          </label>
          <label>
            Altura (em cm)
            <Input name="height" type="number" />
          </label>
        </div>
      </Form>
    </Content>
  );
}

StudentForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
    age: PropTypes.number,
  }),
};

StudentForm.defaultProps = {
  initialData: null,
};
