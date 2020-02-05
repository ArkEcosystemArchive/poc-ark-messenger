import React, { useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipboard from '../Generic/CopyToClipboard';
import { newAccount, checkAccountExists } from '../../utils';
import { IUser } from '../../interfaces/';

export default function CreateAccount() {
  const [username, setUsername] = useState<string>('');
  const [account, setAccount] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    const isTaken = await checkAccountExists(username);

    if (isTaken) {
      setUsername('');
      setIsLoading(false);
      setError('Username already taken');
      return;
    }

    const normalizedUsername = username.toLocaleLowerCase().trim();

    newAccount(normalizedUsername)
      .then((acc: IUser) => {
        setAccount(acc);
        setIsLoading(false);
        setUsername('');
      })
      .catch(err => {
        setUsername('');
        setIsLoading(false);
        setError('Something went wrong.');
      });
  };

  const goToLogin = (): void => {
    if (window.confirm("Have you safely stored your account's passphrase?")) {
      setConfirmed(true);
    }
  };

  return (
    <div className="content-window p-5 shadow d-flex">
      <div className="text-center my-auto w-100">
        <h1>Create Account</h1>

        <p>
          Enter your desired username and click on 'Create'!
          <br />
          Your account will be automatically pre-loaded with funds.
        </p>

        {!account && (
          <div className="row justify-content-center">
            <form onSubmit={handleSubmit} className="mb-5 col-12 col-lg-6">
              <div className="input-group mb-3">
                <input
                  pattern="[a-zA-Z0-9!@$_.]{1,20}"
                  title="[a-zA-Z0-9!@$_.]{1,20}"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  aria-label="username"
                  aria-describedby="username"
                  required
                  disabled={isLoading}
                />
              </div>

              <Link to="/" className="btn btn-outline-secondary mr-3">
                <FontAwesomeIcon icon="long-arrow-alt-left" className="icon-shadow" /> Back
              </Link>

              <button className="btn btn-secondary" type="submit" id="message" disabled={isLoading}>
                {isLoading ? (
                  <PulseLoader sizeUnit={'em'} size={0.5} color={'#fff'} />
                ) : (
                  <>
                    Create <FontAwesomeIcon icon="plus" className="icon-shadow" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {error && <div className="alert alert-danger d-inline-block">{error}</div>}

        {account && (
          <>
            <div className="card text-center mb-4">
              <div className="card-body animated flash">
                <div className="mb-3" id="username">
                  <span className="text-muted">Username:</span>
                  <br />
                  <span className="alt-font text-1_5x">{account.username}</span>
                </div>

                <div id="passphrase">
                  <span className="text-muted">
                    Passphrase <CopyToClipboard data={account.passphrase} />
                  </span>
                  <br />
                  <span className="alt-font text-1_5x">{account.passphrase}</span>
                </div>
              </div>
            </div>

            <Link to="/" className="btn btn-outline-secondary mr-3">
              <FontAwesomeIcon icon="long-arrow-alt-left" className="icon-shadow" /> Back
            </Link>

            <button className="btn btn-secondary" onClick={goToLogin}>
              Log In <FontAwesomeIcon icon="sign-in-alt" className="icon-shadow" />
            </button>
          </>
        )}

        {confirmed && <Redirect to={'/login'} />}
      </div>
    </div>
  );
}
