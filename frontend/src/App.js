import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions';
import Question from './Questions/Question';
import Callback from './Callback';
import NewQuestion from './Questions/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Questions} />
        <Route exact path="/question/:questionId" component={Question} />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute path="/new-question" component={NewQuestion} />
      </div>
    );
  }
}
export default App;