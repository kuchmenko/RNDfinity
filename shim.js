// if (typeof __dirname === 'undefined') global.__dirname = '/'
// if (typeof __filename === 'undefined') global.__filename = ''
// if (typeof process === 'undefined') {
//   global.process = require('process')
// } else {
//   const bProcess = require('process')
//   for (var p in bProcess) {
//     if (!(p in process)) {
//       process[p] = bProcess[p]
//     }
//   }
// }
//
// process.browser = false
// if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer
//
// // global.location = global.location || { port: 80 }
// const isDev = typeof __DEV__ === 'boolean' && __DEV__
// process.env['NODE_ENV'] = isDev ? 'development' : 'production'
// if (typeof localStorage !== 'undefined') {
//   localStorage.debug = isDev ? '*' : ''
// }
//
// // If using the crypto shim, uncomment the following line to ensure
// // crypto is loaded first, so it can populate global.crypto
require('crypto');
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import {polyfill as polyfillBase64} from 'react-native-polyfill-globals/src/base64';
import {polyfill as polyfillEncoding} from 'react-native-polyfill-globals/src/encoding';
import {polyfill as polyfillReadableStream} from 'react-native-polyfill-globals/src/readable-stream';
import {polyfill as polyfillURL} from 'react-native-polyfill-globals/src/url';
import {polyfill as polyfillFetch} from 'react-native-polyfill-globals/src/fetch';
import {polyfill as polyfillCrypto} from 'react-native-polyfill-globals/src/crypto';

if (typeof BigInt === 'undefined') {
  global.BigInt = require('big-integer');
}
