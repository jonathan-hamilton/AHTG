import React from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import HospitalDashboard from '../../features/hospitals/dashboard/HospitalDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, useLocation } from 'react-router-dom';
import HospitalForm from '../../features/hospitals/form/HospitalForm';
import HospitalDetails from '../../features/hospitals/details/HospitalDetails';

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
              <Route exact path='/hospitals' component={HospitalDashboard} />
              <Route path='/hospitals/:id' component={HospitalDetails} />
              <Route key={location.key} path={['/createHospital','/manage/:id']} component={HospitalForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer (App);
