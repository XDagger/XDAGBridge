import React, {useReducer, useContext} from 'react';
import reducer from './reducer';
import INIT_STATE from './initState';
import allowTokensConnect from './allowTokensContract'
import bridgeConnect from './bridgeContract'
import federationConnect from './federationContract'

const Web3 = require('web3');

const SubstrateContext = React.createContext();


const connect = async (state, dispatch) => {
    const {apiState} = state;

    if (apiState) return;

    dispatch({type: 'CONNECT_INIT'});

    const web3 = new Web3(Web3.givenProvider);

    if (web3) {
        dispatch({type: 'CONNECT', payload: web3});
    }

};

const stateChange = async (state, dispatch) => {



    window.ethereum.on('accountsChanged', function (arr) {
        dispatch({type: 'SET_ALLACCOUNTS',payload:arr[0]});
    });
    window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
    });

};
const initState = {...INIT_STATE};

const SubstrateContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);

    connect(state, dispatch);
    stateChange(state, dispatch)
    allowTokensConnect(state,dispatch)
    bridgeConnect(state,dispatch)
    federationConnect(state,dispatch)

    console.log("=====state=====",state);

    return <SubstrateContext.Provider value={{state,dispatch}}>
        {props.children}
    </SubstrateContext.Provider>;
};

const useSubstrate = () => ({...useContext(SubstrateContext)});

export {SubstrateContextProvider, useSubstrate};
