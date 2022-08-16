import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Hospital } from '../models/hospital';
import NavBar from './NavBar';
import HospitalDashboard from '../../features/hospitals/dashboard/HospitalDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Hospital[]>('https://localhost:7142/api/Hospitals').then(response => {      
      setHospitals(response.data);
    })
  }, []);

  function handleSelectHospital(id: string){
    setSelectedHospital(hospitals.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedHospital(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectHospital(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditHospital(hospital: Hospital){
    hospital.id
      ? setHospitals([...hospitals.filter(x => x.id !== hospital.id), hospital])
      : setHospitals([...hospitals, {...hospital, id: uuid()}]);
    setEditMode(false);
    setSelectedHospital(hospital);
  }

  function handleDeleteHospital(id: string){
    setHospitals([...hospitals.filter(x => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <HospitalDashboard 
          hospitals={hospitals} 
          selectedHospital={selectedHospital}
          selectHospital={handleSelectHospital}
          cancelSelectHospital={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditHospital}
          deleteHospital={handleDeleteHospital}
        />
      </Container>
    </>
  );
}

export default App;
