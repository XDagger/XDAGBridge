import React, { useState,useEffect } from 'react';
import api from '../api'
import {useSubstrate} from "../api/contracts";
import Description from './description'


export default function ConvertToken(){

    const {state,dispatch} = useSubstrate();

    const [fromNK, setFromNK] = useState('XDAG');
    const [toNK, setToNK] = useState('ETH');
    const [address, setAddress] = useState('X4q7Rm1z0JiNpyVq+Vq2EuyivA2zuRDy');
    const [amount, setAmount] = useState('20');

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const {web3Api,federationContract,bridgeContract,allAccounts} = state;

    useEffect(()=>{
        // if(!api.indexApi) return;

        api.indexApi.balance(address).then(result=>{
            console.log(result)
        })

        dispatch({type: 'LOAD_AllowTokens'});
    },[])
    useEffect(()=>{
        if(web3Api== null || !allAccounts) return;

        const getBalance = async()=>{
            let ethBalance =await web3Api.eth.getBalance(allAccounts)
            console.log(ethBalance)

        }
        getBalance()

        // let data =federationContract.methods.getMembers().call();
        // console.log(data)

    },[web3Api,allAccounts])
    // useEffect(()=>{
    //     if(bridgeContract== null ) return;
    //
    //     console.log("=====--===",bridgeContract.methods.calcMaxWithdraw)
    //     let data = bridgeContract.methods.calcMaxWithdraw().call();
    //     console.log("=====--===",data)
    //
    // },[bridgeContract])

    const changeToken = () => {

        if(!allAccounts) {
            setOpen(true)
        }
        setFromNK(toNK);
        setToNK(fromNK)

    }
    const handleChange = (e) =>{
        setAddress(e.target.value)
    }
    const handleAmount = (e) =>{
        setAmount(e.target.value)
    }
    const handleSubmit = () =>{

        let obj={
            address,
            amount
        }
        console.log(obj)
        setShow(false)
    }
    const handleConfirm = () =>{
        if(!allAccounts){
            setOpen(true)
        }else{
            setShow(true)
        }

    }
    return(
        <div className="work section second">
            <div className="container">
                <h1>
                    {fromNK}
                    <i className='icon fa-exchange h1Icon' onClick={changeToken}/>
                    {toNK}
                </h1>
                {
                    toNK === 'XDAG' && <div >
                        <div className="transfer">
                            <div>
                                <div className="form-group">
                                    <input  type="text" value={address} placeholder='Address' onChange={handleChange}
                                           className="outline form-control text-center align-center"  />
                                </div>
                            </div>
                            <div>
                                <div className="form-group amount">
                                    <input name="amount" type="number" min="0" step="any" placeholder='Amount'  onChange={handleAmount}
                                           className="outline form-control text-center align-center"   value={amount} />
                                </div>
                            </div>
                        </div>
                        <div className='tips'>
                            <div>Service fee: 0</div>
                            <div> Total cost: <span>0</span></div>
                        </div>
                        {
                            show && <div>
                                <div id="modal-overlay" />
                                <div className='modal-box'>
                                    <div className="modal">
                                        <div className='modalheader'>
                                            <div>Are you absolutely sure?</div>
                                            <div className="modalClose">
                                                <i className='fa fa-close'  onClick={()=>setShow(false)}/>
                                            </div>
                                            <div className='modalsection'>
                                                <div>
                                                    This action cannot be undone.
                                                </div>
                                                <footer>
                                                    <button className='button button--wayra' onClick={handleSubmit}>confirm</button>
                                                </footer>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        }
                        {
                            open && <div>
                                <div id="modal-overlay" />
                                <div className='modal-box'>
                                    <div className="modal modal2">
                                        <div className='modalheader'>
                                            <div>Please connect wallet</div>
                                            <div className="modalClose">
                                                <i className='fa fa-close'  onClick={()=>setOpen(false)}/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        }

                        <div className='btnGrop'>
                            <button className='button button--wayra' disabled={!allAccounts} onClick={handleConfirm}>convert tokens</button>
                        </div>
                        <div className='transferTips'>
                            Your wallet will open and you will be asked to <br/>confirm the first of two transactions required for the bridge.
                        </div>
                    </div>
                }
                {
                    toNK === 'ETH' && <Description />
                }

            </div>
        </div>
    )
}
