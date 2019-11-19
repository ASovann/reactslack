import React, {Component} from 'react'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';

class Register extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }

    render()
    {
        return(
            <div>
                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }} >
                        <Header as="h2" icon color="orange" textAlign="center">
                            
                            Register
                        </Header>
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input fluid className="username" icon="user" iconPosition="left"></Form.Input> 
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
    
}

export default Register;