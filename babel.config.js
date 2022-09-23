module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
      'transform-exponentiation-operator',
      [
          'module-resolver',
          {
              root: ['.'],
              alias: {
                  
              },
          },
      ],

  ]
};
