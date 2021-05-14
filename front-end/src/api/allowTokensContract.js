import ALLOW_TOKENS_ABI from '../abi/allow_token.abi';
import getConfig from './config';
let loadMain = false;
let allowTokensContract;

export default async function allowTokensConnect(state, dispatch) {
    const {web3Api, allowState,allAccounts} = state;

    if (!allAccounts) return;
    const networkID = await web3Api.eth.getChainId();
    const config = getConfig(networkID);
    const asyncLoadMain = async () => {

        try {

            allowTokensContract = new web3Api.eth.Contract(ALLOW_TOKENS_ABI, config.allowTokens);
            dispatch({type: 'SET_AllowTokens', payload: allowTokensContract});
        } catch (e) {
            console.error(e);
            dispatch({type: 'AllowTokens_ERROR'});
        }
    };
    if (allowState !== 'LOAD_AllowTokens') return;
    if (loadMain) return dispatch({type: 'SET_AllowTokens', payload: allowTokensContract});
    loadMain = true;
    asyncLoadMain();
}
