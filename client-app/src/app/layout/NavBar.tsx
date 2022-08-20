import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {

  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} exact to="/" header>
                <img src="/assets/hospital-logo.png" alt="logo" style={{marginRight: '10px'}}/>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/hospitals" name='Hospitals' />
            <Menu.Item>
                <Button as={NavLink} to="/createHospital" positive content='Add Hospital' />
            </Menu.Item>
        </Container>
    </Menu>
  )
}
