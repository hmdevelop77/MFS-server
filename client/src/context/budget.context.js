import { createContext, useReducer,useState, useEffect  } from "react";
// import {updatedBudget} from "../../services/example.service"

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
      case 'SET_BUDGET':
			return {
				...state,
				budget: action.payload,
			};
    default:
      return state;
  }
};

//  function allItems(){
//   const [items, setItems] = useState()
//   useEffect(()=>{
//     async function handleGetAllItem(){
//       const response = await updatedBudget();
//       setItems(response.data);
//     }
//     handleGetAllItem();
//   },[])
//   return (
    
//   )
// }

const initialState = {
  budget: 2000,
  expenses: [
    { id: 12, item: "ship", price: 10 },
    { id: 13, item: "holys", price: 20 },
  ],
};


export const BudgetContext = createContext();

export const BudgetProvider = (props) => {
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
