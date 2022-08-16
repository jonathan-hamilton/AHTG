import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Hospital } from '../../../app/models/hospital';
import HospitalDetails from '../details/HospitalDetails';
import HospitalForm from '../form/HospitalForm';
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
    submitting: boolean;
}

export default function HospitalDashboard({hospitals, selectedHospital,
    selectHospital, cancelSelectHospital, editMode, openForm, 
    closeForm, createOrEdit, deleteHospital, submitting}: Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
            <HospitalList hospitals={hospitals} 
                selectHospital={selectHospital}
                deleteHospital={deleteHospital}
                submitting={submitting}
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
            <HospitalForm 
                closeForm={closeForm} 
                hospital={selectedHospital} 
                createOrEdit={createOrEdit}
                submitting={submitting}
            />}
        </Grid.Column>
    </Grid>
  )
}
