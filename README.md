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

Run the application:

```
npm start
```

By running the application in a development environment, it expects the blockchain to run locally on port `4003`. You can change this behavior by editing the `nodes` value in `./src/config.ts`

## Tests

Run Jest tests with:

```
npm run test:jest
```

Run Cypress tests with:

```
npm run test:cypress
```

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
