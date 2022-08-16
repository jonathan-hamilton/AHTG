import React from 'react'
import { Button, Item, Segment } from 'semantic-ui-react';
import { Hospital } from '../../../app/models/hospital';

interface Props{
    hospitals: Hospital[];
    selectHospital: (id: string) => void;
    deleteHospital: (id: string) => void;
}

export default function HospitalList({hospitals, selectHospital, deleteHospital}: Props) {
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
                            <Button onClick={() => selectHospital(hospital.id)} floated='right' content='View' color='blue' />                            
                            <Button onClick={() => deleteHospital(hospital.id)} floated='right' content='Delete' color='red' />                            
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  )
}
