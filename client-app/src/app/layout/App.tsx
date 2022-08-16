import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Hospital } from '../models/hospital';
import NavBar from './NavBar';
import HospitalDashboard from '../../features/hospitals/dashboard/HospitalDashboard';

function App() {

  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    axios.get<Hospital[]>('https://localhost:7142/api/Hospitals').then(response => {      
      setHospitals(response.data);
    })
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <HospitalDashboard hospitals={hospitals} />
      </Container>
    </>
  );
}

export default App;
