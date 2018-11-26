const path = require('path');

const dev = process.env.NODE_ENV === 'development';
const { PHASE_PRODUCTION_SERVER } = dev ? {} : require('next-server/constants');

const config = {
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
};

console.log('config!!');
console.log(config);

module.exports = phase =>
  console.log(phase === PHASE_PRODUCTION_SERVER) ||
  phase === PHASE_PRODUCTION_SERVER
    ? config
    : require('@zeit/next-css')(config);
