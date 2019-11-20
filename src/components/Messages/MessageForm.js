import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';

class MessageForm extends React.Component
{
    render()
    {
        return(
            <div>
                <Segment className="message__form">
                    <Input fluid name="message" style={{ marginBottom: '0.7em' }} label={<Button icon={'add'} />} labelPosition="left" placeholder="Ecrire...">
                    </Input>
                    
                    <Button color="orange" content="Repondre" />
                    
                </Segment>
            </div>
        );
    }
}

export default MessageForm;