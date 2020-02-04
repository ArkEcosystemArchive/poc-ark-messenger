import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HomeButton() {
  return (
    <Link to="/" className="btn btn-sm btn-primary mr-3">
      Home <FontAwesomeIcon icon="home" className="icon-shadow" />
    </Link>
  );
}
