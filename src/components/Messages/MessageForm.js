import React from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: []
  };

  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = () => {
    const message = {
      time: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
      },
      content: this.state.message
    };
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Ajouter un message" })
      });
    }
  };

  render() {
    const { errors, message, loading } = this.state;

    return (
      <Segment className="message__form">
        <Input fluid name="message" onChange={this.handleChange} value={message} style={{ marginBottom: "0.7em" }} className={errors.some(error => error.message.includes("message")) ? "error" : ''}placeholder="Ecrivez..."/>
          <Button onClick={this.sendMessage} disabled={loading} color="grey" content="Repondre"/>
      </Segment>
    );
  }
}

export default MessageForm;