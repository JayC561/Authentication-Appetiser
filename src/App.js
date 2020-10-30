import React,{useState, useEffect} from 'react';
import Signup from './Signup'
import Verify from './Verify';
import Login from './Login';
import Success from './Success';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const App = () =>{
  const [token, setToken] = useState('');
  useEffect(() =>{
    console.log(token);
  }, [token])
  return(
    <Switch>
      <Route exact path = "/">
        <Signup setAccessToken = {setToken}/>
      </Route>
      <Route path = "/login">
        <Login/>
      </Route>
      <Route path = "/verify">
        <Verify token = {token}/>
      </Route>
      <Route path = "/success">
        <Success/>
      </Route>
    </Switch>
  )
}

export default App;
