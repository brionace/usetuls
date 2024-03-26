"use client";

import React, { createContext, useReducer } from "react";

type Type = "SHOW_SEARCH" | "HIDE_SEARCH";

type State = {
  showSearch: boolean;
};

const initialState = {
  showSearch: false,
};

const reducer = (state: State, action: { type: Type; payload: any }) => {
  switch (action.type) {
    case "SHOW_SEARCH":
      return { ...state, showSearch: true };
    case "HIDE_SEARCH":
      return { ...state, showSearch: false };

    // case "DELETE_TODO":
    //   return {
    //     ...state,
    //     todos: state.todos.filter((todo, index) => index !== action.payload),
    //   };

    // case "EDIT_TODO":
    //   const updatedTodos = state.todos.map((todo, index) =>
    //     index === action.payload.index ? action.payload.newTodo : todo
    //   );
    //   return { ...state, todos: updatedTodos };

    default:
      return state;
  }
};

export const DataContext = createContext({
  state: initialState,
  dispatch: (value: any) => {},
});

export const DataProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
