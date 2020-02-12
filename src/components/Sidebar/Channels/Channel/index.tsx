import React, { useEffect, useState, useContext } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipboard from '../../../Generic/CopyToClipboard';

import {
  getLastMessage,
  decryptMessage,
  retrieveUsername,
  truncateChannel,
  truncateMessage,
  setChannelAlias
} from '../../../../utils';

import { LoginContext } from '../../../../contexts';
import { IMessage, IChannel } from '../../../../interfaces';

type IProps = {
  channel: IChannel;
  handleDeleteChannel: (id: string) => void;
};

export default function Channel({ channel, handleDeleteChannel }: IProps) {
  const context = useContext(LoginContext);

  const [channelName, setChannelName] = useState<string>(channel.alias || channel.id);
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errored, setErrored] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const tx = await getLastMessage(channel.id).catch(() => setErrored(true));

      if (tx && channel) {
        const message = decryptMessage(tx.asset.messageData.message, channel.passphrase);

        const sender = await retrieveUsername(tx.sender);

        setLastMessage({ id: channel.id, message, sender, timestamp: tx.timestamp.human });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    fetch();

    const interval = setInterval(() => {
      fetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [channel]);

  const updateChannelAlias = (): void => {
    const alias = window.prompt('New channel alias?', channelName);

    if (alias) {
      setChannelAlias(context.user.address, channel, alias);
      setChannelName(alias);
    }
  };

  return (
    <Link to={'/chat/' + channel.id} className="list-group-item list-group-item-action bg-light">
      <div>
        <div className="d-flex">
          <div className="alt-font text-muted" id={channel.id}>
            {truncateChannel(channelName)}
          </div>
          <div className="ml-auto">
            <CopyToClipboard data={channel.passphrase || ''} showText={false} />

            <FontAwesomeIcon
              onClick={() => updateChannelAlias()}
              icon="tag"
              className="icon-button ml-0 mr-1"
            />

            <FontAwesomeIcon
              onClick={() => handleDeleteChannel(channel.id)}
              icon="window-close"
              className="icon-button danger"
            />
          </div>
        </div>

        {!isLoading && !errored ? (
          <>
            <small>
              {lastMessage ? (
                <>
                  <b>{lastMessage.sender}</b>: {truncateMessage(lastMessage.message)}
                </>
              ) : (
                <i>No messages</i>
              )}
            </small>
          </>
        ) : (
          <PulseLoader sizeUnit={'em'} size={0.25} color={'#6c5b7b'} />
        )}

        {errored && <small className="text-danger">Could not load message</small>}
      </div>
    </Link>
  );
}
