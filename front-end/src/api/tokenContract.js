import tokenAbi from '../abi/ERC20.abi';
import getConfig from './config';
import ALLOW_TOKENS_ABI from "../abi/allow_token.abi";

let loadMain = false;
let tokenContract;
export default async function tokenConnect(state, dispatch) {
    const {web3Api, tokenState,allAccounts} = state;

    if (!allAccounts) return;
    const networkID = await web3Api.eth.getChainId();
    const config = getConfig(networkID);

    const asyncLoadMain = async () => {

        try {

            tokenContract = new web3Api.eth.Contract(ALLOW_TOKENS_ABI, config.allowTokens);
            dispatch({type: 'SET_AllowTokens', payload: allowTokensContract});
        } catch (e) {
            console.error(e);
            dispatch({type: 'AllowTokens_ERROR'});
        }
    };
    if (tokenState !== 'LOAD_MAINCONTRACT') return;
    if (loadMain) return dispatch({type: 'SET_MAINCONTRACT', payload: tokenContract});
    loadMain = true;
    asyncLoadMain();
}
