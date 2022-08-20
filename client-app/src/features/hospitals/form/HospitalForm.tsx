import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { specialtyOptions } from '../../../app/common/options/specialtyOptions';
import { Hospital } from '../../../app/models/hospital';

export default observer(function HospitalForm() {
  const history = useHistory();
  const {hospitalStore} = useStore();
  const {createHospital, updateHospital, 
    loading, loadHospital, loadingInitial} = hospitalStore;
  const {id} = useParams<{id: string}>();

  const [hospital, setHospital] = useState({
    id: '',
    address: '',
    city: '',
    email: '',
    enteredOn: new Date(),
    name: '',
    phone: '',
    state: '',
    zip: '',
    image: '',
    specialty: '',
    description: ''
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email is required'),
    specialty: Yup.string().required('Specialty is required'),
    description: Yup.string().required('Description is required')
  });

  useEffect(() => {
    if(id) loadHospital(id).then(hospital => setHospital(hospital!));
  },[id, loadHospital])

  function handleFormSubmit(hospital: Hospital){
    if(hospital.id.length === 0){
      let newHospital = {
        ...hospital,
        id: uuid()
      };
      createHospital(newHospital).then(() => history.push(`/hospitals/${newHospital.id}`));
    } else {
      updateHospital(hospital).then(() => history.push(`/hospitals/${hospital.id}`));
    }
  }

  // function handleInputChange(event: ChangeEvent<HTMLInputElement>){
  //   const {name, value} = event.target;
  //   setHospital({...hospital, [name]: value});
  // }

  if(loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Segment clearing>
      <Header content='Hospital Details' sup color='teal' />
      <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={hospital} 
        onSubmit={values => handleFormSubmit(values)} >
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='name' placeholder='Name' />

            <MyTextInput placeholder='Address' name='address'/>
            <MyTextInput placeholder='City' name='city'/>
            <MyTextInput placeholder='State' name='state'/>
            <MyTextInput placeholder='Zip' name='zip'/>
            <MySelectInput options={specialtyOptions} placeholder='Specialty' name='specialty'/>
            <Header content='Contact Information' sup color='teal' />
            <MyTextInput placeholder='Phone' name='phone'/>
            <MyTextInput placeholder='Email' name='email'/>
            <MyTextArea rows={3} placeholder='Description' name='description'/>
            <Button 
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading} 
              floated='right' 
              positive 
              type='submit' 
              content='Submit' 
            />
            <Button as={Link} to='/hospitals' floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>

    </Segment>
  )
})
