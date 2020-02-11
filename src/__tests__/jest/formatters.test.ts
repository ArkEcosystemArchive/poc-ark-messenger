import { truncateChannel, truncateMessage } from '../../utils';

describe('formatters', () => {
  test('it should truncate the channel', () => {
    expect(truncateChannel('DN89XwYPmTBc8k63EE75Y8LfJCewx2dqDq')).toBe('DN89XwYPm...Cewx2dqDq');
  });

  test('it should truncate the message', () => {
    expect(truncateMessage('This is a relatively long message that should be truncated')).toBe(
      'This is a relatively long mes...'
    );
  });

  test('it should leave the message intact', () => {
    expect(truncateMessage('A short message')).toBe('A short message');
  });
});
