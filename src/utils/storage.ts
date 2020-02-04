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

export const getChannelPassphrase = (id: string): string | null => {
  return localStorage.getItem('channelId-' + id);
};

export const setChannelPassphrase = (id: string, passphrase: string): void => {
  localStorage.setItem('channelId-' + id, passphrase);
};

export const removeChannelPassphrase = (id: string): void => {
  localStorage.removeItem('channelId-' + id);
};

export const getChannelAlias = (id: string): string | null => {
  return localStorage.getItem('channelAlias-' + id);
};

export const setChannelAlias = (id: string, alias: string): void => {
  localStorage.setItem('channelAlias-' + id, alias);
};

export const getUniqueChannels = (): string[] => {
  const channels = Object.keys(localStorage).filter(obj => obj.match(/channelId/));

  return channels.map(raw => raw.replace('channelId-', ''));
};

export const removeAllChannels = (): void => {
  const channels = getUniqueChannels();

  for (const channel of channels) {
    removeChannelPassphrase(channel);
  }
};
