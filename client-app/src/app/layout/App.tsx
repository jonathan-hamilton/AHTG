import React from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import HospitalDashboard from '../../features/hospitals/dashboard/HospitalDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, Switch, useLocation } from 'react-router-dom';
import HospitalForm from '../../features/hospitals/form/HospitalForm';
import HospitalDetails from '../../features/hospitals/details/HospitalDetails';
import NotFound from '../../features/errors/NotFound';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>                
            <Switch>
              <Route exact path='/hospitals' component={HospitalDashboard} />
              <Route path='/hospitals/:id' component={HospitalDetails} />
              <Route key={location.key} path={['/createHospital','/manage/:id']} component={HospitalForm} />
              <Route component={NotFound} />
            </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer (App);
