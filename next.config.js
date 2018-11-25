const path = require('path');
const withCSS = require('@zeit/next-css');

const dev = process.env.NODE_ENV === 'development';

module.exports = withCSS({
  publicRuntimeConfig: {
    FIREBASE_API_KEY: dev
      ? require('./credentials/firebase-admin').client.apiKey
      : process.env.FIREBASE_API_KEY_SECRET,
    FIREBASE_SENDER_ID: dev
      ? require('./credentials/firebase-admin').client.messagingSenderId
      : process.env.FIREBASE_SENDER_ID_SECRET,
  },
  webpack: config => {
    config.resolve.alias.ppk = path.resolve('./');
    return config;
  },
});
