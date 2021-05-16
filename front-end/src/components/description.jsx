import React, {useState} from "react";

export default function Description(){

    const [show, setShow] = useState(false);
    const clipboard = ()=>{

            const cInput = document.createElement('input');
            cInput.value = 'JR9X4kDNg6d8gpIMQGe6y1SwZkAPwUq9';
            document.body.appendChild(cInput);
            cInput.select();
            document.execCommand('Copy');
            setShow(true)
        setTimeout(()=>{
            setShow(false)
        },1000)

    }
    return(<div className='XDAGdescription' >
        {
            show && <div>
                <div id="modal-overlay" />
                <div className='modal-box'>
                    <div className="modal modal4">
                            <div>JR9X4kDNg6d8gpIMQGe6y1SwZkAPwUq9 is coped</div>
                    </div>

                </div>
            </div>
        }
        <div>Transfer your XDAG to ( <span className='addressBrdr' onClick={clipboard}>JR9X4kDNg6d8gpIMQGe6y1SwZkAPwUq9</span> ) on XDAG wallet with remark as your Ethereum wallet address.</div>
        <div className='codeBrdr'>xfer [Amount] JR9X4kDNg6d8gpIMQGe6y1SwZkAPwUq9 [Your Ethereum wallet]</div>
        <ul>
            <li><a href="https://github.com/XDagger/xdag/wiki/Get-a-wallet" target="_blank">How to get a wallet</a></li>
            <li><a href="https://github.com/XDagger/xdag/wiki/Getting-started" target="_blank">How to getting started</a></li>
            <li><a href="https://github.com/XDagger/xdag/wiki/Mineable-Pool-List" target="_blank">How to find pools</a></li>
        </ul>
    </div>)
}
