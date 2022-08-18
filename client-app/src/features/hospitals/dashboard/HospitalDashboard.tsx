import { observer } from 'mobx-react-lite';
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import HospitalDetails from '../details/HospitalDetails';
import HospitalForm from '../form/HospitalForm';
import HospitalList from './HospitalList';

export default observer(function HospitalDashboard() {

  const {hospitalStore} = useStore();
  const {selectedHospital, editMode} = hospitalStore;

  return (
    <Grid>
        <Grid.Column width='10'>
            <HospitalList />            
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedHospital && !editMode &&
            <HospitalDetails />}
            {editMode &&
            <HospitalForm />}
        </Grid.Column>
    </Grid>
  )
})
