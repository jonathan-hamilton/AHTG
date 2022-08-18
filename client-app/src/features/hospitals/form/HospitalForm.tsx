import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function HospitalForm() {
  const history = useHistory();
  const {hospitalStore} = useStore();
  const {createHospital, updateHospital, 
    loading, loadHospital, loadingInitial} = hospitalStore;
  const {id} = useParams<{id: string}>();

  const [hospital, setHospital] = useState({
    id: '',
    address: '',
    city: '',
    email: '',
    enteredOn: new Date(),
    name: '',
    phone: '',
    state: '',
    zip: '',
    image: '',
    specialty: '',
    description: ''
  });

  useEffect(() => {
    if(id) loadHospital(id).then(hospital => setHospital(hospital!));
  },[id, loadHospital])

  function handleSubmit(){
    if(hospital.id.length === 0){
      let newHospital = {
        ...hospital,
        id: uuid()
      };
      createHospital(newHospital).then(() => history.push(`/hospitals/${newHospital.id}`));
    } else {
      updateHospital(hospital).then(() => history.push(`/hospitals/${hospital.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;
    setHospital({...hospital, [name]: value});
  }

  if(loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Name' value={hospital.name} name='name' onChange={handleInputChange} />
            <Form.Input placeholder='Address' value={hospital.address} name='address' onChange={handleInputChange}/>
            <Form.Input placeholder='City' value={hospital.city} name='city' onChange={handleInputChange}/>
            <Form.Input placeholder='State' value={hospital.state} name='state' onChange={handleInputChange}/>
            <Form.Input placeholder='Zip' value={hospital.zip} name='zip' onChange={handleInputChange}/>
            <Form.Input placeholder='Phone' value={hospital.phone} name='phone' onChange={handleInputChange}/>
            <Form.Input placeholder='Email' value={hospital.email} name='email' onChange={handleInputChange}/>
            <Form.Input placeholder='Specialty' value={hospital.specialty} name='specialty' onChange={handleInputChange}/>
            <Form.Input placeholder='Description' value={hospital.description} name='description' onChange={handleInputChange}/>
            <Button loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button as={Link} to='/hospitals' floated='right' type='button' content='Cancel' />
        </Form>
    </Segment>
  )
})
