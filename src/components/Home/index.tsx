import React, { useState, useEffect } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/images/logo.png';

import { LoginContext } from '../../contexts';

import { fetchTotalMessages, fetchTotalUsers } from '../../utils';

import { IUser } from '../../interfaces/';

type IData = {
  isLoading: boolean;
  amount: number;
};

export default function Home() {
  const [totalUsers, setTotalUsers] = useState<IData>({
    isLoading: true,
    amount: 0
  });
  const [totalMessages, setTotalMessages] = useState<IData>({
    isLoading: true,
    amount: 0
  });

  useEffect(() => {
    fetchTotalMessages().then(amount => {
      setTotalMessages({ isLoading: false, amount });
    });

    fetchTotalUsers().then(amount => {
      setTotalUsers({ isLoading: false, amount });
    });
  }, []);

  return (
    <div className="content-window p-5 shadow d-flex">
      <div className="text-center my-auto w-100">
        <h1 className="title">
          ARK Messenger <img className="logo-small" src={logo} alt="logo" />
        </h1>
        <p>A decentralized chat application built on ARK.</p>

        <hr className="my-5" />

        <div className="row text-center">
          <div className="col">
            <h3>Total Users:</h3>
            <div className="display-4 text-secondary">
              {totalUsers.isLoading ? (
                <PulseLoader sizeUnit={'em'} size={0.25} color={'#6c5b7b'} />
              ) : (
                totalUsers.amount.toLocaleString()
              )}
            </div>
          </div>
          <div className="col">
            <h3>Total Messages:</h3>
            <div className="display-4 text-secondary">
              {totalMessages.isLoading ? (
                <div className="">
                  <PulseLoader sizeUnit={'em'} size={0.25} color={'#6c5b7b'} />
                </div>
              ) : (
                totalMessages.amount.toLocaleString()
              )}
            </div>
          </div>
        </div>

        <hr className="my-5" />

        <LoginContext.Consumer>
          {({ user }: { user: IUser }) => {
            return !user ? (
              <>
                <Link className="btn btn-lg btn-secondary mr-3" to="/login">
                  Log In <FontAwesomeIcon icon="sign-in-alt" className="icon-shadow" />
                </Link>
                <Link className="btn btn-lg btn-outline-secondary " to="/create-account">
                  Create Account <FontAwesomeIcon icon="plus" className="icon-shadow" />
                </Link>
              </>
            ) : (
              <Link className="btn btn-lg btn-secondary mr-3" to="/channels">
                Join / Create Channel <FontAwesomeIcon icon="sign-in-alt" className="icon-shadow" />
              </Link>
            );
          }}
        </LoginContext.Consumer>
      </div>
    </div>
  );
}
