export default function Success(props){
    const {showLoading} = props;
    return(
        <div>  {
            showLoading && <div>

                <div id="modal-overlay" />
                <div className='modal-box'>
                    <div className="modal3">
                        <div className='flexBox'>
                            <div className="animate-container">
                                <span className="sa-line sa-tip animateSuccessTip" />
                                <span className="sa-line sa-long animateSuccessLong" />
                                <div className="animate-before">
                                    <div className="circle">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        }

        </div>
    )
}
