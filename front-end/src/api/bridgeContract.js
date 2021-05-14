import BRIDGE_ABI from '../abi/bridge.abi';
import getConfig from './config';
let loadBridge = false;
let bridgeContract;

export default async function bridgeConnect(state, dispatch) {
    const {web3Api, bridgeState,allAccounts} = state;

    if (!allAccounts) return;
    const networkID = await web3Api.eth.getChainId();
    const config = getConfig(networkID);
    const asyncbridge = async () => {

        try {

            bridgeContract = new web3Api.eth.Contract(BRIDGE_ABI, config.bridge);
            dispatch({type: 'SET_Bridge', payload: bridgeContract});
        } catch (e) {
            console.error(e);
            dispatch({type: 'Bridge_ERROR'});
        }
    };
    if (bridgeState !== 'LOAD_Bridge') return;
    if (loadBridge) return dispatch({type: 'SET_Bridge', payload: bridgeContract});
    loadBridge = true;
    asyncbridge();
}
