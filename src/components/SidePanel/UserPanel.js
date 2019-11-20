import React from 'react';
import  { Grid, Header, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';

class UserPanel extends React.Component
{
    state =
    {
        user: this.props.currentUser
    }


    componentDidMount()
    {
        this.setState({user: this.props.currentUser})
    }

    dropdownOptions = () =>
    [
        {
            key:"user",
        text: <span>Connecté en tant que <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Déconnexion</span>
        }
    ]

    handleSignout = () =>
    {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('déconnecter'))

    }


    render()
    {
        //console.log(this.props.currentUser);

        return(
            <Grid style={{ background: '#3398FF'}}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        <Header inverted floated="left" as="h2">
                            
                            <Header.Content>
                                React Chat
                            </Header.Content>
                        </Header>
                    </Grid.Row>
                    <Header style={{ padding: '0.25em' }} as ="h4" inverted>
                        <Dropdown trigger={<span>{this.state.user.displayName}</span>} options={this.dropdownOptions()} />
                        
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}


export default UserPanel;