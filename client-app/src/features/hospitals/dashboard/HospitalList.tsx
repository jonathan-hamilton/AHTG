import { observer } from 'mobx-react-lite';
import React from 'react'
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import HospitalListItem from './HospitalListItem';

export default observer(function HospitalList() {
  const {hospitalStore} = useStore();
  const {hospitalRegistry} = hospitalStore;
  const hospitals = Array.from(hospitalRegistry.values());

    return (
    <Segment>
        <Item.Group divided>
            {hospitals.map(hospital => (
                <HospitalListItem key={hospital.id} hospital={hospital} />
            ))}
        </Item.Group>
    </Segment>
  )
})
