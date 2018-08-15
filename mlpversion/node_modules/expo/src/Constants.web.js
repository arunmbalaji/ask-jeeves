const manifest = require('../../../app.json');

const Constants = {
  statusBarHeight: 0,
  expoVersion: manifest.expo.sdkVersion,
  expoRuntimeVersion: 'n/a',
  linkingUri: window.location.href.split('?')[0].split('#')[0],
  isDevice: true,
  manifest: manifest.expo,
  platform: {
    web: {
      userAgent: navigator.userAgent,
    },
    statusBarHeight: 0,
  },
};

export default Constants;
