import React from 'react';
import UserInfo from './UserInfo';
import Channels from './Channels';

import logo from '../../assets/images/logo.png';

export default function Sidebar() {
  return (
    <div className="bg-light border-right shadow-sm sidebar-wrapper pt-4" id="sidebar-wrapper">
      <div className="text-center">
        <h5 className="text-secondary mb-0">
          ARK Messenger{' '}
          <img className="logo-small scale-up pointer" src={logo} alt="Back to home" />
        </h5>
      </div>

      <UserInfo />

      <hr />

      <Channels />
    </div>
  );
}
