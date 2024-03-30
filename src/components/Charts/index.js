import React from "react";
import "./styles.css";
import { Line, Pie } from "@ant-design/charts";
function ChartsComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  let spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });
  let newSpendings = [
    { tag: "food", amount: 0},
    { tag: "shoping", amount: 0 },
    { tag: "rechage", amount: 0 },
    { tag: "traval", amount: 0 },
    { tag: "movie", amount: 0 },
    { tag: "education", amount:0 }
    ,
    { tag: "other", amount: 0 },
  ];
  spendingData.forEach((item) => {
    if (item.tag == "food") {
      newSpendings[0].amount += item.amount;
    } else if (item.tag == "shoping") {
      newSpendings[1].amount += item.amount;
    } else if (item.tag == "rechage") {
      newSpendings[2].amount += item.amount;
    } else if (item.tag == "traval") {
      newSpendings[3].amount += item.amount;
    } else if (item.tag == "movie") {
      newSpendings[4].amount += item.amount;
    }else if (item.tag == "education") {
        newSpendings[5].amount += item.amount;
      }else{
        newSpendings[6].amount += item.amount;
      }
  });

  console.log(newSpendings);
    const spendingConfig = {
      data: newSpendings,
      witdh: 200,
      angleField: "amount",
      colorField: "tag",
    };
  const config = {
    data,
    xField: "date",
    yField: "amount",
    witdh: 500,
    height: 300,
    autoFit: false,
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  let chart;
  let pieChart;

  return (
    <div className="charts">
      <div className="grap-card">
        <h4>Financial Statistics</h4>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="pie-card">
        <h4> Total Spending</h4>
        <Pie className="pie-main"
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
}

export default ChartsComponent;
