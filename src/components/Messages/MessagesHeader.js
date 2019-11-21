import React from 'react';
import { Header, Segment} from 'semantic-ui-react';

class MessagesHeader extends React.Component
{
    render()
    {
        return(
            <div>
                <Segment clearing>
                    <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                    Discussion
                    </span>
                    <Header.Subheader> 2 users</Header.Subheader>
                    </Header>
                   
                    

                </Segment>
            </div>
        );
    }
}

export default MessagesHeader;