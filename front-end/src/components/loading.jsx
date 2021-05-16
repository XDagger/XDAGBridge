export default function Loading(props){
    const {showLoading,tips} = props;
    return(
        <div>  {
            showLoading && <div>

                <div id="modal-overlay" />
                <div className='modal-box'>
                    <div className="modal3">
                        <div className='flexBox'>
                            <div className="la-timer la-2x">
                                <div />
                            </div>
                            <div className='tips'>
                                {tips}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        }

        </div>
        )
}
