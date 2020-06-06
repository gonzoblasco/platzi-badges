import React from 'react';
import md5 from 'md5';

export default (props) => {
  const email = props.email;
  const hash = md5(email);

  return (
    <img
      className={props.className}
      src={`https://2.gravatar.com/avatar/${hash}?s=400&d=mm`}
      alt="Avatar"
    />
  );
}