import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from'./components/Auth/Login';
import Register from './components/Auth/Register';

const Data =[
  {
    senderId: "Arthur",
    text: "aaaaa"
  },
  {
    senderId: "Jean",
    text: "bbbbb"
  }

]

// class App extends React.Component
// {
  
//   constructor()
//   {
//     super()
//     this.state = {
//       messages: Data
//     }
//   }
//   render()
//   {
//     return(
//       <div>
//           <Title/>
//           <MessageList messages={this.state.messages}/>
//           <MessageForm/>
//           <NavBar/>
//       </div>
//     );
//   } 
// }
const App = () => {
  return (
    // <div>
    //   <Title/>
      
    //   <MessageForm/>
    //   <NavBar/>
    // </div>
    <BrowserRouter>
      <Route exact path='/' component={Register} />
      <Route exact path='/login'component={Login}/>
      <Route exact path='/register' component={Register}/>
    </BrowserRouter>
    
  )
}

export default App;