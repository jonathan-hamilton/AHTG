import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Grid, Header, Icon, Segment } from 'semantic-ui-react'

export default function NotFound() {
  return (
    <Grid>
        <Grid.Column width={14}>
            {/* <Segment textAlign='center' className='not-found'> */}
            <Segment textAlign='center' className='not-found'>
                <Container>
                <Header icon>
                    <Icon name='search' />
                    Oops, we've looked everywhere and could not find the requested page.
                </Header>
                <Segment.Inline>
                    <Button as={Link} to='/hospitals' primary>
                        Return to the Hospitals page
                    </Button>
                </Segment.Inline>
                </Container>        
            </Segment>
        </Grid.Column>
    </Grid>
  )
}
