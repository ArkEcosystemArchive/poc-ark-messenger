import React, { useState, useContext } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoginContext } from '../../contexts';
import { validateAccount, setUserPassphrase, getAccountDataFromPassphrase } from '../../utils';

import { IContext } from '../../interfaces/';

export default function Login() {
  const context: IContext = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const isValidAccount = await validateAccount(passphrase).catch(() => {
      setIsLoading(false);
      setError('Network error');
    });

    if (isValidAccount) {
      setIsLoading(false);

      if (rememberMe) {
        setUserPassphrase(passphrase);
      }

      context.update(getAccountDataFromPassphrase(passphrase));
      setLoggedIn(true);
      context.toggled(true);
    } else {
      setIsLoading(false);
      setError('Account does not exist');
    }
  };

  return (
    <div className="content-window p-5 shadow d-flex">
      <div className="text-center my-auto w-100">
        <h1>Log in</h1>

        <p>Use your passphrase to sign in the ARK Messenger service!</p>

        <div className="row justify-content-center">
          <form onSubmit={handleSubmit} className="mb-5 col-12 col-lg-6">
            <div className="input-group">
              <input
                type="password"
                size={10}
                className="form-control"
                placeholder="Passphrase"
                name="passphrase"
                value={passphrase}
                onChange={e => setPassphrase(e.target.value)}
                aria-label="passphrase"
                aria-describedby="passphrase"
              />
            </div>

            <div className="form-group mt-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  className="form-check-label pointer"
                  htmlFor="invalidCheck3"
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  Remember me
                </label>
              </div>
            </div>

            <Link to="/" className="btn btn-outline-secondary mr-3">
              <FontAwesomeIcon icon="long-arrow-alt-left" className="icon-shadow" /> Back
            </Link>

            <button className="btn btn-secondary mr-3" type="submit" disabled={isLoading}>
              {isLoading ? (
                <PulseLoader sizeUnit={'em'} size={0.5} color={'#fff'} />
              ) : (
                <>
                  Log In <FontAwesomeIcon icon="sign-in-alt" className="icon-shadow" />
                </>
              )}
            </button>
          </form>
        </div>

        {error && <div className="alert alert-danger d-inline-block">{error}</div>}

        {loggedIn && <Redirect to="/channels" />}
      </div>
    </div>
  );
}
