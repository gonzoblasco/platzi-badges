import React, { Component, Fragment } from 'react';

import './styles/BadgeEdit.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeEdit extends Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(this.props.match.params.badgeId);

      this.setState({ loading: false, form: data });
    } catch ( error ) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({ loading: false });

      this.props.history.push('/badges');
    } catch ( error ) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if ( this.state.loading ) {
      return <PageLoading />;
    }
    return (
      <Fragment>
        <div className='BadgeEdit__hero'>
          <div className='BadgeEdit__container'>
            <img className='img-fluid BadgeEdit_conf-logo' src={ header } alt='Logo' />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={ this.state.form.firstName || 'First Name' }
                lastName={ this.state.form.lastName || 'Last Name' }
                jobTitle={ this.state.form.jobTitle || 'Job Title' }
                twitter={ this.state.form.twitter || 'Twitter Username' }
                email={ this.state.form.email || 'Email Address' }
                avatarUrl="https://2.gravatar.com/avatar/b0e83dd649a9a0789ca32589d38be1fe?s=400&d=mm"
              />
            </div>
            <div className='col-6'>
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={ this.handleChange }
                formValues={ this.state.form }
                onSubmit={ this.handleSubmit }
                error={ this.state.error }
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BadgeEdit;
