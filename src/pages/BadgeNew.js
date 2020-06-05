import React, { Component, Fragment } from 'react';

import './styles/BadgeNew.css';
import header from '../images/badge-header.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';

class BadgeNew extends Component {
  state = {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    },
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <Fragment>
        <div className='BadgeNew__hero'>
          <div className='BadgeNew__container'>
            <img className='img-fluid BadgeNew_conf-logo' src={ header } alt='Logo' />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={ this.state.form.firstName }
                lastName={ this.state.form.lastName }
                jobTitle={ this.state.form.jobTitle }
                twitter={ this.state.form.twitter }
                email={ this.state.form.email }
                avatarUrl="https://2.gravatar.com/avatar/bfed63725b27aca51adf1f268754435f?s=400&d=mm"
              />
            </div>
            <div className='col-6'>
              <BadgeForm onChange={ this.handleChange } formValues={ this.state.form } />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BadgeNew;
