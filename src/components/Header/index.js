import React from 'react';
import { NavLink } from 'react-router-dom';

import brand from '~/assets/brand.png';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={brand} alt="GoBarber" />
            <span>GYMPOINT</span>
          </div>

          <NavLink to="/students">ALUNOS</NavLink>
          <NavLink to="/plans">PLANOS</NavLink>
          <NavLink to="/registrations">MATRÍCULAS</NavLink>
          <NavLink to="/help">PEDIDOS DE AUXÍLIO</NavLink>
        </nav>

        <aside>
          <div>
            <strong>Vinicius</strong>
            <button type="button">sair do sistema</button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
