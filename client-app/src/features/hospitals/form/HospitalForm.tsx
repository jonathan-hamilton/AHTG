import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';

interface Props{
    hospital: Hospital | undefined;
    closeForm: () => void;
    createOrEdit: (hospital: Hospital) => void;
}

export default function HospitalForm({hospital: selectedHospital, closeForm, createOrEdit}: Props) {

  const initialState = selectedHospital ?? {
    id: '',
    address: '',
    city: '',
    email: '',
    enteredOn: '',
    name: '',
    phone: '',
    state: '',
    zip: '',
    image: ''
  }

  const [hospital, setHospital] = useState(initialState);

  function handleSubmit(){
    createOrEdit(hospital);
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
            <Button floated='right' positive type='submit' content='Submit' />
            <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
        </Form>
    </Segment>
  )
}
