import React from 'react';
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button/Button";

function Cards({
    showExpenseModal,
    showIncomeModal,
    income,
    expense,
    balance,
}) {

    return (
        <div>
            <Row className='humble-row'>
                <Card className=' humble-card' title="Current Balance">
                    <p>Current balance = ${balance}</p>
                    <Button text={"Reset Balance"} blue={true} />
                </Card>
                <Card className=' humble-card' title="Total Income">
                    <p>${income}</p>
                    <Button text={"Add Income"} clickF={showIncomeModal} blue={true} />
                </Card>
                <Card className=' humble-card' title="Total Expenses">
                    <p>${expense}</p>
                    <Button text={"Add Expenses"} blue={true} clickF={showExpenseModal} />
                </Card>
            </Row>
        </div>
    )
}

export default Cards
