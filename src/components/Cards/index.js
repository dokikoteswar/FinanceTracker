import React from "react";
import "./styles.css"
import { Button, Card, Row } from "antd";
function Cards({showExpenseModal, showIncomeModal , income,
    expense,
    totalBalance, collectionDelete}){
    console.log("Cards")
    return (
    <div>
        <Row className="my-row">
            <Card className="my-card" title="Current Balance">
            <p>₹{totalBalance}</p>
            <Button  type="primary" onClick={collectionDelete}>Reset Balance</Button>
            </Card>
            <Card className="my-card" title="Total Income">
            <p>₹{income }</p>
            <Button  type="primary" onClick={showIncomeModal}>Add Income</Button>
            </Card>
            <Card className="my-card" title="Total Expenses">
            <p>₹{expense}</p>
            <Button  type="primary"  onClick={showExpenseModal}>Add Expenses</Button>
            </Card>
            
            
        </Row>
     </div>
    )
}

export default Cards;