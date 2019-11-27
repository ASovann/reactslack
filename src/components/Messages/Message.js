import  React from 'react';
import { Comment as Com, Button, Icon} from 'semantic-ui-react';
import moment  from 'moment';
import firebase from 'firebase';


const isOwnMessage = (message, user) =>
{
    return message.user.uid === user.uid ? 'message__self' : '';
}

const timeFromNow = time =>
{
    moment(time).fromNow();
}

const deleteMessage = (message, user) =>
{

    firebase.database().ref('messages').on('value', snap =>
    {
        if(message.user.uid === user.uid)
        {
            firebase.database().ref('messages').child(snap.key).remove()
        }
    })
    
}
const Message = ({ message, user}) =>
(
    
    <Com>
        <Com.Content className={isOwnMessage(message, user)}>
            <Com.Author as="a" style={{ color: 'red'}}>
                {message.user.name}
                <Icon name="minus" onClick={() => deleteMessage(message, user)}/>
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