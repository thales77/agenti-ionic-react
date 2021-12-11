import React, { createContext, useReducer } from "react";

const initialState = {
  user: { id: '999', name: 'Babis', surname: 'Boikos' },
  client: {},
  clientSearchOptions: ['ragioneSociale', 'codiceCliente'],
  itemId: '',
  itemSearchOptions: ['descrizione', 'codiceSider'],
  orderId: '',
  orderSearchOptions: { dateFrom: '', dateTo: '' },
  cart: {}
}

let AppContext = createContext(initialState as any);

let reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setClient": {
      return { ...state, client: action.client }
    }
    case "setClientSearchOptions": {
      return { ...state, clientSearchOptions: action.clientSearchOptions }
    }
    case "setItem": {
      return { ...state, itemId: action.itemId }
    }
    case "setItemSearchOptions": {
      return { ...state, itemSearchOptions: action.itemSearchOptions }
    }
    case "setOrder": {
      return { ...state, orderId: action.orderId }
    }
    case "setOrderSearchOptions": {
      return { ...state, orderSearchOptions: action.orderSearchOptions }
    }
  }
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