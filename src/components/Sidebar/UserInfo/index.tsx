import React, { useState, useEffect, useContext } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import HomeButton from './HomeButton';
import LogOutButton from './LogOutButton';
import BigNumber from 'bignumber.js';

import constants from '../../../constants';
import { LoginContext } from '../../../contexts';
import { getUserInfo } from '../../../utils';
import { IUserInfo } from '../../../interfaces';

export default function UserInfo() {
  const context = useContext(LoginContext);

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: 'N/A',
    registeredOn: 'N/A',
    totalMessages: 0,
    balance: new BigNumber(0)
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    function update(address: string): void {
      getUserInfo(address)
        .then(data => {
          setUserInfo(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    if (context.user) {
      update(context.user.address);

      const interval = setInterval(() => {
        update(context.user.address);
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [context]);

  return (
    <div className="pl-3 pr-3 pb-3 pt-2">
      <LoginContext.Consumer>
        {context => (
          <>
            {context.user ? (
              <div className="small">
                <div className="row alt-font">
                  <div className="col text-muted">Signed in as:</div>
                  <div className="col text-dark font-weight-bold">
                    {isLoading ? (
                      <PulseLoader sizeUnit={'em'} size={0.25} color={'#6c5b7b'} />
                    ) : (
                      userInfo.username
                    )}
                  </div>
                </div>

                <div className="row alt-font">
                  <div className="col text-muted">Registered on:</div>
                  <div className="col text-dark font-weight-bold">
                    {isLoading ? (
                      <PulseLoader sizeUnit={'em'} size={0.25} color={'#6c5b7b'} />
                    ) : (
                      userInfo.registeredOn.slice(0, 10)
                    )}
                  </div>
                </div>

                <div className="row alt-font">
                  <div className="col text-muted">Balance:</div>
                  <div className="col text-dark font-weight-bold">
                    {isLoading ? (
                      <PulseLoader sizeUnit={'em'} size={0.25} color={'#6c5b7b'} />
                    ) : (
                      userInfo.balance.dividedBy(100000000) + ' ' + constants.ticker
                    )}
                  </div>
                </div>

                <div className="row alt-font">
                  <div className="col text-muted">Messages sent:</div>
                  <div className="col text-dark font-weight-bold">
                    {isLoading ? (
                      <PulseLoader sizeUnit={'em'} size={0.25} color={'#6c5b7b'} />
                    ) : (
                      userInfo.totalMessages.toLocaleString()
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted text-center">Not logged in</p>
            )}

            {context.user && (
              <div className="text-center mt-3">
                <HomeButton />
                <LogOutButton />
              </div>
            )}
          </>
        )}
      </LoginContext.Consumer>
    </div>
  );
}
