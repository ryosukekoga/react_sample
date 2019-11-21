import React from 'react';
import './App.css';
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";
import { firestore } from './plugins/firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      article: '',
      image: '',
      userId: '',
    }    
    this.getTitle = this.getTitle.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.addData = this.addData.bind(this);
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          userId: user.uid,
        });
      });
    }

  getTitle(event) {
    this.setState({
      title: event.target.value,
    });
  };

  getArticle(event) {
    this.setState({
      article: event.target.value,
    });
  };


  
 addData(){ 
    firestore.collection('users').add({
    title: this.state.title,
    article: this.state.article,
    created_at: new Date(),
    userId: this.state.userId,
    }).then(() => {
    this.setState({
      title: '',
      article: '',
    });
    alert("送信されました");
  })
  }



  render(){

    return(　　
        <div>
        <form>
        <TextField  label="タイトル" 
         value= {this.state.title} 
         onChange={(event)=>{this.getTitle(event)}}/> 
         <br/>

         <TextareaAutosize 
         aria-label="記事" 
         rows={8} 
         cols="100"
         placeholder="記事" 
         value= {this.state.article} 
         onChange={(event)=>{this.getArticle(event)}}
         />;
         <br/>

        <Button variant="contained" color="primary" onClick={this.addData}>登録</Button>
        </form>
        </div>
    );}  

}
export default Form;