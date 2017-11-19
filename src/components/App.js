import React, { Component } from 'react';
import Main from './Main'
import Header from './Header';
import { Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Grid>
          <Main />
        </Grid>
      </div>
    );
  }
}

export default App;
