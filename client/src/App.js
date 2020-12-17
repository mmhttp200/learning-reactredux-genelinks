import logo from './logo.svg';
import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';

const Home = React.lazy(()=>import('./Pages/Home'));
const Login = React.lazy(()=>import('./Pages/Login'));
const Register = React.lazy(()=>import('./Pages/Register'));
const Logout = React.lazy(()=>import('./Pages/Logout'));
const MyProfile = React.lazy(()=>import('./Pages/MyProfile'));
const EditAccount = React.lazy(()=>import('./Pages/EditAccount'));
const AnotherProfile = React.lazy(()=>import('./Pages/AnotherProfile'));
const NoMatch = React.lazy(()=>import('./Pages/NoMatch'));

function App() {

  const dispatch = useDispatch();
  const session_start = (data)=>dispatch({type: "SESSION_START", data});
  const session_end = ()=>dispatch({type: "SESSION_CLOSE"});

  const isLoggedIn = useSelector((state)=>state.session.isLoggedIn);


  useEffect(async ()=>{

    if(sessionStorage.getItem('token')){

      const result = await axios.post('/api/account/account-information', {}, {headers: {'Content-Type': 'application/json', 'token': sessionStorage.getItem('token')}})
      .then(data=>data)
      .catch((err)=>console.log(err));

      await session_start(await result.data);
    }else{
      session_end();
    }

  });

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/my-profile" />: <Home />}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/my-profile" />: <Login />}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/my-profile" />: <Register />}
        </Route>
        <Route exact path="/logout">
          {isLoggedIn ? <Logout /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/my-profile">
          {isLoggedIn ? <MyProfile /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/edit-account">
          {isLoggedIn ? <EditAccount /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/profile/:nanoid">
          <AnotherProfile />
        </Route>
        <Route exact path="*">
          <NoMatch />
        </Route>
      </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
