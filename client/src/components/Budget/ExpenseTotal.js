import React,{useContext} from 'react'
import { BudgetContext } from '../../context/budget.context'



export default function ExpenseTotal() {

  const {expenses}=useContext(BudgetContext);

  const totalExpenses = expenses.reduce((total,item)=>{
    return (total += item.price);
      },0);


  return (
    <div className='alert alert-primary' >
        <span>Expense total: {totalExpenses} $</span>
    </div>
  )
}