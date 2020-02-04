export default {
  algorithm: 'aes-256-ctr',
  preloader: {
    username: 'preloader',
    address: 'AYeceuGa7tTsyG6jgq7X6qKdoXt9iJJKN6',
    passphrase: 'window perfect fiber whip source stock tower upset crucial later letter social'
  },
  nodes:
    process.env.NODE_ENV === 'production'
      ? ['http://88.198.73.233:4003']
      : ['http://88.198.73.233:4003']
};
