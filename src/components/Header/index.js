import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import brand from '~/assets/brand.png';

import { Container, Content } from './styles';

export default function Header() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <div>
            <Link to="/">
              <img src={brand} alt="GoBarber" />
              <span>GYMPOINT</span>
            </Link>
          </div>

          <NavLink to="/students">ALUNOS</NavLink>
          <NavLink to="/plans">PLANOS</NavLink>
          <NavLink to="/registrations">MATRÍCULAS</NavLink>
          <NavLink to="/help">PEDIDOS DE AUXÍLIO</NavLink>
        </nav>

        <aside>
          <div>
            <strong>{user.name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
