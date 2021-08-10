import React, { useEffect, useState } from 'react';
import '../component-styles/popupMessage.css';
import cross from '../component-styles/cross-white.png';

const PopupMessage = (props) => {
    const [popupstate,setpopupstate] = useState(props.popupstate);
    const [message, setMessage] = useState(props.message)

    useEffect(() => {
        setTimeout(() => setpopupstate(false), 5000);
    },[]);
   
    const close = () => {
        setpopupstate(false)
    }

    if(popupstate){
        return(
            <div id="popup" className="popup-card-holder">
                <div className="popup-card">
                    <div onClick={close} className="image"><img src={cross} alt="X"/></div>
                    <p>{message}</p>
                    {popupstate}
                </div> 
            </div>
        );
    }
    else{
        return(null);
    }
    
}

export default PopupMessage;