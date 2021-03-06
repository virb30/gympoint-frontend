import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Form from './Form';
import List from './List';

import { Container, Content } from './styles';

export default function Registrations({ history }) {
  const [registrations, setRegistrations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const loadRegistrations = useCallback(async (page = 1) => {
    const response = await api.get('/registrations', { params: { page } });
    setCurrentPage(page);
    setRegistrations(response.data.registrations);
    setNumPages(response.data.num_pages);
  }, []);

  function handleChangePage(page) {
    loadRegistrations(page);
  }

  useEffect(() => {
    if (!showForm) {
      loadRegistrations();
    }
  }, [loadRegistrations, showForm]);

  useEffect(() => {
    const { state } = history.location;
    if (!state) {
      setShowForm(false);
      setSelected(null);
      return;
    }
    const { edit, selectedRegistration } = state;
    setShowForm(edit);

    if (selectedRegistration) {
      setSelected(
        registrations.find(s => s.id === Number(selectedRegistration))
      );
    }
  }, [history.location, registrations]);

  const formattedSelected = useMemo(() => {
    if (selected) {
      return {
        ...selected,
        start_date: parseISO(selected.start_date),
        student_id: {
          value: selected.student.id,
          label: selected.student.name,
        },
        plan_id: selected.plan.id,
      };
    }

    return null;
  }, [selected]);

  const handleDelete = useCallback(
    async id => {
      if (
        global.confirm(
          'Deseja excluir esta Matrícula? Esta operação não poderá ser desfeita'
        )
      ) {
        try {
          await api.delete(`/registrations/${id}`);
          setRegistrations(registrations.filter(r => r.id !== Number(id)));
        } catch (err) {
          toast.error('Não foi possível excluir a Matrícula. Tente novamente');
        }
      }
    },
    [registrations]
  );

  const renderRegistrations = useCallback(() => {
    const data = registrations.map(r => ({
      ...r,
      student: r.student.name,
      plan: r.plan.title,
      start_date: format(parseISO(r.start_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
      end_date: format(parseISO(r.end_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
      active: <MdCheckCircle color={r.active ? '#42cb49' : '#ddd'} size={20} />,
      actions: (
        <div>
          <Link
            to={{
              pathname: '/registrations',
              state: { edit: true, selectedRegistration: r.id },
            }}
          >
            editar
          </Link>
          <button
            onClick={() => handleDelete(r.id)}
            type="button"
            className="delete"
          >
            apagar
          </button>
        </div>
      ),
    }));

    return data;
  }, [handleDelete, registrations]);

  return (
    <Container>
      <Content maxWidth={showForm ? 900 : 1380}>
        {!showForm ? (
          <List
            registrations={renderRegistrations()}
            onChangePage={handleChangePage}
            numPages={numPages}
            currentPage={currentPage}
          />
        ) : (
          <Form initialData={formattedSelected} />
        )}
      </Content>
    </Container>
  );
}

Registrations.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        edit: PropTypes.bool,
        selectedRegistration: PropTypes.number,
      }),
    }),
  }),
};

Registrations.defaultProps = {
  history: {
    location: {
      state: {
        edit: false,
        selectedRegistration: null,
      },
    },
  },
};
