import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import HospitalList from './HospitalList';

export default observer(function HospitalDashboard() {
  const {hospitalStore} = useStore();
  const {loadHospitals, hospitalRegistry} = hospitalStore;

  useEffect(() => {
    if(hospitalRegistry.size <= 1) loadHospitals();
  }, [hospitalRegistry.size, loadHospitals]);

  if(hospitalStore.loadingInitial) return <LoadingComponent content='Loading hospitals...'/>

  return (
    <Grid>
        <Grid.Column width='16' style={{marginLeft:'100px', marginRight:'100px'}}>
            <HospitalList />            
        </Grid.Column>
    </Grid>
  )
})
