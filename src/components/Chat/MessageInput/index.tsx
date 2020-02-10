import React, { useState } from 'react';
import Modal from '../../Generic/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import constants from '../../../constants';

type IProps = {
  message: string;
  handleSubmit: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function MessageInput({ message, handleSubmit, setMessage }: IProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /*
  Makes pressing enter in the textarea submit the form.
  Pressing shift + enter will create a line break.

  Solution inspired by user: https://stackoverflow.com/users/2030321/chris
  */
  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <Modal
        header="Message Preview"
        text={message}
        placeholder="Type a message to preview it here"
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <small className="text-muted alt-font pointer" onClick={() => setModalIsOpen(!modalIsOpen)}>
        <FontAwesomeIcon icon="search" /> Markdown preview
      </small>
      <div className="input-group mt-1">
        <textarea
          className="form-control"
          rows={1}
          placeholder="Type a message.."
          name="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          aria-label="message"
          aria-describedby="message"
          autoComplete="off"
          onKeyDown={onEnterPress}
        />

        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary btn-chat"
            type="submit"
            id="send-button"
            disabled={message.length > constants.messageLengthLimit}
          >
            Send
          </button>
        </div>
      </div>

      {message.length > constants.messageLengthLimit && (
        <span className="text-danger text-center d-block">
          <small>Message is too long (max {constants.messageLengthLimit} characters)</small>
        </span>
      )}
    </form>
  );
}
