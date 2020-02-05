import { encryptMessage, decryptMessage } from '../../utils';

describe('crypto', () => {
  test('it should encrypt the message using a passphrase', () => {
    expect(
      encryptMessage(
        'This is a test message',
        'word word word word word word word word word word word word'
      )
    ).toBe('f2c5fb9ca512c60557fb2e6d1b8cfa47837b5f7434ac');
  });

  test('it should decrypt the message using a passphrase', () => {
    expect(
      decryptMessage(
        'f2c5fb9ca512c60557fb2e6d1b8cfa47837b5f7434ac',
        'word word word word word word word word word word word word'
      )
    ).toBe('This is a test message');
  });
});
