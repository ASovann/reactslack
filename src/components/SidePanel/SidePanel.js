import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channel';

class SidePanel extends React.Component
{
    render()
    {
        const { currentUser } = this.props;
        return(
            <Menu size="large" inverted fixed="left" vertical style={{ background: '#3398FF', fontSize: '1.2rem' }}>
                <UserPanel currentUser={currentUser} />
                <Channels currentUser={currentUser}/>
            </Menu>
        )
    }
}

export default SidePanel;