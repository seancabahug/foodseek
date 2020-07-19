import React from 'react';
import logo from './logo.svg';
import MapPage from './pages/MapPage';
import PersonCard from './components/PersonCard';
import APIUtil from "./utils/apiutil";
import Login from './pages/Login';
import Register from './pages/Register';
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from '@material-ui/core'
import MainApp from './MainApp';
import HomePage from './pages/HomePage';
import './App.css';

function AuthenticatedRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        ({location}) => APIUtil.isAuthenticated() ? children : (
          <Redirect to={{pathname: "/login", state: {from: location}}} />
        )
      }
    />
  )
}

function UnauthenticatedRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        ({location}) => !APIUtil.isAuthenticated() ? children : (
          <Redirect to={{pathname: "/app", state: {from: location}}} />
        )
      }
    />
  )
}

function App() {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/">
        <HomePage />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login">
        <Container maxWidth="sm" style={{height: "100vh"}} >
          <Login />
        </Container>
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/register">
        <Container maxWidth="sm" style={{height: "100vh"}} >
          <Register />
        </Container>
      </UnauthenticatedRoute>
      <AuthenticatedRoute path="/app">
        <MainApp />
      </AuthenticatedRoute>
    </Switch>
  );
}

export default App;
