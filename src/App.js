import React from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {  BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Form from './Form';
import Show from './Show';
import Mypage from './Mypage';
import Authentication from './Authentication';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: '',
      image: '',
      user: null,
    }    
    this.logOut = this.logOut.bind(this);
   }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
      });
    });
  }

  logOut(){
      firebase.auth().signOut();
  }



  render(){
    let successfulUser;


  if(this.state.user){
    successfulUser=(
    <div>
      <Router>
        <AppBar position="static">
        　<Toolbar>
        　　<Link to="/"><Typography variant="h6" style={{color:'white', padding:'5px'}}>マイページ</Typography></Link>
        　　<Link to="/form"><Typography variant="h6" style={{color:'white', padding:'5px'}}>投稿フォーム</Typography></Link>
        　　<Link to="/show"><Typography variant="h6" style={{color:'white', padding:'5px'}}>投稿一覧</Typography></Link>
        　　<Button variant="contained" color="secondary" onClick={this.logOut} style={{color:'white', padding:'10px'}}>ログアウト</Button> 
        　</Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">     
           <Mypage/>     
          </Route>

          <Route path="/form">
           <Form />
          </Route> 

          <Route path ="/show">
           <Show />
          </Route>
        </Switch>
      </Router>
     </div>
    );
    }else{
      successfulUser=(
      <Authentication/>
      );
    }
    
     return(
      <div>
       {successfulUser}
      </div>      
    );
  }
}
export default App;