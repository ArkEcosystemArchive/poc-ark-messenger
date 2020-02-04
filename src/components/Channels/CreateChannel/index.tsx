import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipboard from '../../Generic/CopyToClipboard';

import { generateRandomAccount, setChannelPassphrase } from '../../../utils';
import { IAccount } from '../../../interfaces';

export default function CreateChannel() {
  const [channel, setChannel] = useState<IAccount | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const createChannel = (): void => {
    const channel: IAccount = generateRandomAccount();
    setChannel(channel);
  };

  const joinChannel = (): void => {
    if (!channel) {
      return;
    }

    setChannelPassphrase(channel.address, channel.passphrase);

    if (window.confirm("Have you safely stored the channel's passphrase?")) {
      setConfirmed(true);
    }
  };

  return (
    <div className="w-100 text-center" id="create">
      <h1>Create Channel</h1>

      <p>Create a new channel by clicking on the button.</p>

      {!channel ? (
        <button className="btn btn-secondary" id="create-button" onClick={createChannel}>
          Create Channel <FontAwesomeIcon icon="plus" className="icon-shadow" />
        </button>
      ) : (
        <>
          <div className="card mb-3">
            <div className="card-body animated flash">
              <div className="mb-3">
                <span className="text-muted">Channel ID:</span>
                <br />
                <span className="alt-font text-1_5x">{channel.address}</span>
              </div>

              <div>
                <span className="text-muted mt-3">
                  Passphrase <CopyToClipboard data={channel.passphrase} />
                </span>
                <br />
                <span className="alt-font text-1_5x">{channel.passphrase}</span>
              </div>
            </div>
          </div>

          <p>You can share the passphrase to let other people join the channel.</p>

          <button className="btn btn-secondary mt-3" id="join-button-2" onClick={joinChannel}>
            Join Channel <FontAwesomeIcon icon="angle-double-up" className="icon-shadow" />
          </button>
        </>
      )}

      {confirmed && channel && <Redirect to={'/chat/' + channel.address} />}
    </div>
  );
}
