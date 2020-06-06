import React from 'react';

import './styles/Badge.css';
import confLogo from '../images/badge-header.svg';
import Gravatar from './Gravatar';

class Badge extends React.Component {
  render() {
    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={ confLogo } alt="Logo de la conferencia" />
        </div>

        <div className="Badge__section-name">
          <Gravatar
            className='Badge__avatar'
            email={ this.props.email }
          />
          <h3>
            { this.props.firstName } <br /> { this.props.lastName }
          </h3>
        </div>

        <div className="Badge__section-info">
          <h4>{ this.props.jobTitle }</h4>
          <div>@{ this.props.twitter }</div>
        </div>

        <div className="Badge__footer">#platziconf</div>
      </div>
    );
  }
}

export default Badge;
