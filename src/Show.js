import React from 'react';
import './App.css';
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";
import { firestore } from './plugins/firebase';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {  BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Checkbox } from '@material-ui/core';





class Show extends React.Component {
    constructor(props){
      super(props);    
      this.state = {
        title: '',
        article: '',
        articles: [],
      }
      this.getUsersData = this.getUsersData.bind(this);
      this.deleteData = this.deleteData.bind(this);
    }


    componentDidMount(){
      this.getUsersData();     
    }

    getUsersData() {
      firestore.collection('users')
      .orderBy('created_at')
      .get()
      .then(snapShot => {
        let articles = [];
        snapShot.forEach(doc => {
          articles.push({
            Title: doc.data().title,
            Article: doc.data().article,
            id: doc.id,
          });
        });
        this.setState({
          articles: articles
        });
      });}


      deleteData(event){        
        firestore.collection('users')
          .doc(event.target.name)
          .delete()
          .then(() => {
            this.getUsersData()
          });
      };

      

      render(){

        return(
          <div>    
            {this.state.articles.map(article => {
              return (   
                <List key={article.id}> 
                <ListSubheader>title:{article.Title}</ListSubheader>
                 <ListItem>{article.Article.slice(0,20)+"..."}</ListItem>
                 <Checkbox onClick={this.deleteData}　name={article.id}/>
                </List>
         
                );})}
        </div>
        );}
}              

export default Show;