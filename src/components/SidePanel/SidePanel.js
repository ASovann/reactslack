import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channel';
import DirectMessages from './DirectMessages';

class SidePanel extends React.Component
{
    render()
    {
        const { currentUser } = this.props;
        return(
            <Menu size="large" inverted fixed="left" vertical style={{ background: '#3398FF', fontSize: '1.5rem' }}>
                <UserPanel currentUser={currentUser} />
                <Channels currentUser={currentUser}/>
                <DirectMessages />
            </Menu>
        )
    }
}

export default SidePanel;