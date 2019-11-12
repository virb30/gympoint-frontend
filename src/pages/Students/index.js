import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';

import {
  deleteStudentRequest,
  getStudentsRequest,
} from '~/store/modules/student/actions';

import Table from '~/components/Table';

import { Container, Content, InputGroup } from './styles';

export default function Students() {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    async id => {
      if (
        global.confirm(
          'Deseja excluir este aluno? Esta operação não poderá ser desfeita'
        )
      ) {
        dispatch(deleteStudentRequest(id));
      }
    },
    [dispatch]
  );

  const students = useSelector(state =>
    state.student.students.map(student => ({
      ...student,
      actions: (
        <div>
          <Link to={`/students/${student.id}`}>editar</Link>
          <button onClick={() => handleDelete(student.id)} type="button">
            apagar
          </button>
        </div>
      ),
    }))
  );

  function handleSearch(e) {
    const search = e.target.value;
    dispatch(getStudentsRequest(search));
  }

  useEffect(() => {
    dispatch(getStudentsRequest());
  }, [dispatch]);

  const headers = [
    { key: 'name', title: 'NOME', align: 'left' },
    { key: 'email', title: 'E-MAIL', align: 'left' },
    { key: 'age', title: 'IDADE', align: 'center' },
    { key: 'actions', title: '', align: 'right' },
  ];

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando Alunos</h1>
          <div>
            <Link to="/students/new" type="button">
              <MdAdd color="#fff" size={20} />
              CADASTRAR
            </Link>
            <InputGroup>
              <MdSearch size={16} color="#999" />
              <input
                type="text"
                placeholder="Buscar aluno"
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
        </header>

        <Table
          data={students}
          headers={headers}
          keyExtractor={item => item.id}
        />
      </Content>
    </Container>
  );
}
