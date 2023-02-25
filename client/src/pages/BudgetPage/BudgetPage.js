import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Budget from "../../components/Budget/Budget";
import Remaining from "../../components/Budget/Remaining";
import ExpenseTotal from "../../components/Budget/ExpenseTotal";
import ExpenseList from "../../components/Budget/ExpenseList";
import AddExpenseForm from "../../components/Budget/AddExpenseForm";
import { BudgetProvider } from "../../context/budget.context";

export default function BudgetPage() {
  return (
    <BudgetProvider>
 <div className="container">
      <h1 className="mt-3">My Budget</h1>
      <div className="row mt-3">
        <div className="col-sm">
          <Budget />
        </div>
        <div className="col-sm">
          {/* <Remaining /> */}
        </div>
        <div className="col-sm">
          {/* <ExpenseTotal /> */}
        </div>
      </div>
      <h3 className="mt-3"> Expenses</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <ExpenseList />
        </div>
        <h3 className="mt-3">Add expense</h3>
        <div className="mt-3">
          <div className="col-sm">
            <AddExpenseForm />
          </div>
        </div>
      </div>
    </div>
    </BudgetProvider>
   
  );
}
