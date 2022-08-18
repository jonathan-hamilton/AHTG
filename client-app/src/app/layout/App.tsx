import React, { useEffect, useState } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import HospitalDashboard from '../../features/hospitals/dashboard/HospitalDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {hospitalStore} = useStore();

  useEffect(() => {
    hospitalStore.loadHospitals();
  }, [hospitalStore]);

  if(hospitalStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>  
        <HospitalDashboard />
      </Container>
    </>
  );
}

export default observer (App);
