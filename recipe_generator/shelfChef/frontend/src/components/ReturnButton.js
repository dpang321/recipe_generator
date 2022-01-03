import React from "react";
import "../css/ReturnButton.css"

// this component displays a return button 
// toggle is used to handle onClick event for the button
// message is used as the text for inside the button
// className specifies which css styling to use for the button
const ReturnButton = ({toggle, message, className}) => {
    return (
        <div>
            <button className={className} onClick={toggle} value="Back">{message}</button>
        </div>
    );
}

export default ReturnButton