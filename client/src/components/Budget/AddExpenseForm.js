import React, { useContext, useState } from "react";
import { BudgetContext } from "../../context/budget.context";
import { v4 as uuiv4 } from "uuid";
import {updateBudget} from "../../services/example.service"


export default function AddExpenseForm() {
  const { dispatch } = useContext(BudgetContext);
  const [item, setName] = useState("");
  const [price, setCost] = useState("");

  function HandleChangedName(event) {
    setName(event.target.value);
  }
  function HandleChangedCost(event) {
    setCost(event.target.value);
  }

  async function HandleSubmitForm(event) {
    event.preventDefault();
    const expense = {
      id: uuiv4(),
      item: item,
      price: parseInt(price),
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

await updateBudget({
  item,
  price,
})
  }

  return (
    <form onSubmit={HandleSubmitForm}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="item">Name</label>
          <input
            required="required"
            type="text"
            className="form-control"
            id="item"
            value={item}
            onChange={HandleChangedName}
          ></input>
        </div>
        <div>
          <label htmlFor="price">Cost</label>
          <input
            required="required"
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={HandleChangedCost}
          ></input>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
