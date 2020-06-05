import React, { Fragment } from 'react';
import Navbar from './Navbar';

export default (props) => {
  return (
    <Fragment>
      <Navbar />
      { props.children }
    </Fragment>
  );
}