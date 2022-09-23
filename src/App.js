/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import bip39 from 'react-native-bip39';
import {Secp256Identity} from './utils/identity/Secp256Identity';
import {createCounterActor} from './utils/actors/counterActor';
import {HttpAgent} from '@dfinity/agent';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [mnemonic, setMnemonic] = React.useState('');
  const [counter, setCounter] = React.useState(0);
  const [identity, setIdentity] = React.useState(null);
  const actor = React.useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const generateNewMnemonic = React.useCallback(() => {
    bip39.generateMnemonic().then(mnemonic => {
      console.log(mnemonic);
      setMnemonic(mnemonic);
    });
  }, []);

  const generateIdentity = React.useCallback(async () => {
    try {
      const secp256Identity = new Secp256Identity();
      const identity = await secp256Identity.createAccount(mnemonic);
      console.log('identity', identity);

      actor.current = await createCounterActor();
      const result = await actor.current.get();

      setIdentity(identity);
      setCounter(BigInt(result).toLocaleString());
    } catch (e) {
      console.error('Error while generating identity', e);
    }
  }, [mnemonic]);

  const increaseCounterRequest = React.useCallback(async () => {
    const counterActor = actor.current;

    if (counterActor != null) {
      await counterActor.inc();
      const result = await counterActor.get();
      console.log('result', result);

      setCounter(BigInt(result).toLocaleString());
    }
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Mnemonic">
            {mnemonic.length > 0
              ? mnemonic
              : 'Click on button below to generate new mnemonic'}
          </Section>
          <Section title="Generate new one">
            Click on button to generate brand new mnemonic {'\n'}
            <Button
              title="Generate new mnemonic"
              onPress={generateNewMnemonic}
            />
          </Section>
          {mnemonic.length > 0 && (
            <Section title="Generate identity">
              <Button title="Generate identity" onPress={generateIdentity} />
            </Section>
          )}
          {identity != null && (
            <>
              <Section title="Identity">
                <Text>Pricipal: {identity.principal}</Text>
              </Section>
            </>
          )}
          {identity != null && actor.current != null && (
            <Section title="Counter">
              Perform counter canister request {'\n'}Current counter: {counter}{' '}
              {'\n'}
              <Button title="Increase" onPress={increaseCounterRequest} />
            </Section>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
