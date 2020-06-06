// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import BadgeDetails from './BadgeDetails';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';

import api from '../api';

export default class BadgeDetailsContainer extends Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: false,
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

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteBadge = async () => {
    this.setState(
      { loading: true, error: null },
    );

    try {
      await api.badges.remove(this.props.match.params.badgeId);
      this.setState({ loading: false });

      this.props.history.push('/badges');
    } catch ( error ) {
      this.setState(
        { loading: false, error: error },
      );
    }
  };

  render() {
    if ( this.state.loading ) {
      return <PageLoading />;
    }

    if ( this.state.error ) {
      return <PageError error={ this.state.error } />;
    }

    return (
      <BadgeDetails
        onCloseModal={ this.handleCloseModal }
        onDeleteBadge={ this.handleDeleteBadge }
        onOpenModal={ this.handleOpenModal }
        modalIsOpen={ this.state.modalIsOpen }
        badge={ this.state.data }
      />
    );
  }
}