const { webcrypto } = require('crypto');

const DEFAULT_RESPONSE_DELAY_DURATION = 500;

const util = {
  delay: async (duration = DEFAULT_RESPONSE_DELAY_DURATION) =>
    new Promise(resolve => setTimeout(resolve, duration)),
  generateRandomId: () => {
    const arr = new Uint32Array(3);
    webcrypto.getRandomValues(arr);
    return (performance.now().toString(36)+Array.from(arr).map(item => item.toString(36)).join("")).replace(/\./g,"");
  },
};

module.exports = util;
