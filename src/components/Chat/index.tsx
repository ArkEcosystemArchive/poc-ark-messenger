import React, { useEffect, useState, useRef, useContext } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Redirect } from 'react-router-dom';

import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';

import { LoginContext } from '../../contexts';

import { sendMessage, getTransactions, decryptMessage, getUserChannel } from '../../utils/index';

import { IMessage } from '../../interfaces';

type IProps = {
  match: {
    params: {
      id: string;
    };
  };
};

export default function Chat({ match: { params } }: IProps) {
  const context = useContext(LoginContext);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { id } = params;

  const [message, setMessage] = useState<string>('');
  const [log, setLog] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

  const channel = getUserChannel(context.user.address, id);

  useEffect(() => {
    const processMessages = async (): Promise<void> => {
      if (channel) {
        const { address } = context.user;

        const transactions = await getTransactions(channel.id);

        const messages = transactions.reverse().map(tx => ({
          id: tx.id,
          sender: tx.sender === address ? 'You' : tx.sender,
          message: decryptMessage(tx.asset.messageData.message, channel.passphrase),
          timestamp: tx.timestamp.human
        }));

        setLog(messages);
      }
    };

    if (channel) {
      processMessages().then(() => {
        setIsLoading(false);
        bottomRef.current && bottomRef.current.scrollIntoView();
      });

      const interval = setInterval(() => {
        processMessages();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [id, context.user]);

  useEffect(() => {
    if (bottomRef.current && isAtBottom) {
      bottomRef.current.scrollIntoView();
    }
  }, [log, isAtBottom]);

  const handleSubmit = (e?: React.SyntheticEvent): void => {
    if (e) e.preventDefault();

    const trimmedMessage = message.trim();

    if (channel && trimmedMessage) {
      const { passphrase, address } = context.user;

      sendMessage(id, trimmedMessage, channel.passphrase, passphrase, address);

      setMessage('');
    }
  };

  const handleScroll = (e: any): void => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  return (
    <div className="row content-window p-2 p-md-3 p-lg-4 p-xl-5 shadow" onScroll={handleScroll}>
      <div className="mt-auto w-100">
        <div>
          {channel && !log.length && !isLoading && (
            <div className="text-center text-muted text-2x">No messages</div>
          )}

          {isLoading && (
            <div className="text-center">
              <PulseLoader sizeUnit={'em'} size={1} color={'rgb(238, 174, 202)'} />
            </div>
          )}

          {channel ? (
            log.map(data => <ChatBubble key={data.id} data={data} />)
          ) : (
            <Redirect to="/channels" />
          )}
        </div>

        <MessageInput message={message} handleSubmit={handleSubmit} setMessage={setMessage} />
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
