import React, { useState,useEffect } from 'react';
import api from '../api'
import {useSubstrate} from "../api/contracts";
import Description from './description'

import Web3 from "web3";
import Web3Modal from "web3modal";
import { network, etherscanBase, loadBridgeContract,bridgeAddress,loadeXDAGContract,eXDAGAddress } from '../Constants';


const NETWORK = network;

const providerOptions = {};
const web3Modal = new Web3Modal({
    network: NETWORK, // optional
    cacheProvider: true, // optional
    providerOptions // required
});
const web3 = new Web3(Web3.givenProvider);




export default function ConvertToken(){

    const {state} = useSubstrate();

    const [fromNK, setFromNK] = useState('XDAG');
    const [toNK, setToNK] = useState('ETH');
    const [address, setAddress] = useState('X4q7Rm1z0JiNpyVq+Vq2EuyivA2zuRDy');
    const [amount, setAmount] = useState('20');

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [provider, setProvider] = useState(null);

    const [status, setStatus] = useState('notconnected');// eslint-disable-line

    const [otherError, setOtherError] = useState('');

    const [bridge, setBridge] = useState(null);
    const [sentTxError, setSentTxError] = useState('');
    const [allowance, setallowance] = useState(0);

    const {allAccounts} = state;

    useEffect(()=>{

        api.indexApi.balance(address).then(result=>{
            console.log(result)
        })

    },[])
    useEffect(()=>{
        // if(web3Api== null || !allAccounts) return;
        //
        // const getBalance = async()=>{
        //     let ethBalance =await web3Api.eth.getBalance(allAccounts)
        //     console.log(ethBalance)
        //
        // }
        // getBalance()

    },[allAccounts])

    const getAllowance = async (token) => {
        const allowance = await token.methods.allowance(allAccounts, bridgeAddress).call();

        console.log("My allowance: ", web3.utils.fromWei(allowance));
        setallowance(web3.utils.fromWei(allowance))
    }

    async function connectWeb3() {
        setStatus('notconnected');
        const provider = await web3Modal.connect();
        const mnemonic = "grace flock large very garbage cruise salad street wrap loan tide volume";
        if (provider) {
            if (provider.on) {
                provider.on("accountsChanged", (acc) => {
                    console.log(acc);
                    // setAccounts(acc);
                });
                provider.on("chainChanged", (chainId) => {
                    console.log(chainId);
                    window.location.reload()
                });
                provider.on("connect", (info) => { // : { chainId: number }
                    console.log(info);
                });
                provider.on("disconnect", (error) => {  // : { code: number; message: string }
                    console.log(error);
                });
            }


            setProvider(provider);
            const web3Instance = new Web3(provider);
            const contract = loadBridgeContract(web3Instance);
            setBridge(contract)

            try {
                setStatus('ready');
            } catch (err) {
                setStatus('error');
                setOtherError(`Error: ${err.message}. Please refresh or try with another network connection.`);
                throw err;
            }
        }
    }
    useEffect(() => {
        connectWeb3();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


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
    const handleSubmit = async () =>{
        const web3Instance = new Web3(provider);
        const XDAGcontract = loadeXDAGContract(web3Instance);
        getAllowance(XDAGcontract)

        if (allowance < amount) {
                const totalSupply = await XDAGcontract.methods.totalSupply().call();

                await XDAGcontract.methods.approve(bridgeAddress, web3.utils.toWei(amount.toString())).send({ from: allAccounts }).then(data => {
                    console.log('transactionHash', data);
                    // settips('transactionHash')
                    // settransactionHash(data.transactionHash)
                }).catch(err => {
                    setshowLoading(false)
                });

        } else {
            console.log('Already have enough allowance!');
        }

        try {
            const tokens = await bridge.methods
                .receiveTokens(web3.utils.toWei(amount.toString()),address)
                .send({from: allAccounts});
            console.log(tokens)

        } catch (err) {
            console.error(err.message)
            setSentTxError(err.message);
        }



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
