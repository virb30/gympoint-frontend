import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';

import List from './List';
import Form from './Form';

import { Container, Content } from './styles';

export default function Students({ history }) {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { state } = history.location;
    if (!state) {
      setShowForm(false);
      setSelected(null);
      return;
    }
    const { edit, selectedStudent } = state;
    setShowForm(edit);

    if (selectedStudent) {
      setSelected(students.find(s => s.id === Number(selectedStudent)));
    }
  }, [history.location, students]);

  const loadStudents = useCallback(
    async (page = 1) => {
      const response = await api.get('/students', {
        params: { q: search, page },
      });
      setCurrentPage(page);
      setNumPages(response.data.num_pages);
      setStudents(response.data.students);
    },
    [search]
  );

  function handleChangePage(page) {
    loadStudents(page);
  }

  useEffect(() => {
    if (!showForm) {
      loadStudents();
    }
  }, [loadStudents, search, showForm]);

  const handleDelete = useCallback(
    async id => {
      if (
        global.confirm(
          'Deseja excluir este aluno? Esta operação não poderá ser desfeita'
        )
      ) {
        try {
          await api.delete(`/students/${id}`);

          setStudents(students.filter(s => s.id !== id));
        } catch (err) {
          toast.error('Não foi possível excluir o aluno. Tente novamente!');
        }
      }
    },
    [students]
  );

  function handleSearch(value) {
    setSearch(value);
  }

  const renderStudents = useCallback(() => {
    const data = students.map(student => ({
      ...student,
      actions: (
        <div>
          <Link
            to={{
              pathname: '/students',
              state: { edit: true, selectedStudent: student.id },
            }}
          >
            editar
          </Link>
          <button
            onClick={() => handleDelete(student.id)}
            type="button"
            className="delete"
          >
            apagar
          </button>
        </div>
      ),
    }));

    return data;
  }, [handleDelete, students]);

  return (
    <Container>
      <Content maxWidth={showForm ? 900 : 1200}>
        {!showForm ? (
          <List
            students={renderStudents()}
            search={e => handleSearch(e.target.value)}
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

Students.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        edit: PropTypes.bool,
        selectedStudent: PropTypes.number,
      }),
    }),
  }),
};

Students.defaultProps = {
  history: {
    location: {
      state: {
        edit: false,
        selectedStudent: null,
      },
    },
  },
};
