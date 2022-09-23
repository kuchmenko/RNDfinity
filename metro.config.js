/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const {getDefaultConfig} = require('metro-config');

module.exports = async () => {
  const {
    resolver: {assetExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      extraNodeModules: {
        // Polyfills for node libraries
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert-browserify'),
        stream: require.resolve('readable-stream'),
        events: require.resolve('events-browserify'),
      },
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'svg'], //add here
    },
  };
};
