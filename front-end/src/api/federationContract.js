import Federation_ABI from '../abi/federation.abi';
import getConfig from './config';
let loadBridge = false;
let federationContract;

export default async function federationConnect(state, dispatch) {
    const {web3Api, federationState,allAccounts} = state;

    if (!allAccounts) return;
    const networkID = await web3Api.eth.getChainId();
    const config = getConfig(networkID);
    const asyncFederation = async () => {

        try {

            federationContract = new web3Api.eth.Contract(Federation_ABI, config.federation);
            dispatch({type: 'SET_Federation', payload: federationContract});
        } catch (e) {
            console.error(e);
            dispatch({type: 'Federation_ERROR'});
        }
    };
    if (federationState !== 'LOAD_Federation') return;
    if (loadBridge) return dispatch({type: 'SET_Federation', payload: federationContract});
    loadBridge = true;
    asyncFederation();
}
