# ARK Messenger 💬

A fully anonymous and secure chat service proof of concept that utilizes many of the benefits that the ARK blockchain has to offer.

Website: [arkmessenger.io](http://www.arkmessenger.io)

## Installation

Clone the ARK Messenger repository and cd into it:

```
git clone https://github.com/ArkEcosystem/poc-ark-messenger.git
cd poc-ark-messenger
```

Install all dependencies:

```
npm install
```

Create a `.env.development` file and add your custom node and account pre-loader configuration:

```
REACT_APP_USERNAME=preloader
REACT_APP_ADDRESS=AYeceuGa7tTsyG6jgq7X6qKdoXt9iJJKN6
REACT_APP_PASSPHRASE=word word word word word word word word word word word word
REACT_APP_NODE=http://127.0.0.1:11003
```

Run the application:

```
npm start
```

## Tests

Run Jest tests with:

```
npm run test:unit
```

Run Cypress tests with:

```
npm run test:e2e
```

## Compatibility

iOS / Safari are currently not supported due to the ARK crypto package using the `BigInt` type which is not yet supported on Apple products.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
