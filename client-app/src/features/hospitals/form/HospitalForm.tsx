import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';
import { useStore } from '../../../app/stores/store';

export default observer(function HospitalForm() {
  const {hospitalStore} = useStore();
  const {selectedHospital, closeForm, createHospital, updateHospital, loading} = hospitalStore;

  const initialState = selectedHospital ?? {
    id: '',
    address: '',
    city: '',
    email: '',
    enteredOn: new Date(),
    name: '',
    phone: '',
    state: '',
    zip: '',
    image: ''
  }

  const [hospital, setHospital] = useState(initialState);

  function handleSubmit(){
    hospital.id ? updateHospital(hospital) : createHospital(hospital);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;
    setHospital({...hospital, [name]: value});
  }

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
            <Button loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
        </Form>
    </Segment>
  )
})
