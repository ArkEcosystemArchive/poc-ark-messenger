import React from 'react';
import JoinChannel from './JoinChannel';
import CreateChannel from './CreateChannel';

export default function Channels() {
  return (
    <div className="content-window p-5 shadow">
      <JoinChannel />

      <hr className="my-5" />

      <CreateChannel />
    </div>
  );
}
