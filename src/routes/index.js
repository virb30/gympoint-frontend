import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';

import Registrations from '~/pages/Registrations';
import RegistrationForm from '~/pages/Registrations/Form';

import Plans from '~/pages/Plans';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />

      <Route path="/students" component={Students} isPrivate />

      <Route path="/registrations/:id" component={RegistrationForm} isPrivate />
      <Route exact path="/registrations" component={Registrations} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />

      <Route path="/help" component={HelpOrders} isPrivate />
    </Switch>
  );
}
