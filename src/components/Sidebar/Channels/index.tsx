import React, { useEffect, useState, useContext } from 'react';
import Channel from './Channel';
import ChannelsButton from './ChannelsButton';

import { getUserChannels, removeUserChannel } from '../../../utils';
import { LoginContext } from '../../../contexts';
import { IChannel } from '../../../interfaces';

export default function Sidebar() {
  const context = useContext(LoginContext);

  const [channels, setChannels] = useState<IChannel[]>([]);

  useEffect(() => {
    if (context.user) {
      setChannels(getUserChannels(context.user.address));

      const interval = setInterval(() => {
        setChannels(getUserChannels(context.user.address));
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [context.user]);

  const handleDeleteChannel = (channelId: string): void => {
    setChannels(channels.filter((channel: IChannel) => channelId !== channel.id));
    removeUserChannel(context.user.address, channelId);
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
                  {channels.map(channel => (
                    <Channel
                      key={channel.id}
                      channel={channel}
                      handleDeleteChannel={handleDeleteChannel}
                    />
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
