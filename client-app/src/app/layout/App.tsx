import React, { useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import HospitalDashboard from '../../features/hospitals/dashboard/HospitalDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, Switch, useLocation } from 'react-router-dom';
import HospitalForm from '../../features/hospitals/form/HospitalForm';
import HospitalDetails from '../../features/hospitals/details/HospitalDetails';
import NotFound from '../../features/errors/NotFound';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const {userStore, commonStore} = useStore();

  useEffect(() => {
    if (commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  },[commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <>
      <ModalContainer />
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
              <Route path='/login' component={LoginForm} />
              <Route component={NotFound} />
            </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
