import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/platziconf-logo.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';

import api from '../api';

export default class Badges extends Component {
  state = {
    data: undefined,
    error: null,
    loading: true,
  };

  componentDidMount() {
    this.fetchData();

    this.intervalId = setInterval(this.fetchData, 5000);
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.list();

      this.setState({ loading: false, data: data });
    } catch ( error ) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if ( this.state.loading === true && !this.state.data ) {
      return <PageLoading />;
    }

    if ( this.state.error ) {
      return <PageError error={ this.state.error } />;
    }

    return (
      <Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img className="Badges_conf-logo" src={ confLogo } alt='Logo' />
            </div>
          </div>

          <div className="Badges__container">
            <div className="Badges__buttons">
              <Link to='/badges/new' className='btn btn-primary'>
                New Badge
              </Link>
            </div>
            <div className="Badges__list">
              <BadgesList badges={ this.state.data } />
              { this.state.loading && <MiniLoader /> }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}