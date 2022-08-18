import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import {  useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import HospitalDetailedHeader from './HospitalDetailedHeader';
import HospitalDetailedInfo from './HospitalDetailedInfo';

export default observer(function HospitalDetails() {
  const {hospitalStore} = useStore();
  const {selectedHospital: hospital, loadHospital, loadingInitial} = hospitalStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadHospital(id);
  },[id, loadHospital]);

  if(loadingInitial || !hospital) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={14}>
        <HospitalDetailedHeader hospital={hospital}/>
        <HospitalDetailedInfo hospital={hospital}/>
      </Grid.Column>      
    </Grid>
  )
})
