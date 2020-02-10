export const truncateChannel = (channel: string, pad: number = 9) => {
  const regex = /^[0-9A-Za-z]{34}$/;

  if (channel.match(regex) || channel.length >= 28) {
    const start = channel.substr(0, pad);
    const end = channel.substr(channel.length - pad, channel.length);

    return start + '...' + end;
  }

  return channel;
};

export const truncateMessage = (message: string) => {
  if (message.length > 32) {
    return message.substr(0, 32) + '...';
  }

  return message;
};
