// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgeDetails.css';
import confLogo from '../images/platziconf-logo.svg';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from '../api';
import Badge from '../components/Badge';

export default class BadgeDetails extends Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(
        this.props.match.params.badgeId,
      );
      this.setState({ loading: false, data: data });
    } catch ( error ) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if ( this.state.loading ) {
      return <PageLoading />;
    }

    if ( this.state.error ) {
      return <PageError error={ this.state.error } />;
    }

    const badge = this.state.data;

    return (
      <>
        <div className='BadgeDetails__hero'>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img src={ confLogo } alt='Logo de la Conferencia' />
              </div>
              <div className="col-6 BadgeDetails__hero-attendant-name">
                <h1>{ badge.firstName } { badge.lastName }</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Badge
                firstName={ badge.firstName }
                lastName={ badge.lastName }
                email={ badge.email }
                twitter={ badge.twitter }
                jobTitle={ badge.jobTitle }
              />
            </div>
            <div className="col">
              <h2>Actions</h2>
              <div>
                <div>
                  <Link to={ `/badges/${ badge.id }/edit`} className='btn btn-primary mb-4'>Edit</Link>
                </div>
                <div>
                  <button className='btn btn-danger'>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}