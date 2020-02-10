import { IChannel } from '../interfaces';

export const getUsername = (address: string): string | null => {
  return localStorage.getItem(address);
};

export const setUsername = (address: string, username: string): void => {
  localStorage.setItem(address, username);
};

export const getUserPassphrase = (): string | null => {
  return localStorage.getItem('passphrase');
};

export const setUserPassphrase = (passphrase: string): void => {
  localStorage.setItem('passphrase', passphrase);
};

export const setUserChannels = (user: string, channels: IChannel[]): void => {
  localStorage.setItem(user + '-channels', JSON.stringify(channels));
};

export const getUserChannel = (user: string, id: string): IChannel | undefined => {
  const channels = getUserChannels(user);

  return channels.find(channel => channel.id === id);
};

export const getUserChannels = (user: string): IChannel[] => {
  const channels = localStorage.getItem(user + '-channels');

  return channels ? JSON.parse(channels) : [];
};

export const createUserChannel = (user: string, id: string, passphrase: string): void => {
  const channels = getUserChannels(user);
  const channel = { id, passphrase, alias: null };

  channels.push(channel);

  setUserChannels(user, channels);
};

export const removeUserChannel = (user: string, channelId: string): void => {
  const channels = getUserChannels(user);

  setUserChannels(
    user,
    channels.filter(channel => channel.id !== channelId)
  );
};

export const setChannelAlias = (user: string, channel: IChannel, alias: string): void => {
  const channels = getUserChannels(user);

  channels[channels.findIndex(ch => ch.id === channel.id)] = { ...channel, alias };

  setUserChannels(user, channels);
};

export const removeAllChannels = (user: string): void => {
  localStorage.removeItem(user + '-channels');
};
