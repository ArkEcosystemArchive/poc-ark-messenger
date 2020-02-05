import React from 'react';
import ReactModal from 'react-modal';
import Markdown from 'markdown-to-jsx';

type IProps = {
  header: string;
  text: string;
  placeholder: string;
  isOpen: boolean;
  setModalIsOpen: (arg: boolean) => void;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '30em',
    maxWidth: '50vw'
  }
};

export default function Modal({ header, text, placeholder, isOpen, setModalIsOpen }: IProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Modal"
      style={customStyles}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <h3 className="text-center">{header}</h3>

      <hr />

      <div className="text-justify">
        {text ? (
          <Markdown>{text}</Markdown>
        ) : (
          <div className="text-center text-muted font-italic">{placeholder}</div>
        )}
      </div>
    </ReactModal>
  );
}
