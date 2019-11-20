import React from 'react'
import { Segment, Comment, Message, MessageHeader } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';


class Messages extends React.Component
{
    render()
    {
        return(
            <div>
                <React.Fragment>
                    <MessagesHeader/>
                    <Segment>
                        <Comment.Group className="messages">

                        </Comment.Group>
                    </Segment>
                    <MessageForm />
                </React.Fragment>
            </div>
        );
    }
}

export default Messages;