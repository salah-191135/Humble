import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import { Modal } from 'antd';
import AddExpense from '../components/modals/AddExpense';
import AddIncome from '../components/modals/AddIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import TransactionTable from '../components/TransactionTable';


import { calc } from 'antd/es/theme/internal';
function Dashboard() {
    const [user] = useAuthState(auth);
    const [transactions, setTransactions] = useState([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [income, setIncime] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);

    const showExpenseModal = () => {
        setIsExpenseModalVisible(true);
    };
    function showIncomeModal() {
        setIsIncomeModalVisible(true);
    };
    const handleExpenseCancel = () => {
        setIsExpenseModalVisible(false);
    };
    const handleIncomeCancel = () => {
        setIsIncomeModalVisible(false);
    };

    const onFinish = (value, type) => {
        const newTransaction = {
            type: type,
            date: value.date.format("YYYY-MM-DD"),
            amount: parseFloat(value.amount),
            tag: value.tag,
            name: value.name,
        };
        addTransactions(newTransaction);
        console.log(newTransaction);

    };

    const addTransactions = async (transaction) => {
        try {
            const docref = await addDoc(
                collection(db, `users/${user.uid}/transactions`),
                transaction
            );
            toast.success("transaction added!");
            let arr = transactions;
            arr.push(transaction);
            setTransactions(arr);
            calculateBalance();
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {//for fetching Transactions
        fetchTransactions();
    }, []);
    const fetchTransactions = async () => {
        setLoading(true);
        if (user) {
            // console.log(user);
            const q = query(collection(db, `users/${user.uid}/transactions`));
            // console.log(q);
            const querySnapShot = await getDocs(q);
            let transactionArray = [];
            querySnapShot.forEach(doc => {
                transactionArray.push(doc.data());
            });
            setTransactions(transactionArray);
            // toast.success("transaction fetched!");
        }
        setLoading(false);
    }
    
    useEffect(() => {//for calculating Balance
        calculateBalance();
    }, [transactions]);
    const calculateBalance = () => {
        let totalIncome = 0;
        let totalExpance = 0;
        transactions.forEach(transaction => {
            if (transaction.type === "income")
                totalIncome += transaction.amount;
            else
                totalExpance += transaction.amount;
        });
        setBalance(totalIncome - totalExpance);
        setIncime(totalIncome);
        setExpense(totalExpance);
    }


    return (<>
        <Header />
        {
            loading ?
                <p> loading<p />
                </p> : <>
                    <Cards income={income}
                        expense={expense}
                        balance={balance}
                        showExpenseModal={showExpenseModal}
                        showIncomeModal={showIncomeModal}
                    />
                    <AddIncome
                        isIncomeModalVisible={isIncomeModalVisible}
                        handleIncomeCancel={handleIncomeCancel}
                        onFinish={onFinish}
                    />
                    <AddExpense
                        isExpenseModalVisible={isExpenseModalVisible}
                        handleExpenseCancel={handleExpenseCancel}
                        onFinish={onFinish}
                    />

                    <TransactionTable transactions={transactions} />
                </>
        }
    </>
    );
}

export default Dashboard