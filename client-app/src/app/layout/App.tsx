import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Hospital } from '../models/hospital';
import NavBar from './NavBar';
import HospitalDashboard from '../../features/hospitals/dashboard/HospitalDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {      
      setHospitals(response);
      setLoading(false);
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
    setSubmitting(true);
    if(hospital.id){
      agent.Activities.update(hospital).then(() => {
        setHospitals([...hospitals.filter(x => x.id !== hospital.id), hospital]);
        setSelectedHospital(hospital);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      hospital.id = uuid();
      agent.Activities.create(hospital).then(() => {
        hospital.enteredOn = new Date();
        setHospitals([...hospitals, hospital]);
        setSelectedHospital(hospital);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteHospital(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setHospitals([...hospitals.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
    
  }

  if(loading) return <LoadingComponent content='Loading app'/>

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
