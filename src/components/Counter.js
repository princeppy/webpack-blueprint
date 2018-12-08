/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
// import PropTypes from 'prop-types';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { value: 0 };
    this.increase();
  }

  increase() {
    this.setState({ value: this.state.value + 1 });
    setTimeout(this.increase.bind(this), 1000);
  }

  render() {
    return <h1>{this.state.value}</h1>;
  }
}

// Counter.prototype={
//     PropTypes
// }

export default Counter;
