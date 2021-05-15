import api from "../api";
import {useSubstrate} from "../api/contracts";

export default  function HeaderTop() {
    const {state,dispatch} = useSubstrate();
    const {allAccounts} = state;

    const connectWallet = async () => {
        await api.Account.accountlist().then(data => {
            if (data.type === 'success') {
                dispatch({type: 'SET_ALLACCOUNTS',payload:data.data});
            }
        });
    }

     return(
         <div className="main-nav">
             <div className="container">
                 <header className="group top-nav">
                     {
                         !allAccounts && <button className='buttonWhite buttonAct' onClick={connectWallet}>connect Wallet</button>
                     }
                     {
                         allAccounts && <span>{allAccounts}</span>
                     }
                 </header>
             </div>
         </div>
     )
}
