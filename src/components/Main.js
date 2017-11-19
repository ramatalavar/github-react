import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import RepoList from './RepoList';
import UserDetails from './UserDetails';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/list' component={RepoList} />
          <Route path='/users/:name' component={UserDetails} />
        </Switch>
      </main>
    )
  }
};

export default Main;
