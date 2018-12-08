import React from 'react';
import PropTypes from 'prop-types';

const ContactComponent = props => {
  const { title } = props;
  return <h1>Contact Component! {title}</h1>;
};

ContactComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default ContactComponent;
