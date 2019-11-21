import React from 'react';
import { Header, Segment} from 'semantic-ui-react';

class MessagesHeader extends React.Component
{
    render()
    {
        const { channelName } = this.props;
        return(
            <div>
                <Segment clearing>
                    <Header fluid="true" as="h2" floated="center" style={{ marginBottom: 0 }}>
                    <span>
                        {channelName}
                    </span>
                    </Header>
                </Segment>
            </div>
        );
    }
}

export default MessagesHeader;