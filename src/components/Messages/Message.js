import  React from 'react';
import { Comment as Com} from 'semantic-ui-react';
import moment  from 'moment';
import  { Message as Mes} from 'semantic-ui-react'

const isOwnMessage = (message, user) =>
{
    return message.user.uid === user.uid ? 'message__self' : '';
}

const timeFromNow = time =>
{
    moment(time).fromNow();
}

const Message = ({ message, user}) =>
(
    
    <Com>
        <Com.Content className={isOwnMessage(message, user)}>
            <Com.Author as="a" style={{ color: 'red'}}>
                {message.user.name}
            </Com.Author>
            <Com.Metadata>
                {timeFromNow(message.time)}
            </Com.Metadata>
            <Com.Text>
                {message.content}
            </Com.Text>
        </Com.Content>
    </Com>
)

export default Message;