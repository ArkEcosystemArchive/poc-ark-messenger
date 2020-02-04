import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAddress, setChannelPassphrase } from '../../../utils';

export default function JoinChannel() {
  const [passphrase, setPassphrase] = useState<string>('');
  const [channelId, setChannelId] = useState<string>('');

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const id = getAddress(passphrase);

    setChannelPassphrase(id, passphrase);
    setChannelId(id);
  };

  return (
    <div className="text-center">
      <h1>Join Channel</h1>

      <p>
        Join a previously saved channel by selecting one in the menu to the left, or join a new one
        by entering the channel's passphrase below.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="password"
            className="form-control"
            placeholder="Passphrase"
            name="passphrase"
            value={passphrase}
            onChange={e => setPassphrase(e.target.value)}
            aria-label="passphrase"
            aria-describedby="passphrase"
          />
        </div>

        <button className="btn btn-secondary mt-3" id="join-button" type="submit">
          Join Channel <FontAwesomeIcon icon="angle-double-up" className="icon-shadow" />
        </button>
      </form>

      {channelId && <Redirect to={'/chat/' + channelId} />}
    </div>
  );
}
