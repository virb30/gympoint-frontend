import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentsForm from '~/pages/Students/Form';

import Registrations from '~/pages/Registrations';
import Plans from '~/pages/Plans';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />

      <Route path="/students/:id" component={StudentsForm} isPrivate />
      <Route exact path="/students" component={Students} isPrivate />

      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/help" component={HelpOrders} isPrivate />
    </Switch>
  );
}
