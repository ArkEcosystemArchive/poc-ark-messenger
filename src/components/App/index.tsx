import React, { useState, useEffect } from 'react';
import CollapseButton from './CollapseButton';
import Sidebar from '../Sidebar';
import Routes from './Routes';
import { LoginContext } from '../../contexts';
import { validateAccount, getUserPassphrase, getAccountDataFromPassphrase } from '../../utils';
import { IUser } from '../../interfaces';

export default function App() {
  const [loginData, setLoginData] = useState<IUser | null>(null);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  useEffect(() => {
    const validateStoredPhrase = async () => {
      const storedPassphrase = getUserPassphrase();

      if (storedPassphrase) {
        if (await validateAccount(storedPassphrase)) {
          const data = getAccountDataFromPassphrase(storedPassphrase);
          setLoginData(data);
          setIsToggled(true);
        }
      }
    };

    validateStoredPhrase();
  }, []);

  return (
    <LoginContext.Provider value={{ user: loginData, update: setLoginData, toggled: setIsToggled }}>
      <div className={isToggled ? 'd-flex' : 'd-flex toggled'} id="wrapper">
        <Sidebar />

        <div id="page-content-wrapper" className="content-background container-fluid">
          <CollapseButton setIsToggled={setIsToggled} isToggled={isToggled} />

          <div className="row justify-content-center mx-1 mx-md-2 mx-lg-3 mx-xl-5">
            <Routes />
          </div>

          <div className="text-right text-light mt-3 pr-3 font-mono">
            <small>
              client v{process.env.REACT_APP_VERSION} |{' '}
              <a
                href="https://explorer.arkmessenger.io"
                className="link-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explorer
              </a>{' '}
              |{' '}
              <a
                href="https://api.arkmessenger.io"
                className="link-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                API
              </a>
            </small>
          </div>
        </div>
      </div>
    </LoginContext.Provider>
  );
}
