import React, { useContext } from 'react'
import { BudgetContext } from '../../context/budget.context'

export default function Remaining() {

  const {expenses,budget}=useContext(BudgetContext);
  // for saving 30%
      const minBudget = budget * 0.7  
  const totalExpenses = expenses.reduce((total,item)=>{
return (total = total + item.price);
  },0);
  

  const alertType = totalExpenses > minBudget ? "alert-danger" : "alert-success"

  return (
    <div className={`alert ${alertType}`} >
        <span>Remaining: {budget - totalExpenses}$</span>
    </div>
  )
}