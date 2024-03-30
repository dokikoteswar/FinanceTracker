import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
// import moment from "moment";
import AddExpense from "../components/Modal/addExpense";
import AddIncome from "../components/Modal/addIncome";
import {  addDoc, collection, deleteDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../TransactionsTable";
import moment from "moment";
import ChartsComponent from "../components/Charts";
import NoTransaction from "../components/Notransactions";

function Dashboard() {

  const[transactions, setTransections]= useState([]);
  const[loading, setLoading]=useState(false);
  const[user]=useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome]= useState(0);
  const[expense, setExpense] =useState(0);
  const[totalBalance, setTotalBalance]=useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
    console.log("Expanse");
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
    console.log("Incomee");
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish=(values, type)=>{
    // const formattedDate = values.date.$d.toISOString().split('T')[0].replace(/-/g, '-');
    // console.log(formattedDate);
  console.log(values.date)
    console.log(`${values.date.$D}-${values.date.$M+1}-${values.date.$y}`);
     const newTransaction={
      type:type,
      date: values.date.format("YYYY-MM-DD"),
     
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name
     };
     
     addTransaction(newTransaction);
  }
  async function addTransaction(transaction, many){
    // add doc
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document writtern with ID:",  docRef.id);
      if(!many) toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      calculateBalance();

    } catch (e) {
      console.log("Error adding document:",e);
      
      if(!many)toast.error("Couldn't add transaction");
    }
  }
  useEffect(()=>{
    // get all doc from coollection firebase
    fetchTransactions();
  },[user]);


  useEffect(()=>{
    // get all doc from coollection firebase
    calculateBalance();
  },[transactions]);

  function calculateBalance(){
    let incomeTotal =0;
    let expenseTotal =0;
    transactions.forEach((transaction)=>{
      if(transaction.type === "income"){
        incomeTotal+=transaction.amount;
      }else{
        expenseTotal+=transaction.amount;
      }

    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal-expenseTotal);
        
  };
  //  here fetch All traction
  async  function fetchTransactions(){
    console.log("fetch All");
    setLoading(true);
    if(user){
      const q = query(collection(db, `users/${user.uid}/transactions`))
      const querySnapshot = await getDocs(q);
      let transactionArray =[];
      querySnapshot.forEach((doc) => {
        transactionArray.push(doc.data());
        
      });
      setTransections(transactionArray);
      console.log("all Traction", transactionArray);
      toast.success("Transaction Fetched");
    }else{
      toast.error("No User")
    }
    setLoading(false);
  }
  let sortedTransactions=transactions.sort((a,b)=>{
    
    return new Date(a.date)- new Date(b.date);
  }
  );
  const collectionDelete = async()=>{

    try{
   
     const allDocuments = await getDocs(collection(db, `users/${user.uid}/transactions`))
   
     allDocuments.forEach(async(doc) => {
       await deleteDoc(doc.ref);
   
     });
     fetchTransactions();
   
    }
    catch(error){
      console.log(error);
    }
     toast.success('Reset Balance',{
       position: "top-right",
       theme: `${localStorage.getItem('theme')}`
     })
   }
  
  return (
    <div>
      <Header />
      {loading ? (<p>loading...</p>):
     ( <>
      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        collectionDelete={collectionDelete}
      />
        {transactions && transactions.length!=0 ? <ChartsComponent sortedTransactions={sortedTransactions}/>:(<NoTransaction/>)}
      <AddExpense 
      
      isExpenseModalVisible={isExpenseModalVisible}
      handleExpenseCancel={handleExpenseCancel}
      onFinish={onFinish}
      />
      <AddIncome
      isIncomeModalVisible={isIncomeModalVisible}
      handleIncomeCancel={handleIncomeCancel}
      onFinish={onFinish}
      />
      <TransactionsTable transactions={transactions}
          addTransaction={addTransaction}
          fetchTransactions={fetchTransactions}/>

      </>)}
      
    </div>
  );
}

export default Dashboard;
