//https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions';
import Question from './Questions/Question';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Questions} />
        <Route exact path="/question/:questionId" component={Question} />
      </div>
    );
  }
}