import logo from './logo.svg';
import './App.css';
import {Button, Fab} from '@material-ui/core'
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Link, Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router,browserHistory} from 'react-router-dom'

import Data from './data';
class currenttime{
  time=new Date().toUTCString()
  constructor() {
    makeAutoObservable(this)
  }
  update(){
    this.time=new Date().toUTCString()
  }
}
class Time extends React.Component{
  constructor(){
    super()
    setInterval(()=>{
      this.t.update()
    })
    this.t=new currenttime()
    this.showtime=observer(({t})=><div>{t.time}</div>)
  }
  render(){
    return(<div>
      <this.showtime t={this.t}></this.showtime>
      <div><Link to="/data">data</Link></div>
      <div><Link to="/home">home</Link></div>

      
    </div>)
  }
}
export default Time;
