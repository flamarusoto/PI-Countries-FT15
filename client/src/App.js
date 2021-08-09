import './App.css';
import React from 'react';

import Landing from './Components/Landing';
import Home from './Components/Home';
import CardDetail from './Components/CardDetail';
import Form from './Components/Form';

import { Route } from 'react-router-dom';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Route exact path='/' component={Landing} />
      <Route exact path='/countries' component={Home} />
      <Route exact path='/countries/:id' component={CardDetail} />
      <Route exact path='/addActivity' component={Form} />
    </Fragment>
  );
}

export default App;
