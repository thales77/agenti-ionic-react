import { createContext, useReducer } from "react";

const today = new Date();
const endDate = today.toISOString();

const lastMonth = new Date(today.setMonth(today.getMonth(), 0)); //last day of last month
const startDate = lastMonth.toISOString();

const initialState = {
  user: { id: '999', name: 'Babis', surname: 'Boikos' },
  selectedClient: {},
  clientSearchOptions: ['ragioneSociale', 'codiceCliente'],
  selectedItemId: '',
  itemSearchOptions: ['descrizione', 'codiceSider'],
  selectedOrderId: '',
  orderSearchOptions: { startDate, endDate },
  cart: [],
  orderNotes: ''
}

let AppContext = createContext(initialState as any);

let reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setClient": {
      return { ...state, selectedClient: action.client }
    }
    case "setClientSearchOptions": {
      return { ...state, clientSearchOptions: action.clientSearchOptions }
    }
    case "setItem": {
      return { ...state, selectedItemId: action.itemId }
    }
    case "setItemSearchOptions": {
      return { ...state, itemSearchOptions: action.itemSearchOptions }
    }
    case "setOrder": {
      return { ...state, selectedOrderId: action.orderId }
    }
    case "setOrderSearchOptions": {
      return { ...state, orderSearchOptions: action.orderSearchOptions }
    }
    case "addItemToCart": {
      return { ...state, cart: [...state.cart, action.item] }
    }
    case "deleteItemFromCart": {
      return { ...state, cart: state.cart.filter((item: any) => item.unique_id !== action.unique_id) }
    }
    case "updateItemInCart": {
      return { ...state, cart: state.cart.map((item: any) => item.unique_id === action.item.unique_id ? { ...item, quantity: action.item.quantity } : item) };
    }
    case "setOrderNotes": {
      return { ...state, orderNotes: action.notes }
    }
  };
  return state;
};

//add logging capabilities to the reducer for debuging purposes
const logger = (reducer: any) => {
  const reducerWithLogger = (state: any, action: any) => {
    console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", state);
    console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
    console.log("%cNext State:", "color: #47B04B; font-weight: 700;", reducer(state, action));
    return reducer(state, action);
  };
  return reducerWithLogger;
}

//In production remove this function from useReducer() and substitute with reducer() directly
const loggerReducer = logger(reducer);


const AppContextProvider = (props: any) => {

  const fullInitialState = {
    ...initialState,
  }

  let [state, dispatch] = useReducer(loggerReducer, fullInitialState);
  let value = { state, dispatch };


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };