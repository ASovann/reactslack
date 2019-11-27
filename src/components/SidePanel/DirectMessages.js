import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../../firebase';

class DirectMessages extends React.Component
{
    state = {
        user: this.props.currentUsers,
        users:[],
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('presence')
    }
    componentDidMount()
    {
        if(this.state.user)
        {
            this.addListeners(this.state.user.uid)
        }
    }

    addListeners = currentUserUid =>
    {
        let loadedUsers = [];
        this.state.usersRef.on('child_added', snap =>
        {
            if(currentUserUid !== snap.key)
            {
                let user = snap.val();
                user['uid'] = snap.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                this.setState({user: loadedUsers});
            }
        })
        this.state.connectedRef.on('value', snap =>
        {
            if(snap.val() === true)
            {
                const ref = this.state.presenceRef.child(currentUserUid);
                ref.set(true);
                ref.onDisconnect().remove(err =>
                    {
                        if(err !== null)
                        {
                            console.error(err)
                        }
                    }
                )
            }
        });

        this.state.presenceRef.on('child_removed', snap =>
        {
            if(currentUserUid !== snap.key)
            {

            }
        })
    }

    addStatusToUser = (userId, connected = true) =>
    {
        const updateUsers = this.state.users.reduce((acc, user) => {
            if(user.uid === userId)
            {
                user['status'] = `${connected ? 'online' : 'offline'}`;
            }
            return acc.concat(user);
        },[]);
        this.setState({users: updateUsers});
    }

    render()
    {
        return(
            <div>
                <Menu.Menu className="menu">
                    <Menu.Item>
                        <span>
                            <Icon name="mail"/> DIRECT MESSAGES
                        </span> {' '}
                        ({ this.state.users.length })
                    </Menu.Item>
                </Menu.Menu>
            </div>
        )
    }
}

export default DirectMessages;