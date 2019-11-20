import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import Messages from './components/Messages/Messages';
import "./App.css";
import ColorPanel from './components/ColorPanel/ColorPanel';
import MetaPanel from './components/MetaPanel/MetaPanel';
import SidePanel from './components/SidePanel/SidePanel';
import { connect } from 'react-redux';


const App = ({ currentUser }) =>
(
  <Grid columns="equal" className="app" style={{ background: '#eee' }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />
    <GridColumn style={{ marginLeft: 320 }}>
      <Messages />
    </GridColumn>
    <GridColumn width={4}>
      <MetaPanel />
    </GridColumn>
    
  </Grid>

)

const mapStateToProps = state =>
({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps) (App);