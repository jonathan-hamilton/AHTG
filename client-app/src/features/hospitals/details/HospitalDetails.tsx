import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';

interface Props{
    hospital: Hospital;
    cancelSelectHospital: () => void;
    openForm: (id: string) => void;
}

export default function HospitalDetails({hospital, cancelSelectHospital, openForm}: Props) {
  return (
    <Card fluid>
    <Image src={`/assets/hospital_front/${hospital.image}`}/>
    <Card.Content>
      <Card.Header>{hospital.name}</Card.Header>
      <Card.Description>
        <div>{hospital.address}</div>
        <div>{hospital.city}, {hospital.state} {hospital.zip}</div>
        <div>{hospital.phone} - {hospital.email}</div>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
        <Button onClick={() => openForm(hospital.id)} basic color='blue' content='Edit' />
        <Button onClick={cancelSelectHospital} basic color='grey' content='Cancel' />
      </Button.Group>
    </Card.Content>
  </Card>
  )
}