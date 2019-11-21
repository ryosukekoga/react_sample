import React from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firestore } from './plugins/firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


class Mypage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: '',
      image: '',
      userId:'',
    }    
    this.getName = this.getName.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getImage = this.getImage.bind(this);
    this.addData = this.addData.bind(this);
    }

  componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          userId: user.uid,
        });
      });
    }

  getName(event) {
    this.setState({
      name: event.target.value,
    });
  };

  getAddress(event) {
    this.setState({
      address: event.target.value,
    });
  };

  getImage(event){
    let image = event.target.files[0];
    this.setState({
      image: image,
    });
  }

  
  addData(){ 
    firestore.collection(this.state.userId).add({
    name: this.state.name,
    address: this.state.address,
    created_at: new Date(),
    userId: this.state.userId,
    }).then(() => {
    this.setState({
      name: '',
      address: '',
    });
  })
   let storageRef = firebase.storage().ref().child(this.state.userId+`.png`);
   storageRef.put(this.state.image)
   .then(function(snapshot) {
    alert("送信されました");
   });
  }



  render(){

    return(　　
        <div>
        <form>
        <TextField  label="名前" 
         value= {this.state.name} 
         onChange={(event)=>{this.getName(event)}}/> 
         <br/>

         <TextareaAutosize 
         aria-label="住所" 
         rowsMax={4} 
         placeholder="住所" 
         value= {this.state.address} 
         onChange={(event)=>{this.getAddress(event)}}
         />;
         <br/>

         <input type = "file" 
         onChange={(event)=>{this.getImage(event)}}>
         </input>
         <br/>

        <Button variant="contained" color="primary" onClick={this.addData}>編集する</Button>
        </form>
        </div>
    );}  

}
export default Mypage;