import logo from './logo.svg';
import './App.css';
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Card, Paper, Grid } from '@material-ui/core';
import { Link, Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router,browserHistory} from 'react-router-dom'

import {toJS} from 'mobx';
import Currency from './currency';
class loading{
  loading=true
  data=null
  constructor(){
    makeAutoObservable(this)
  }
  hide(d){
    this.loading=false
    this.data=toJS(d);
  }
  updateData(d){
    console.log(toJS(this.data))
  }
}
class Data extends React.Component{
  constructor(){
    super()
    this.load=new loading()
    this.show=observer(({load})=>
      (load.data)?<div>{load.data.map(x=>{
        return(
          <Grid container>
          
          <Paper> 
            <div>{x.first+"   "}</div>
          </Paper>
          <Paper>
          <div>{x.last}</div>
          </Paper>
        </Grid>
        )
      })}</div>:null
    )
  this.loaddiv=observer(({l})=>
  <div>{l.loading?<div>Loading...</div>
  :
    <ul>
    {toJS(l.data)!==null?
      toJS(l.data).map(x=>{
        <li>
        <Card>
          asda
          <Paper>
            <div>{x.first}</div>
          </Paper>
          <Paper>
          <div>{x.last}</div>
          </Paper>
        </Card>
        </li>
      })
    :null
    }
    </ul>
    
    }
    </div>)

 
  this.loadrandomapi()
  }
  loadrandomapi(){
    fetch("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
    .then(function(response){
      return response.json();
    }).then(function(data){
      console.log(data)
      this.load.hide(data);
      
    }.bind(this)).catch(function(error){
      console.log(error)
    })
  }
  render(){
    return(
      <div>
      <div><Link to="/currency">currency</Link></div>
      <div><Link to="/time">time</Link></div>

        <Card>
        <this.loaddiv l={this.load}></this.loaddiv>
        <this.show load={this.load}></this.show>
        </Card>
        
      </div>
    )
  }
}
export default Data;