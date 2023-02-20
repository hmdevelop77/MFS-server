import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { BudgetContext } from "../../context/budget.context";

export default function ExpenseItem(props) {
 const {dispatch}= useContext(BudgetContext)

function handleDeleteItem(){
    dispatch({
      type:"DELETE_EXPENSE",
      payload:props.id,
    });
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
