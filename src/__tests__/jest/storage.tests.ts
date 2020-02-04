import {
  setUsername,
  getUsername,
  setUserPassphrase,
  getUserPassphrase,
  setChannelPassphrase,
  getChannelPassphrase,
  removeChannelPassphrase,
  setChannelAlias,
  getChannelAlias,
  getUniqueChannels,
  removeAllChannels
} from '../../utils';

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

  test('it should set the channel and its passphrase', () => {
    setChannelPassphrase('channel1', 'passphrase3');
    expect(localStorage.getItem('channelId-channel1')).toBe('passphrase3');
  });

  test("it should get the channel's passphrase", () => {
    localStorage.setItem('channelId-channel2', 'passphrase4');
    expect(getChannelPassphrase('channel2')).toBe('passphrase4');
  });

  test('it should remove the channel and its passphrase', () => {
    localStorage.setItem('channelId-channel3', 'passphrase5');
    expect(localStorage.getItem('channelId-channel3')).toBe('passphrase5');

    removeChannelPassphrase('channel3');
    expect(localStorage.getItem('channelId-channel3')).toBe(null);
  });

  test('it should set the channel alias', () => {
    setChannelAlias('originalChannel1', 'channelAlias1');
    expect(localStorage.getItem('channelAlias-originalChannel1')).toBe('channelAlias1');
  });

  test('it should get the channel alias', () => {
    localStorage.setItem('channelAlias-originalChannel2', 'channelAlias2');
    expect(getChannelAlias('originalChannel2')).toBe('channelAlias2');
  });

  test('it should list all unique channel IDs', () => {
    localStorage.setItem('channelId-channel1', 'passphrase1');
    localStorage.setItem('channelId-channel2', 'passphrase2');
    localStorage.setItem('channelId-channel3', 'passphrase3');
    localStorage.setItem('channelId-channel4', 'passphrase4');

    const channels = getUniqueChannels();

    expect(channels.length).toBeGreaterThan(1);
  });

  test('it should remove all channel passphrases', () => {
    localStorage.setItem('channelId-channel5', 'passphrase5');
    localStorage.setItem('channelId-channel6', 'passphrase6');
    localStorage.setItem('channelId-channel7', 'passphrase7');
    localStorage.setItem('channelId-channel8', 'passphrase8');

    removeAllChannels();

    expect(Object.keys(localStorage).filter(obj => obj.match(/channelId/)).length).toBe(0);
  });
});
