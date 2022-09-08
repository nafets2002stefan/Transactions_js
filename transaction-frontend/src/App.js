import React, { Component } from 'react';
import Transactions from './components/transactions';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <React.Fragment>
        <main className='container'>
          <Switch>
            <Route path='/api/transactions' component={Transactions}/>
            <Redirect from='/' to='/api/transactions' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
