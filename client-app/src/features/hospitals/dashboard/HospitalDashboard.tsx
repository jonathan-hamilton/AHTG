import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';
import HospitalDetails from '../details/HospitalDetails';
import HospitalList from './HospitalList';

interface Props {
    hospitals: Hospital[];
}

export default function HospitalDashboard({hospitals}: Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
            <HospitalList hospitals={hospitals}/>            
        </Grid.Column>
        <Grid.Column width='6'>
            {hospitals[0] &&
            <HospitalDetails hospital={hospitals[0]} />}
        </Grid.Column>
    </Grid>
  )
}
