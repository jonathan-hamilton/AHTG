import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';

interface Props {
    hospital: Hospital;
}

export default observer(function HospitalDetailedInfo({hospital}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <p>{hospital.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})