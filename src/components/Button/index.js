import React from "react";

import "./styles.css"
function Button({text, onClick, blue,disabled}){
    console.log(blue ,"helel")
    return(
        <div className={blue==true ? "btn btn-blue:" : "btn"} onClick={onClick}>
            {text}
        </div>
    )
}

export default Button;