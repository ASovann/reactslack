import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Login from'./components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { setUser } from './actions';

const store = createStore((rootReducer) => {})

class Root extends React.Component
{
    componentDidMount()
    {
        console.log(this.props.isLoading)
        firebase.auth().onAuthStateChanged(user =>     
        {
            if(user)
            {
                this.props.setUser(user);
                this.props.history.push('/');
            }
        })
    }

    render()
    {
        return (
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/login'component={Login}/>
                <Route exact path='/register' component={Register}/>
            </Switch>
        )
    }
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
});

const RootwithAuth = withRouter(connect(mapStateFromProps, { setUser })(Root));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootwithAuth/>
        </BrowserRouter>
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


