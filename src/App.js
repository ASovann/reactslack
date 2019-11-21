import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import Messages from './components/Messages/Messages';
import "./App.css";
import SidePanel from './components/SidePanel/SidePanel';
import { connect } from 'react-redux';


const App = ({ currentUser, currentChannel }) =>
(
  <Grid columns="equal" className="app" style={{ background: '#eee' }}>
    
    <SidePanel key= {currentUser && currentUser.uid} currentUser={currentUser} />
    <GridColumn style={{ marginLeft: 320 }}>
      <Messages key={currentChannel && currentChannel.id}  currentChannel={currentChannel} currentUser={currentUser}/>
    </GridColumn>
    <GridColumn width={4}>
    </GridColumn>
    
  </Grid>

)

const mapStateToProps = state =>
({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps) (App);