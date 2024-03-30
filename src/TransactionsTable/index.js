import { Button, Radio, Select, Table } from "antd";
import React, { useState } from "react";
import "./styles.css";
import searchImg from "../components/Images/magnifying-glass-solid.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
function TransactionsTable({ transactions,addTransaction ,fetchTransactions}) {
  const { Option } = Select;
  const [sortKey, setSortKey] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tage",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );
  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  function exportCSV() {
    var csv = unparse({
      fields: ["name", "type", "amount", "tag", "date"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download ="transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 
  };
  async function importCSV(event){
    event.preventDefault();
    console.log("importCSV");
    try{
     parse(event.target.files[0], {
        header : true,
        complete: async function(results){
          for( const transaction of results.data){
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            }
          await addTransaction(newTransaction);

          }
        }
      })
      fetchTransactions();
      event.target.files = null;
      toast.success("All transactions Added");

    }catch(e){
      console.log(e.message);
      toast.error(e.message);
    }
  }
  return (
    <>
      <div className="search-div">
        <div className="input-flex">
          {/* <i class="fa-solid fa-magnifying-glass" style="color: #a5b4c0;"></i> */}
          <img src={searchImg} width="16" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
          />
          <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
      </div>
      <div style={{ margin: "auto", width: "95%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h3>My Transactions</h3>
          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              width: "300px",
            }}
          >
            <button className="btn" onClick={exportCSV}>
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              onChange={importCSV}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table dataSource={sortedTransactions} columns={columns} />
      </div>
    </>
  );
}

export default TransactionsTable;
