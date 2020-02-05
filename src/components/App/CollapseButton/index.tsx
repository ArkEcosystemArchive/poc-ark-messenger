import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IProps = {
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  isToggled: boolean;
};

export default function CollapseButton({ setIsToggled, isToggled }: IProps) {
  return (
    <div id="collapse-button" onClick={() => setIsToggled(!isToggled)}>
      <FontAwesomeIcon
        className="text-white fa-3x pointer scale-up"
        icon={isToggled ? 'angle-double-left' : 'angle-double-right'}
      />
    </div>
  );
}
