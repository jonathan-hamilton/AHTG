import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';
import HospitalDetails from '../details/HospitalDetails';
import ActivityForm from '../form/HospitalForm';
import HospitalList from './HospitalList';

interface Props {
    hospitals: Hospital[];
    selectedHospital: Hospital | undefined;
    selectHospital: (id: string) => void;
    cancelSelectHospital: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (hospital: Hospital) => void;
    deleteHospital: (id: string) => void;
}

export default function HospitalDashboard({hospitals, selectedHospital,
    selectHospital, cancelSelectHospital, editMode, openForm, closeForm, createOrEdit, deleteHospital}: Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
            <HospitalList hospitals={hospitals} 
                selectHospital={selectHospital}
                deleteHospital={deleteHospital}
            />            
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedHospital && !editMode &&
            <HospitalDetails 
                hospital={selectedHospital} 
                cancelSelectHospital={cancelSelectHospital} 
                openForm={openForm}
            />}
            {editMode &&
            <ActivityForm closeForm={closeForm} hospital={selectedHospital} createOrEdit={createOrEdit}/>}
        </Grid.Column>
    </Grid>
  )
}
