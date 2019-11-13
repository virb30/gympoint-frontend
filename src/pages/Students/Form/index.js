import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import * as StudentActions from '~/store/modules/student/actions';

import Content from '~/components/DefaultForm';
import { Container } from './styles';

const INITIAL_STUDENT = {
  name: '',
  id: '',
  email: '',
  height: '',
  weight: '',
  age: '',
};

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

export default function StudentsForm() {
  const [student, setStudent] = useState(INITIAL_STUDENT);
  const { loading } = useSelector(state => state.student);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function loadStudent() {
      if (id !== 'new') {
        const response = await api.get(`/students/${id}`);
        setStudent({ ...response.data });
      }
    }

    loadStudent();
  }, [id]);

  function handleChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }

  function handleSubmit(data) {
    const { name, email, age, weight, height } = data;
    if (id === 'new') {
      dispatch(
        StudentActions.insertStudentRequest(name, email, age, weight, height)
      );
    } else {
      dispatch(
        StudentActions.updateStudentRequest(
          id,
          name,
          email,
          age,
          weight,
          height
        )
      );
    }
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>{id === 'new' ? 'Cadastro de Aluno' : 'Edição de aluno'}</h1>
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

        <Form schema={schema} id="student" onSubmit={handleSubmit}>
          <div>
            <label>
              NOME COMPLETO
              <Input
                name="name"
                type="text"
                placeholder="Nome do Aluno"
                value={student.name || ''}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              ENDEREÇO DE E-MAIL
              <Input
                name="email"
                type="email"
                placeholder="exemplo@email.com"
                value={student.email || ''}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              IDADE
              <Input
                name="age"
                type="number"
                value={student.age || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              PESO (em kg)
              <Input
                name="weight"
                type="number"
                value={student.weight || ''}
                onChange={handleChange}
                step={0.1}
              />
            </label>
            <label>
              Altura (em cm)
              <Input
                name="height"
                type="number"
                value={student.height || ''}
                onChange={handleChange}
              />
            </label>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
