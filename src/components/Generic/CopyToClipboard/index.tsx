import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IProps = {
  data: string;
  showText?: boolean;
};

export default function CopyToClipboard({ data, showText = true }: IProps) {
  const [showIsCopied, setShowIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(data);

    if (showText) {
      setShowIsCopied(true);

      setTimeout(() => {
        setShowIsCopied(false);
      }, 3000);
    }
  };

  return (
    <div className="d-inline" id="clipboard">
      <FontAwesomeIcon
        onClick={handleClick}
        icon={['far', 'copy']}
        className="icon-button pointer"
      />{' '}
      {showIsCopied && <small>Copied!</small>}
    </div>
  );
}
