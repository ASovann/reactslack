import React from "react";
import firebase from "../../firebase";
import { Grid, Form, Segment, Button, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
  };

  handleChange = event => 
  {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => 
  {
    event.preventDefault();
    if (this.isFormValid())
    {
      this.setState({errors: [], loading: true});
      firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(createdUser => {
              console.log(createdUser);
              createdUser.user.updateProfile({
                displayName: this.state.username
              })
              .then(() => {
                this.saveUser(createdUser).then(() => {
                  console.log('user saved');
                })
              })
              this.setState({loading: false});

          })
          
          .catch(err => {
              console.error(err);
              this.setState({errors: this.state.errors.concat(err), loading: false});
          });
    }
  }
  isFormValid = () => 
  {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state))
    {
        error = { message: 'Remplir tous les champs'};
        this.setState({errors: errors.concat(error)})
        return false;
    }
    else if (!this.isPasswordValid(this.state))
    {
      error = { message: 'Password invalide'};
      this.setState({errors: errors.concat(error)});
      return false;
    }
    else
    {
        return true
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation }) =>
  {
      return !username.length || !email.length || !password.length || ! passwordConfirmation.length;
  }

  isPasswordValid = ({ password, passwordConfirmation }) => 
  {
    if (password.length < 6 || passwordConfirmation.length < 6)
    {
      return false;
    }
    else if (password !== passwordConfirmation)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  showError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  saveUser = createdUser =>
  {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName
    })
  }

  render() 
  {
    

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="blue" textAlign="center">
            Register to React Chat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.username}
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password (6 characters min)"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                value={this.state.passwordConfirmation}
                type="password"
              />

              <Button disabled={this.state.loading} className={this.state.loading ? 'loading':''} color="blue" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Erreur</h3>
              {this.showError(this.state.errors)}
            </Message>
          )}
          <Message>
            Déjà utilisateur? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
