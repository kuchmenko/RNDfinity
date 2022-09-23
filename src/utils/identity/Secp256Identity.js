import bip39 from 'react-native-bip39';
import {Secp256k1KeyIdentity, Secp256k1PublicKey} from '@dfinity/identity';
import HDKey from 'hdkey';
import Secp256k1 from 'secp256k1';

const DERIVATION_PATH = "m/44'/223'/0'/0";

export class Secp256Identity {
  createSecp256K1KeyPair(mnemonic, index) {
    const seed = bip39.mnemonicToSeed(mnemonic);
    const masterKey = HDKey.fromMasterSeed(seed);

    const {privateKey} = masterKey.derive(`${DERIVATION_PATH}/${index}`);
    const publicKey = Secp256k1.publicKeyCreate(privateKey, false);
    console.log(Secp256k1PublicKey, publicKey);
    return {
      secretKey: privateKey,
      publicKey: Secp256k1PublicKey.fromRaw(publicKey),
    };
  }

  async createAccount(mnemonic: string, subAccount?: number) {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic');
    }

    const index = subAccount || 0;
    console.log(index, mnemonic);
    const keyPair = this.createSecp256K1KeyPair(mnemonic, index);
    console.log(keyPair);
    const identity = Secp256k1KeyIdentity.fromKeyPair(
      keyPair.publicKey.toRaw(),
      keyPair.secretKey,
    );

    const deviceData: DeviceData = {
      keyPair: identity.toJSON(),
    };

    return {
      identity,
      principal: identity.getPrincipal().toText(),
      mnemonic,
      deviceData,
    };
  }
}
