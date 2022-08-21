import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Button, Container, Header, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
  const {userStore} = useStore();

  return (
    <>
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error: 'Invalid Email or Password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to AHTG Demo' color='teal' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => 
                        <Label style={{marginBotom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
        <h4>Email: jon@test.com</h4>
        <h4>Password: Pa$$w0rd</h4>
    </>
  )
})
