import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgesList.css';
import Gravatar from './Gravatar';

const BadgesListItem = ({ badge }) => (
  <div className='BadgesListItem'>
    <Gravatar className="BadgesListItem__avatar" email={ badge.email } />
    <div>
      <strong>
        { badge.firstName } { badge.lastName }
      </strong>
      <br />@{ badge.twitter }
      <br />
      { badge.jobTitle }
    </div>
  </div>
);

const useSearchBadges = (badges) => {
  const [ query, setQuery ] = useState('');
  const [ filteredBadges, setFilteredBadges ] = useState(badges);

  useMemo(() => {
    const result = badges.filter(badge => {
      return `${ badge.firstName } ${ badge.lastName }`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(result);
  }, [ badges, query ]);

  return { query, setQuery, filteredBadges };
};

const BadgesList = (props) => {
  const { badges } = props;
  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  if ( filteredBadges.length === 0 ) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={ query }
            onChange={ e => {
              setQuery(e.target.value);
            } }
          />
        </div>
        <h3>No badges were found</h3>
        <Link to='/badges/new' className='btn btn-primary'>
          Create new badge
        </Link>
      </div>
    );
  }
  return (
    <div className='BadgesList'>
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type='text'
          className='form-control'
          value={ query }
          onChange={ (e) => {
            setQuery(e.target.value);
          } }
        />
      </div>

      <ul className="list-unstyled">
        { filteredBadges.map(badge => {
          return (
            <li key={ badge.id }>
              <Link className='text-reset text-decoration-none' to={ `/badges/${ badge.id }` }>
                <BadgesListItem badge={ badge } />
              </Link>
            </li>
          );
        }) }
      </ul>
    </div>
  );
};

export default BadgesList;