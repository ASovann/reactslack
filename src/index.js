import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./Spinner";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import rootReducer from "./reducers";
import { setUser } from "./actions";

const store = createStore(rootReducer);

class Root extends React.Component {
    
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(mapStateFromProps, { setUser })(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
