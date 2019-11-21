import React from 'react'
import { Segment, Comment} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import firebase from '../../firebase';
import Message from './Message';


class Messages extends React.Component
{
    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        messages: [],
        messagesLoading: true
        
    }

    componentDidMount()
  {
    const {channel, user} = this.state;
    if(channel && user)
    {
      this.addListerners(channel.id);

    }
  }

  addListerners = channelId =>
  {
    this.addMessageListener(channelId);
  }

  displayMessages = messages => (
      messages.length > 0 && messages.map(message => (
          <Message key={message.time} message={message} user={this.state.user}/>

      ))
  )

  addMessageListener = channelId =>
  {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap =>
    {
      loadedMessages.push(snap.val());
      //console.log(loadedMessages);
      this.setState({
          messages: loadedMessages,
          messagesLoading: false
      });
    });
  }

    render()
    {
        const { messagesRef, channel, messages, user } = this.state;
        return(
            <div>
                <React.Fragment>
                    <MessagesHeader/>
                    <Segment>
                        <Comment.Group className="messages">
                            {this.displayMessages(messages)}
                        </Comment.Group>
                    </Segment>
                    <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={user}/>
                </React.Fragment>
            </div>
        );
    }
}

export default Messages;