import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    hospital: Hospital;
}

export default observer (function HospitalDetailedHeader({hospital}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/hospital_front/${hospital.image}`} fluid />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={hospital.name}
                                    style={{color: 'white'}}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom' >
                <Item.Group>
                    <Item.Content>
                        <h3>Contact:</h3>
                        <p>{hospital.phone}</p>
                        <p>{hospital.email}</p>
                    </Item.Content>
                    <Item.Content>
                        <Button floated='right' as={Link} to={`/manage/${hospital.id}`} color='blue' content='Edit' />
                        <Button floated='right' as={Link} to='/hospitals' color='grey' content='Cancel' />
                    </Item.Content>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
})