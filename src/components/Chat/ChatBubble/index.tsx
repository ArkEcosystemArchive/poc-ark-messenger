import React, { useState, useEffect } from 'react';
import { compiler } from 'markdown-to-jsx';

import { retrieveUsername } from '../../../utils';

import { IMessage } from '../../../interfaces';

type IProps = {
  data: IMessage;
};

export default function ChatBubble({ data }: IProps) {
  const { sender, message, timestamp } = data;

  const [username, setUsername] = useState<string | undefined>(sender);

  const Message = () => {
    if (message.match(/.*http:\/\/.*/)) {
      return compiler(`_Non-secure content removed. Please use secure sources only (https://)_ 🤖`);
    }

    return compiler(message, {
      // Ignoring due to typings being outdated / not including this attribute
      // @ts-ignore
      disableParsingRawHTML: true
    });
  };

  useEffect(() => {
    if (sender !== 'You') {
      retrieveUsername(sender).then(name => setUsername(name));
    }
  }, [sender]);

  const alignment = sender === 'You' ? 'row justify-content-end' : 'row justify-content-start';

  const bubbleStyle = sender === 'You' ? 'chat-bubble-self' : 'chat-bubble-other';

  return (
    <div className={alignment}>
      <div className={'chat-bubble p-3 mb-3 mx-3 shadow-sm ' + bubbleStyle}>
        <div className="d-flex justify-content-between text-muted small alt-font">
          <span>{username}</span>
          <span>{new Date(timestamp).toLocaleString()}</span>
        </div>

        <hr className="my-1" />

        <div className="chat-message">
          <Message />
        </div>
      </div>
    </div>
  );
}
