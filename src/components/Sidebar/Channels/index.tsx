import React, { useEffect, useState } from 'react';
import Channel from './Channel';
import ChannelsButton from './ChannelsButton';

import { getUniqueChannels, removeChannelPassphrase } from '../../../utils';
import { LoginContext } from '../../../contexts';

export default function Sidebar() {
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    setChannels(getUniqueChannels());

    const interval = setInterval(() => {
      setChannels(getUniqueChannels());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDeleteChannel = (id: string): void => {
    setChannels(channels.filter((ch: string) => ch !== id));
    removeChannelPassphrase(id);
  };

  return (
    <div>
      <h5 className="text-center text-secondary mt-3">Channels</h5>

      <LoginContext.Consumer>
        {context => (
          <>
            {context.user ? (
              <>
                <div className="list-group list-group-flush">
                  {channels.map((id: string) => (
                    <Channel key={id} id={id} handleDeleteChannel={handleDeleteChannel} />
                  ))}

                  {!channels.length && <p className="text-muted text-center">No saved channels</p>}
                </div>
                <div className="text-center mt-3">
                  <ChannelsButton />
                </div>
              </>
            ) : (
              <p className="text-muted text-center">Not logged in</p>
            )}
          </>
        )}
      </LoginContext.Consumer>
    </div>
  );
}
