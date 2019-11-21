import  React from 'react';
import { Comment } from 'semantic-ui-react';
import moment  from 'moment';

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
    <Comment>
        <Comment.Content className={isOwnMessage(message, user)}>
            <Comment.Author as="a">
                {message.user.name}
            </Comment.Author>
            <Comment.Metadata>
                {timeFromNow(message.time)}
            </Comment.Metadata>
            <Comment.Text>
                {message.content}
            </Comment.Text>
        </Comment.Content>
    </Comment>
)

export default Message;