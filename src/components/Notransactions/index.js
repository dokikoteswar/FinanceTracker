import { Flex } from "antd";
import React from "react";

function NoTransaction(){
    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "50px"}}>
           <img src="https://financely-finance-tracker.netlify.app/static/media/transactions.004d9f02317991455e50b36d9dae2a26.svg" style={{width:"400px"}}/>
           <h4 style={{textAlign: "center"}}>You have no transactions currently</h4>
        </div>
    )
}


export default NoTransaction;