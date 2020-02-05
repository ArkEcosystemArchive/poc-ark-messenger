import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoginContext } from '../../../../contexts';

import { IContext } from '../../../../interfaces';

export default function LogOutButton() {
  const context: IContext = useContext(LoginContext);

  const logOut = () => {
    localStorage.removeItem('passphrase');

    context.update(null);
    context.toggled(false);
  };

  return (
    <button className="btn btn-sm btn-primary d-inline-block" onClick={logOut}>
      Log Out <FontAwesomeIcon icon="sign-out-alt" className="icon-shadow" />
    </button>
  );
}
