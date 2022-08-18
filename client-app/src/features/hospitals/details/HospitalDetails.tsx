import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function HospitalDetails() {
  const {hospitalStore} = useStore();
  const {selectedHospital: hospital, openForm, cancelSelectedHospital} = hospitalStore;

  if(!hospital) return <LoadingComponent />;

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
        <Button onClick={() => cancelSelectedHospital()} basic color='grey' content='Cancel' />
      </Button.Group>
    </Card.Content>
  </Card>
  )
}
