import React, { useState,useEffect } from 'react';
import api from '../api'
import {useSubstrate} from "../api/contracts";

export default function ConvertToken(){

    const {state,dispatch} = useSubstrate();

    const [fromNK, setFromNK] = useState('XDAG');
    const [toNK, setToNK] = useState('ETH');
    const [address, setAddress] = useState('');

    const {web3Api,federationContract,bridgeContract} = state;

    useEffect(()=>{
        // if(!api.indexApi) return;


        api.indexApi.getStatus().then(result=>{
            console.log(result)
        })

        api.indexApi.search('X4q7Rm1z0JiNpyVq+Vq2EuyivA2zuRDy').then(result=>{
            console.log(result)
        })


        // let obj={"method":"xdag_state", "params":[], "id":1}
        // api.indexApi.xdag(obj).then((result) => {
        //   console.log(result)
        // });
        //
        // let obj2={"method":"xdag_get_account", "params":["20"], "id":1}
        // api.indexApi.xdag(obj2).then((result) => {
        //   console.log(result)
        // });
        //
        // let obj3={"method":"xdag_get_balance", "params":["X4q7Rm1z0JiNpyVq+Vq2EuyivA2zuRDy"], "id":1}
        // api.indexApi.xdag(obj3).then((result) => {
        //   console.log(result)
        // });

        dispatch({type: 'LOAD_AllowTokens'});
        dispatch({type: 'LOAD_Bridge'});
        dispatch({type: 'LOAD_Federation'});
    },[])
    useEffect(()=>{
        if(federationContract== null ) return;

        // let data =federationContract.methods.getMembers().call();
        // console.log(data)

    },[federationContract])
    // useEffect(()=>{
    //     if(bridgeContract== null ) return;
    //
    //     console.log("=====--===",bridgeContract.methods.calcMaxWithdraw)
    //     let data = bridgeContract.methods.calcMaxWithdraw().call();
    //     console.log("=====--===",data)
    //
    // },[bridgeContract])

    const changeToken = () => {
        // [fromNK,toNK] = [toNK,fromNK]
        let switchToken = fromNK;
        setFromNK(toNK);
        setToNK(fromNK)
    }
    return(
        <div className="work section second">
            <div className="container">
                <h1>Convert<br/>Tokens</h1>
                <div className="is-row">
                    <div className="nwchange">
                        <span>{fromNK}</span>
                        <button onClick={changeToken}>
                            <i className='icon fa-exchange' />
                        </button>

                        <span>{toNK}</span>
                    </div>
                </div>
                {
                    toNK === 'XDAG' && <div >
                        <div className="transfer">
                            <div>
                                <div className="form-group">
                                    <input  type="text" value={address} placeholder='Address'
                                           className="outline form-control text-center align-center"  />
                                </div>
                            </div>
                            <div>
                                <div className="form-group amount">
                                    <input name="amount" id="amount" type="number" min="0" step="any" placeholder='Amount'
                                           className="outline form-control text-center align-center"  />
                                </div>
                            </div>
                        </div>
                        <div className='tips'>
                            <div>Service fee: 0</div>
                            <div> Total cost: <span>0</span></div>
                        </div>
                        <div className='btnGrop'>
                            <button className='button button--wayra'>convert tokens</button>
                        </div>
                        <div className='transferTips'>
                            Your wallet will open and you will be asked to <br/>confirm the first of two transactions required for the bridge.
                        </div>
                    </div>
                }
                {
                    toNK === 'ETH' && <div >
                        test description
                    </div>
                }

            </div>
        </div>
    )
}
