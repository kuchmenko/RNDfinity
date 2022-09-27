require('crypto');
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

if (typeof BigInt === 'undefined') {
  global.BigInt = require('big-integer');
}
