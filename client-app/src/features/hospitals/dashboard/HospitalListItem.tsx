import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';
import { useStore } from '../../../app/stores/store';

interface Props{
    hospital : Hospital;
}

export default function HospitalListItem({hospital}: Props) {
    const {hospitalStore} = useStore();
    const {deleteHospital, loading} = hospitalStore;
  
    const[target, setTarget] = useState('');
  
    function handleHospitalDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
      setTarget(e.currentTarget.name);
      deleteHospital(id);
    }    
    
  return (
    <Segment.Group>
        <Segment clearing>
            <Item.Group >
                <Item key={hospital.id}>
                    <Item.Image style={{marginTop:'1em'}} size='small' src={`/assets/hospital_front/${hospital.image}`} />
                    <Item.Content>
                        <Item.Header style={{marginTop:'1em'}} as='a'>{hospital.name}</Item.Header>
                        <Item.Description>
                            <div>{hospital.address}</div>
                            <div>{hospital.city}, {hospital.state} {hospital.zip}</div>
                        </Item.Description>
                        <Item.Description>
                            <div>Specialty: {hospital.specialty}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button 
                                as={Link} 
                                to={`/hospitals/${hospital.id}`} 
                                floated='right' 
                                content='View' 
                                color='blue' />                            
                            <Button 
                                name={hospital.id}
                                loading={loading && target === hospital.id} 
                                onClick={(e) => handleHospitalDelete(e, hospital.id)} 
                                floated='right' 
                                content='Delete' 
                                color='red' />                            
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </Segment.Group>
  )
}
