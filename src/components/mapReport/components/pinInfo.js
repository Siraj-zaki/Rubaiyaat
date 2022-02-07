import React from 'react';

function PinInfo(props) {
    return <div className="pin-info">
        <p>Pin Info</p>
        {props.pinInfo}
    </div>
}

export default PinInfo;