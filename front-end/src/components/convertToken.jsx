import React, { useState,useEffect } from 'react';
import api from '../api'
import {useSubstrate} from "../api/contracts";
import Description from './description'
import Loading from './loading'
import Success from "./success";

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
    const [toNK, setToNK] = useState('eXDAG');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [provider, setProvider] = useState(null);
    const [transactionHash, setTransactionHash] = useState('');
    const [TokensTx, setTokensTx] = useState(false);

    const [status, setStatus] = useState('notconnected');// eslint-disable-line

    const [otherError, setOtherError] = useState('');
    const [showLoading, setshowLoading] = useState(false);
    const [showSuccess, setshowSuccess] = useState(false);
    const [tips,setTips]= useState('');
    const [bridge, setBridge] = useState(null);
    const [sentTxError, setSentTxError] = useState('');
    const [allowance, setallowance] = useState(0);
    const [exdagBalance, setExdagBalance] = useState(0);
    const [XDAGcontract, setXDAGcontract] = useState(null);
    const [XDAG, setXDAG] = useState(0);

    const {allAccounts} = state;

    useEffect(()=>{
        if(!TokensTx)return

        let t = setInterval(()=>{
            api.indexApi.balance(address).then(result=>{
                if(!XDAG  || (XDAG && XDAG !== result.balance)){
                    clearInterval(t)
                    setXDAG(result.balance)

                }

            })
        },3000)



    },[TokensTx])

    useEffect(()=>{
        if(allAccounts == null || XDAGcontract == null ) return;

       const getBalance = async () =>{
           const exdagbalance = await XDAGcontract.methods.balanceOf(allAccounts).call();

           setExdagBalance(web3.utils.fromWei(exdagbalance))
       }
        getBalance();

    },[XDAGcontract,allAccounts,TokensTx])

    const getAllowance = async (token) => {
        const allowance = await token.methods.allowance(allAccounts, bridgeAddress).call();
        console.log("My allowance: ", web3.utils.fromWei(allowance));
        setallowance(web3.utils.fromWei(allowance))
    }
    const etherscanTxLink =  (tx) => {
        return `${etherscanBase}/tx/${tx}`;
    }
    const connectWeb3 = async() => {
        setStatus('notconnected');
        const provider = await web3Modal.connect();
        const mnemonic = "grace flock large very garbage cruise salad street wrap loan tide volume";
        if (provider) {
            if (provider.on) {
                provider.on("accountsChanged", (acc) => {
                    console.log(acc);
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

    useEffect(() => {
        if(provider == null) return;
        const web3Instance = new Web3(provider);
        const contract = loadBridgeContract(web3Instance);
        setBridge(contract)
        const XDAGcontract = loadeXDAGContract(web3Instance);
        setXDAGcontract(XDAGcontract)
    }, [provider])


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
        setShow(false)
        setshowLoading(true);
        setTokensTx(false)
        setXDAG(0)

        setTips('Fetch allowance in progress...');

        getAllowance(XDAGcontract);

        if (allowance < amount) {
                setTips('Approve in progress...');
                await XDAGcontract.methods.approve(bridgeAddress, web3.utils.toWei(amount.toString())).send({ from: allAccounts }).then(data => {
                    setTips('approve');
                    setTransactionHash(data.transactionHash)
                }).catch(err => {
                    setshowLoading(false)
                });

        } else {
            console.log('Already have enough allowance!');
        }

        try {
            setTips('Convert eXDAG to XDAG in progress...');
            const tokens = await bridge.methods
                .receiveTokens(web3.utils.toWei(amount.toString()),address)
                .send({from: allAccounts});
            if(tokens.transactionHash){
                setTokensTx(true)
                setshowLoading(false)
                setshowSuccess(true)
                setTimeout(()=>{
                    setshowSuccess(false)
                },2000)
            }


        } catch (err) {
            console.error(err.message)
            setSentTxError(err.message);
        }


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
            <Loading showLoading={showLoading} tips={tips}/>
            <Success  showLoading={showSuccess}/>
            <div className="container top">
                <div>
                    <h1>
                        <span className='title'>{fromNK}</span>
                        <i className='icon fa-exchange h1Icon' onClick={changeToken}/>
                        <span className='title'>{toNK}</span>
                    </h1>
                    {
                        !!exdagBalance && <span className='balance'>eXDAG balance: {exdagBalance} eXDAG</span>
                    }

                </div>

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
                            <div>Service fee: 1%</div>
                            <div> Total cost: <span>{amount * 0.01}</span></div>
                            {
                                TokensTx &&      <div className='xdag'> XDAG balance: <span>{XDAG}</span></div>
                            }

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
                        {
                            transactionHash &&  <div>
                                TX: <a href={etherscanTxLink(transactionHash)} target='_blank'>{transactionHash}</a>
                            </div>
                        }

                    </div>
                }
                {
                    toNK === 'eXDAG' && <Description />
                }

            </div>
        </div>
    )
}
