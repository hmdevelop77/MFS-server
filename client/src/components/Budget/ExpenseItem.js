import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { BudgetContext } from "../../context/budget.context";
import { exampleService } from "../../services/example.service";

export default function ExpenseItem(props) {
 const {dispatch}= useContext(BudgetContext)

const itemId = props.id
async function handleDeleteItem(){
    dispatch({
      type:"DELETE_EXPENSE",
      payload:itemId,
    });

 console.log("item:",itemId)
    await exampleService.deleteItem(
      itemId
    );
   };
 

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.item}
      <div>
        <span className="badget badget-primary badget-pill mr-3">
          {props.price}$
        </span>
        <TiDelete size="2rem" onClick={handleDeleteItem}></TiDelete>
      </div>
    </li>
  );
}
