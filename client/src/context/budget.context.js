import { createContext, useReducer, useState, useEffect } from "react";
import { exampleService } from "../services/example.service";

const BudgetReduceur = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };

      case "GET_ALL_EXPENSES":
      return {
        ...state,
        expenses: action.payload
      };
    default:
      return state;
  }
};

export const BudgetContext = createContext();

export const BudgetProvider = (props) => {
  const [items, setItems] = useState([]);

  async function handleGetAllItem() {
    const response = await exampleService.getBudget();
    setItems(response.data);
    dispatch({
			type: 'GET_ALL_EXPENSES',
			payload: response.data,
		});
    console.log("expenses", response.data)
    return response.data;
  }

  useEffect(() => {
    handleGetAllItem();
  }, []);



  const initialState = {
    budget: 2000,
    expenses: [],
  };
  const [state, dispatch] = useReducer(BudgetReduceur, initialState);
  return (
    <BudgetContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        dispatch,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};
