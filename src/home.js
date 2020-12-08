import logo from './logo.svg';
import './App.css';
import {Button, Fab, Paper, Card} from '@material-ui/core'
import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Time from './time';
import {observer} from 'mobx-react';
import { makeAutoObservable } from 'mobx';
class Counter{
  count=0
  constructor(){
    makeAutoObservable(this)
  }
  increase(){
    this.count+=1
  }
  decrease(){
    this.count-=1
  }
}

class Home extends React.Component{
  constructor(){
    super()
    this.mycount=new Counter()
    this.countview=observer(({c})=><Paper> Value: {c.count}</Paper>)
  }
  render(){
    
    
    return(<div>
      <Fab onClick={()=>this.mycount.increase()}>
        +
      </Fab>
      <Fab onClick={()=>this.mycount.decrease()}>
        -
      </Fab>
      <Card>
        <this.countview c={this.mycount}></this.countview>
      </Card>
      <div><Link to="/time">time</Link></div>

      
    </div>)
  }
}
export default Home;
