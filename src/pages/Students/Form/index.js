import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

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
    .integer('A idade deve ser um número inteiro')
    .positive('A idade deve ser um número positivo')
    .required('A idade é obrigatória'),
  weight: Yup.number().required('O peso é obrigatório'),
  height: Yup.number()
    .integer('A altura deve ser um número inteiro')
    .required('A altura é obrigatória'),
});

export default function StudentsForm() {
  const [student, setStudent] = useState(INITIAL_STUDENT);
  const { state } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (state) {
      setStudent(state);
    }
  }, [state]);

  function handleChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }

  console.tron.log(student);

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
            <button type="button">
              <MdCheck color="#fff" size={20} /> SALVAR
            </button>
          </div>
        </header>

        <Form schema={schema} onSubmit>
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
                type="text"
                value={student.weight || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Altura (em cm)
              <Input
                name="height"
                type="text"
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
