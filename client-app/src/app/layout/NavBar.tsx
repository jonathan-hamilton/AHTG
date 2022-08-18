import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export default function NavBar() {
  const {hospitalStore} = useStore();
  const {openForm} = hospitalStore;

  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src="/assets/hospital-logo.png" alt="logo" style={{marginRight: '10px'}}/>
            </Menu.Item>
            <Menu.Item name='Hospitals' />
            <Menu.Item>
                <Button onClick={() => openForm()} positive content='Add Hospital' />
            </Menu.Item>
        </Container>
    </Menu>
  )
}
