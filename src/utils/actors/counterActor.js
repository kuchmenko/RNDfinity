import {CounterDID} from './did/counter.did'
import {Platform} from 'react-native';
import {Actor, HttpAgent} from '@dfinity/agent'

export const createCounterActor = async (identity) => {
    try {
        const host = Platform.select({
            ios: 'http://localhost:8000',
            android: 'http://localhost:8000',
        });

        const agent = new HttpAgent({
            identity,
            host,
        });

        await agent.fetchRootKey();

        return Actor.createActor(CounterDID, {
            agent,
            canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        });
    } catch (e) {
        console.error("Error while creating counter actor", e);
        return null;
    }
};
