import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../actions/';

class Channels extends React.Component
{
    state = {
        user: this.props.currentUser,
        channels: [],
        modal: false,
        channelName: '',
        channelView: '',
        channelRef: firebase.database().ref('channels'),
        firstLoad: true,
        activeChannel: '',
        messageRef: firebase.database().ref('messages'),
        notifications: []
    }

    componentDidMount()
    {
        this.addListeners();
    }

    componentWillUnmount()
    {
        this.removeListeners();
    }

    closeModal = () => this.setState({ modal: false });

    openModal = () => this.setState({ modal: true });

    handleChange = event =>
    {
        this.setState({ [event.target.name]: event.target.value });
    };

    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item key={channel.id} onClick={() => this.changeChannel(channel)} name={channel.name} style={{ opacity: 0.7 }} active={channel.id === this.state.activeChannel}>
               #{channel.name} 
            </Menu.Item>
        ))
    )

    changeChannel = channel =>
    {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        this.setState({ channel });
        this.props.setPrivateChannel(false);
    }

    setActiveChannel = channel => 
    {
        this.setState({ activeChannel: channel.id })
    }

    addListeners = () =>
    {
        let loadedChannels = [];
        this.state.channelRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            //console.log(loadedChannels);
            this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
            
        })
    };

    removeListeners = () =>
    {
        this.state.channelRef.off();
    }

    handleSubmit = event =>
    {
        event.preventDefault();
        if (this.isFormValid(this.state))
        {
           
            this.addChannel();
        }
    };

    handleNotifications = (channelId, currentChannelId, notifications, snap) =>
    {
        let lastTotal = 0;
        let index = notifications.findIndex(notification => notification.id === channelId);
        if(index !== -1)
        {

        } else {
            notifications.push({
                id: channelId,
                total: snap.numChildren(),
            })
            

        }
    }

    addChannel = () =>
    {
        const { channelRef, channelName, channelView, user } = this.state
        const key = channelRef.push().key;
        const newChannel = {
            id: key,
            name: channelName,
            view: channelView,
            createdBy: {
                name: user.displayName  
            }
        }


        channelRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({channelName: '', channelView: ''})
                this.closeModal();
                console.log('Discussion ajoutée')
            })
            .catch(err => {
                console.error(err)
            })
    }

    setFirstChannel = () =>
        {
            const firstChannel = this.state.channels[0];
            if (this.state.firstLoad && this.state.channels.length > 0)
            {
                this.props.setCurrentChannel(firstChannel);
                this.setActiveChannel(firstChannel);
            }
            this.setState({ firstLoad: false })
        }

    isFormValid = ({ channelName, channelView }) => channelName && channelView;

    render()
    {
        const { channels, modal } = this.state;

        return(
            <div>
                <React.Fragment>
                <Menu.Menu className="menu">
                    <Menu.Item>
                        <span >
                            DISCUSSION
                        </span>
                        ({ channels.length }) <Icon className="add" name="add" onClick={this.openModal}/>
                    </Menu.Item>
                    {this.displayChannels(channels)}
                </Menu.Menu>
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Ajouter une discussion</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input fluid label="Nom de la discussion" name="channelName" onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Input fluid label="theme de la discussion" name="channelView" onChange={this.handleChange}/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark"/> Ajouter
                        </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove"/> Annuler
                        </Button>
                    </Modal.Actions>
                </Modal>
                </React.Fragment>
            </div>
        )
    }
}

export default connect(null, {setCurrentChannel, setPrivateChannel}) (Channels);