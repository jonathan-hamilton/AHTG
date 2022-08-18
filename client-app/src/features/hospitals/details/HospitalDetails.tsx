import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function HospitalDetails() {
  const {hospitalStore} = useStore();
  const {selectedHospital: hospital, loadHospital, loadingInitial} = hospitalStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadHospital(id);
  },[id, loadHospital]);

  if(loadingInitial || !hospital) return <LoadingComponent />;

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
        <Button as={Link} to={`/manage/${hospital.id}`} basic color='blue' content='Edit' />
        <Button as={Link} to='/hospitals' basic color='grey' content='Cancel' />
      </Button.Group>
    </Card.Content>
  </Card>
  )
})
