import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Card, Button } from '@material-ui/core';
import { makeAutoObservable } from 'mobx';
import {toJS} from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

class convert{
  from="XCD"
  to="INR"
  value=0
  cvalue=0
  constructor(){
    makeAutoObservable(this)
  }
  setFrom(e){
    this.from=e.target.value
    console.log(e.target.value)
  }
  setTo(e){
    this.to=e.target.value
    console.log(e.target.value)
  }
  setValue(e){
    this.value=e.target.value
  }
  setCV(e){
    this.cvalue=e
  }
}
class Currency extends React.Component{
  constructor(){
    super()
    this.change=new convert()
    this.showcv=observer(({d})=><div>{d.cvalue}</div>)
    this.currencies=[{"currency":"XCD","name":"East Caribbean dollar","symbol":"$"},{"currency":"EUR","name":"European euro","symbol":"€"},{"currency":"GEL","name":"Georgian lari","symbol":"₾"},{"currency":"XCD","name":"East Caribbean dollar","symbol":"$"},{"currency":"HTG","name":"Haitian gourde","symbol":"G"},{"currency":"INR","name":"Indian rupee","symbol":"₹"},{"currency":"ILS","name":"Israeli new sheqel","symbol":"₪"},{"currency":"KZT","name":"Kazakhstani tenge","symbol":"лв"},
    {"currency":"KWD","name":"Kuwaiti dinar","symbol":"د.ك"},{"currency":"LSL","name":"Lesotho loti","symbol":"L"},
    { "currency": "INR", "name": "Indian rupee", "symbol": "₹" },{"currency":"USD","name":"U.S. Dollar","symbol":"$"}]
  }
  getResult(){
    var param=toJS(this.change.from)+"_"+toJS(this.change.to)
    fetch( "https://free.currconv.com/api/v7/convert?q="+param+"&compact=ultra&apiKey=dd8e835c3d0a875afe5e")
    .then(function(response){
      return(response.json())
    }).then(function(data){
      var s=(data[param])
      this.change.setCV(this.change.value*s)
      
    }.bind(this))
  }
  render(){
    return(
      <div>
        <Card>
          From
        <select onChange={(e)=>this.change.setFrom(e)}>
          {this.currencies.map(x=>{
            return(
            <option value={x.currency}>{x.name}</option>
            )
          })}
        </select>
        </Card>
        <Card>
          To
        <select onChange={(e)=>this.change.setTo(e)}>
          {this.currencies.map(x=>{
            return(
            <option value={x.currency}>{x.name}</option>
            )
          })}
        </select>
        </Card>
        <input type="number" onChange={(e)=>this.change.setValue(e)}>
        </input>
        <Button onClick={()=>this.getResult()}>
          Convert
        </Button>
        <Card>
          Converted Value
          <this.showcv d={this.change}></this.showcv>
        </Card>
        <div><Link to="/home">home</Link></div>
      <div><Link to="/data">data</Link></div>

      </div>
      
    )
  }
}
export default Currency;
