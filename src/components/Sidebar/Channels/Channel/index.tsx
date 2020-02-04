import React, { useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipboard from '../../../Generic/CopyToClipboard';

import {
  getLastMessage,
  decryptMessage,
  retrieveUsername,
  getChannelPassphrase,
  truncateChannel,
  truncateMessage,
  setChannelAlias,
  getChannelAlias
} from '../../../../utils';

import { IMessage } from '../../../../interfaces';

type IProps = {
  id: string;
  handleDeleteChannel: (id: string) => void;
};

export default function Channel({ id, handleDeleteChannel }: IProps) {
  const [channelName, setChannelName] = useState<string>(getChannelAlias(id) || id);
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errored, setErrored] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const tx = await getLastMessage(id).catch(() => setErrored(true));
      const channelPassphrase = getChannelPassphrase(id);

      if (tx && channelPassphrase) {
        const message = decryptMessage(tx.asset.messageData.message, channelPassphrase);

        const sender = await retrieveUsername(tx.sender);

        setLastMessage({ id, message, sender, timestamp: tx.timestamp.human });
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
  }, [id]);

  const updateChannelAlias = (): void => {
    const alias = window.prompt('New channel alias?', channelName);

    if (alias) {
      setChannelAlias(id, alias);
      setChannelName(alias);
    }
  };

  return (
    <Link to={'/chat/' + id} className="list-group-item list-group-item-action bg-light">
      <div>
        <div className="d-flex">
          <div className="alt-font text-muted" id={id}>
            {truncateChannel(channelName)}
          </div>
          <div className="ml-auto">
            <CopyToClipboard data={getChannelPassphrase(id) || ''} showText={false} />

            <FontAwesomeIcon
              onClick={() => updateChannelAlias()}
              icon="tag"
              className="icon-button ml-0 mr-1"
            />

            <FontAwesomeIcon
              onClick={() => handleDeleteChannel(id)}
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
