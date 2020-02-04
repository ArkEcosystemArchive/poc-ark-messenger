import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ChannelsButton() {
  return (
    <Link to="/channels" className="btn btn-sm  btn-primary">
      Join / Create <FontAwesomeIcon icon="sign-in-alt" className="icon-shadow" />
    </Link>
  );
}
