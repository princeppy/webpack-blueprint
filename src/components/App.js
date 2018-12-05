import React, { Component } from 'react';
import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './App.scss';

// home route Functional component
const HomeComponent = props => {
  return <h1>Home Component!</h1>;
};

// about route Functional component
const AboutComponent = props => {
  return <h1>About Component!</h1>;
};

// contact route Functional component
const ContactComponent = props => {
  return <h1>Contact Component!</h1>;
};

// Functional component
const InputChild = props => {
  const { title } = props;
  return <div>Prince {title}</div>;
};
InputChild.propTypes = {
  title: PropTypes.string.isRequired
};

// Class component
class App extends Component {
  constructor(props) {
    super(props);
  }

  // render() {
  //     const { title } = this.props;
  //     return (
  //         <div>
  //             <h1 className={style.hh1}>{title}</h1>
  //             <InputChild title="Awsomw" />
  //         </div>
  //     );
  // }
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="menu">
            <Link exact to="/" activeClassName="active">
              Home
            </Link>
            <Link to="/about" activeClassName="active">
              About
            </Link>
            <Link to="/contact" activeClassName="active">
              Contact
            </Link>
          </div>

          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/about" component={AboutComponent} />
            <Route path="/contact" component={ContactComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
};

export { App };
