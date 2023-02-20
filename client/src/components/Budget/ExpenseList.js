import React, { useContext} from "react";
import ExpenseItem from "./ExpenseItem";


 import { BudgetContext } from '../../context/budget.context'

export default function ExpenseList() {
   const {expenses} = useContext(BudgetContext) 

  // const [items, setItems] = useState([]);
  // useEffect(()=>{
  //   async function handleGetAllItem(){
  //     const response = await updatedBudget();
  //     setItems(response.data);
  //   }
  //   handleGetAllItem();
  // },[])

  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <ExpenseItem id={expense.id} item={expense.item} price={expense.price} />
      ))}
    </ul>
  );
}
