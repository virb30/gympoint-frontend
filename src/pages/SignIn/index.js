import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.png';

import { Container } from './styles';

export default function SignIn() {
  return (
    <Container>
      <img src={logo} alt="Gympoint" />

      <Form>
        <label>
          SEU E-MAIL
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </label>

        <label>
          SUA SENHA
          <Input name="password" type="password" placeholder="************" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </Form>
    </Container>
  );
}
