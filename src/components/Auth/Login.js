import React from "react";
import firebase from "../../firebase";
import { Grid, Form, Segment, Button, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  };

  handleChange = event => 
  {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => 
  {
    event.preventDefault();
    if (this.isFormValid(this.state))
    {
      this.setState({errors: [], loading: true});
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signInUser => 
        {
            console.log(signInUser);
        })
        .catch(err => {
            console.error(err);
            this.setState({
                errors: this.state.errors.concat(err),
                loading: false
            });
        });
    }
  }

  isFormValid = ({ email, password }) => 
  {
      return email && password;
  }

  showError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  render() 
  {
    

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="red" textAlign="center">
            Login to React Chat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>

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

              <Button disabled={this.state.loading} className={this.state.loading ? 'loading':''}color="red" fluid size="large">
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
            Pas de compte ? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
