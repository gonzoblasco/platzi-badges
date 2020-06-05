import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/Home.css';
import platziConfLogoImage from '../images/platziconf-logo.svg';
import astronautsImage from '../images/astronauts.svg';

export default class Home extends Component {
  render() {
    return (
      <div className='Home'>
        <div className="container">
          <div className="row">
            <div className="Home__col col-12 col-md-4">
              <img className="img-fluid mb-2" src={platziConfLogoImage} alt='Platzi Conf Logo' />
              <h1>Badge Management System</h1>
              <Link className='btn btn-primary' to='/badges'>Start</Link>
            </div>
            <div className="Home__col d-none d-md-block col-md-8">
              <img className="img-fluid p4" src={astronautsImage} alt='Astronauts '/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}