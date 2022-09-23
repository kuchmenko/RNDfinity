# React Native Dfinity example app

## About polyfills 
This project is using different polyfills to make it work on the browser and on the mobile devices.
If you want to reuse them, you need to copy them manually to your workspace

- This project uses [react-native-polyfill-globals](https://github.com/acostalima/react-native-polyfill-globals)
- This project uses [rn-nodeify](https://github.com/tradle/rn-nodeify)

Also, please check polyfills in the `shim.js`, `metro.config.js` and `package.json` files.

## Motoko counter canister setup

To make this repository work as expected, you will need to install dfx and run local canister, 
or deploy canister to the mainnet (or your custom dfx network).

Please follow the instructions in the [dfinity docs](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html) to install dfx and start local canister.
And follow the instructions on how to set up canister from [**dfinity/examples**](https://github.com/dfinity/examples/tree/master/motoko/counter) repository

## Environment setup

- Install the shared [React Native dependencies](https://reactnative.dev/docs/environment-setup#installing-dependencies) (`React Native CLI`, _not_ `Expo CLI`)
- Install [cocoapods](https://guides.cocoapods.org/using/getting-started.html) by running:

  ```bash
  sudo gem install cocoapods
  ```
- Clone this repo:

  ```bash
  git clone https://github.com/kuchmenko/RNDfinity
  ```

## Example project installation steps

- Install yarn dependencies:
  This command will install yarn dependencies, iOS Pods and patch-packages
  ```bash
  yarn fullInstall
  ```
- Run the app: (If you have some problems with CLI run with Xcode)
  ```bash
  yarn ios
  ```
- Run the app on Android:
  ```bash
    yarn android
    ```
