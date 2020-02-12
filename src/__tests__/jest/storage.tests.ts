import {
  setUsername,
  getUsername,
  setUserPassphrase,
  getUserPassphrase,
  setUserChannels,
  getUserChannel,
  getUserChannels,
  createUserChannel,
  removeUserChannel,
  setChannelAlias,
  removeAllChannels
} from '../../utils';

import { IChannel } from '../../interfaces';

const parseStorageData = (data: string | null): IChannel[] => {
  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

describe('storage', () => {
  test('it should set the username for the entered address', () => {
    setUsername('address1', 'username1');
    expect(localStorage.getItem('address1')).toBe('username1');
  });

  test('it should get the username for the entered address', () => {
    localStorage.setItem('address2', 'username2');
    expect(getUsername('address2')).toBe('username2');
  });

  test("it should set the user's passphrase", () => {
    setUserPassphrase('passphrase1');
    expect(localStorage.getItem('passphrase')).toBe('passphrase1');
  });

  test("it should get the user's passphrase", () => {
    localStorage.setItem('passphrase', 'passphrase2');
    expect(getUserPassphrase()).toBe('passphrase2');
  });

  test("it should set the user's channels", () => {
    const user = 'user1';
    const channels = [{ id: 'id1', passphrase: 'passphrase1', alias: null }];
    setUserChannels(user, channels);
    expect(parseStorageData(localStorage.getItem(user + '-channels'))).toMatchObject(channels);
  });

  test('it should get the channel object for user and id', () => {
    const user = 'user2';
    const channel = { id: 'id2', passphrase: 'passphrase2', alias: null };
    setUserChannels(user, [channel]);
    expect(getUserChannel(user, channel.id)).toMatchObject(channel);
  });

  test('it should get all channels for user', () => {
    const user = 'user3';
    const channels = [
      { id: 'id3', passphrase: 'passphrase3', alias: null },
      { id: 'id4', passphrase: 'passphrase4', alias: null }
    ];
    setUserChannels(user, channels);
    expect(getUserChannels(user)).toMatchObject(channels);
  });

  test('it should create a user channel', () => {
    const user = 'user4';
    const channel = { id: 'id5', passphrase: 'passphrase5', alias: null };
    createUserChannel(user, channel.id, channel.passphrase);
    expect(
      parseStorageData(localStorage.getItem(user + '-channels')).find(ch => ch.id === channel.id)
    ).toMatchObject(channel);
  });

  test('it should remove a channel for user', () => {
    const user = 'user5';
    const channels = [
      { id: 'id6', passphrase: 'passphrase6', alias: null },
      { id: 'id7', passphrase: 'passphrase7', alias: null }
    ];
    setUserChannels(user, channels);
    removeUserChannel(user, channels[1].id);
    expect(
      parseStorageData(localStorage.getItem(user + '-channels')).find(
        ch => ch.id === channels[1].id
      )
    ).toBeFalsy();
  });

  test("it set the alias for a user's channel", () => {
    const user = 'user7';
    const channel = { id: 'id8', passphrase: 'passphrase8', alias: null };
    const alias = 'testalias';
    setUserChannels(user, [channel]);
    setChannelAlias(user, channel, alias);
    const storedChannel = parseStorageData(localStorage.getItem(user + '-channels')).find(
      ch => ch.id === channel.id
    );
    expect(storedChannel.alias).toBe(alias);
  });

  test('it should remove all channel for user', () => {
    const user = 'user8';
    const channels = [
      { id: 'id9', passphrase: 'passphrase9', alias: null },
      { id: 'id10', passphrase: 'passphrase10', alias: null },
      { id: 'id11', passphrase: 'passphrase11', alias: null }
    ];
    setUserChannels(user, channels);
    removeAllChannels(user);
    expect(localStorage.getItem(user + '-channels')).toBe(null);
  });
});
