import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Hospital } from '../../../app/models/hospital';
import { useStore } from '../../../app/stores/store';

export default observer(function HospitalList() {
  const {hospitalStore} = useStore();
  const {deleteHospital, hospitalRegistry, loading} = hospitalStore;
  const hospitals = Array.from(hospitalRegistry.values());

  const[target, setTarget] = useState('');

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
    setTarget(e.currentTarget.name);
    deleteHospital(id);
  }
  
    return (
    <Segment>
        <Item.Group divided>
            {hospitals.map(hospital => (
                <Item key={hospital.id}>
                    <Item.Content>
                        <Item.Header as='a'>{hospital.name}</Item.Header>
                        <Item.Description>
                            <div>{hospital.address}</div>
                            <div>{hospital.city}, {hospital.state} {hospital.zip}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button as={Link} to={`/hospitals/${hospital.id}`} floated='right' content='View' color='blue' />                            
                            <Button 
                                name={hospital.id}
                                loading={loading && target === hospital.id} 
                                onClick={(e) => handleActivityDelete(e, hospital.id)} 
                                floated='right' 
                                content='Delete' 
                                color='red' />                            
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  )
})
