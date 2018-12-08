/* eslint-disable no-unused-vars */

'use strict';

import React, { Component } from 'react';
import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import loadable from 'react-loadable';
import PropTypes from 'prop-types';
import style from './App.scss';

// loading component
const LoadingComponent = () => <h3>please wait...</h3>;

const BasicLoading = () => <div> Loading... </div>;

const Loading = props => {
  const { error, timedOut, pastDelay, delay, timeout } = props;

  if (error) {
    return <div> Error!! </div>;
  }
  if (timedOut) {
    return (
      <div>
        <h3>Taking a long time... please wait</h3>
        <h5> timeout set to {timeout} </h5>
      </div>
    );
  }
  if (pastDelay) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Pre Loading....</h1>
      <h5> delay set to {delay} </h5>
    </div>
  );
};

// Specifies the default values for props:
Loading.defaultProps = {
  error: null,
  timeout: 4000,
  delay: 2000,
  timedOut: false,
  pastDelay: false
};

Loading.propTypes = {
  timeout: PropTypes.number,
  delay: PropTypes.number,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.string
};

// async home component;
const AsyncHomeComponent = loadable({
  loader: () => import('./HomeComponent'),
  loading: LoadingComponent
});

// async about component
const AsyncAboutComponent = loadable({
  loader: () => import('./AboutComponent'),
  loading: LoadingComponent
});

// async contact component
const AsyncContactComponent = loadable({
  // loading: BasicLoading,
  loading: Loading,
  // loader: () => import('./Counter'),
  loader: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(import('./Counter'));
      }, 10000);
    }),
  // 10 seconds
  delay: 3000,
  // 10 seconds
  timeout: 5000
});

// Functional component
const InputChild = props => {
  const { title } = props;
  return <div>Prince {title}</div>;
};
InputChild.propTypes = {
  title: PropTypes.string.isRequired
};

// Class component
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className='menu'>
            <Link exact to='/' activeClassName='active'>
              Home
            </Link>
            <Link to='/about' activeClassName='active'>
              About
            </Link>
            <Link to='/contact' activeClassName='active'>
              Contact
            </Link>
          </div>

          <Switch>
            <Route exact path='/' component={AsyncHomeComponent} />
            <Route path='/about' component={AsyncAboutComponent} />
            {/* <Route path='/contact' component={AsyncContactComponent} /> */}
            {/* <Route path='/contact' render={props => <ContactComponent {...props} value='1' />} /> */}
            <Route path='/contact' render={props => <AsyncContactComponent title='w' {...props} value='1' />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
};

console.log('console.log');

export default App;
