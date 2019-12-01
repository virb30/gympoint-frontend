import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';

import Modal from '~/components/Modal';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';

import { Container, Content, FormContainer } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('Sua resposta é obrigatória'),
});

export default function HelpOrders({ history }) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [helpOrders, setHelpOrders] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const headers = [
    { key: 'student', title: 'ALUNO', align: 'left' },
    { key: 'actions', title: '', align: 'right' },
  ];

  const loadHelpOrders = useCallback(async (page = 1) => {
    const response = await api.get('/help-orders', { params: { page } });
    setCurrentPage(page);
    setHelpOrders(response.data.helpOrders);
    setNumPages(response.data.num_pages);
  }, []);

  function handleChangePage(page) {
    loadHelpOrders(page);
  }

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

  useEffect(() => {
    const { state } = history.location;
    if (!state) {
      setSelected(null);
      return;
    }

    const { selectedHelpOrder } = state;

    if (selectedHelpOrder) {
      setSelected(helpOrders.find(s => s.id === Number(selectedHelpOrder)));
    }
  }, [helpOrders, history.location]);

  const renderHelpOrders = useCallback(() => {
    const data = helpOrders.map(r => ({
      ...r,
      student: r.student.name,
      actions: (
        <div>
          <Link
            to={{
              pathname: '/help',
              state: { selectedHelpOrder: r.id },
            }}
          >
            responder
          </Link>
        </div>
      ),
    }));

    return data;
  }, [helpOrders]);

  async function handleSubmit({ answer }) {
    setLoading(true);
    try {
      const { id } = selected;
      const response = await api.post(`/help-orders/${id}/answer`, { answer });

      setHelpOrders(helpOrders.filter(ho => ho.id !== response.data.id));
      setSelected(null);
    } catch (err) {
      toast.error('Erro ao cadastrar sua resposta, tente novamente!');
    }
    setLoading(false);
  }

  return (
    <Container>
      <Content maxWidth={700}>
        <header>
          <h1>Pedidos de Auxílo</h1>
        </header>
        <Table
          data={renderHelpOrders()}
          headers={headers}
          emptyText="Não há pedidos de auxílio para serem respondidos"
        />
        <Pagination
          onChangePage={handleChangePage}
          currentPage={currentPage}
          numPages={numPages}
        />
      </Content>
      {selected && (
        <Modal showModal={selected !== null}>
          <FormContainer>
            <Form
              initialData={selected || null}
              schema={schema}
              onSubmit={handleSubmit}
            >
              <strong>PERGUNTA DO ALUNO</strong>
              <p>{selected.question}</p>
              <label htmlFor="answer">
                SUA RESPOSTA
                <Input
                  multiline
                  name="answer"
                  placeholder="Sua resposta"
                  rows="5"
                />
              </label>
              <button type="submit" disabled={loading}>
                Responder Aluno
              </button>
              <button type="button" onClick={() => setSelected(null)}>
                Fechar
              </button>
            </Form>
          </FormContainer>
        </Modal>
      )}
    </Container>
  );
}

HelpOrders.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        selectedHelpOrder: PropTypes.number,
      }),
    }),
  }),
};

HelpOrders.defaultProps = {
  history: {
    location: {
      state: {
        selectedHelpOrder: null,
      },
    },
  },
};
