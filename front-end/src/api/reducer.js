const reducer = (state, action) => {
    switch (action.type) {
        //api
        case 'CONNECT_INIT':
            return { ...state, apiState: 'CONNECT_INIT' };

        case 'CONNECT':
            return { ...state, web3Api: action.payload, apiState: 'CONNECT_SUCCESS' };

        case 'CONNECT_ERROR':
            return { ...state, apiState: 'ERROR', apiError: action.payload };

        //accounts
        case 'LOAD_ALLACCOUNTS':
            return { ...state, allaccountsState: 'LOAD_ALLACCOUNTS' };

        case 'SET_ALLACCOUNTS':
            return { ...state, allAccounts: action.payload, allaccountsState: 'READY' };

        case 'ALLACCOUNTS_ERROR':
            return { ...state, allAccounts: null, allaccountsState: 'ERROR' };


        case 'LOAD_AllowTokens':
            return { ...state, allowState: 'LOAD_AllowTokens' };

        case 'SET_AllowTokens':
            return { ...state, allowContract: action.payload, allowState: 'READY' };

        case 'AllowTokens_ERROR':
            return { ...state, allowContract: null, allowState: 'ERROR' };


        case 'LOAD_Bridge':
            return { ...state, bridgeState: 'LOAD_Bridge' };

        case 'SET_Bridge':
            return { ...state, bridgeContract: action.payload, bridgeState: 'READY' };

        case 'Bridge_ERROR':
            return { ...state, bridgeContract: null, bridgeState: 'ERROR' };



        case 'LOAD_Federation':
            return { ...state, federationState: 'LOAD_Federation' };

        case 'SET_Federation':
            return { ...state, federationContract: action.payload, federationState: 'READY' };

        case 'Federation_ERROR':
            return { ...state, federationContract: null, federationState: 'ERROR' };




        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
};
export default reducer
