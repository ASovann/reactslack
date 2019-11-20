import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';

class MessageForm extends React.Component
{
    render()
    {
        return(
            <div>
                <Segment className="message__form">
                    <Input fluid name="message" style={{ marginBottom: '0.7em' }} labelPosition="left" placeholder="Ecrire...">
                    </Input>
                    
                    <Button color="grey" content="Repondre" />
                    
                </Segment>
            </div>
        );
    }
}

export default MessageForm;