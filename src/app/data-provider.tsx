"use client";
import React, { createContext, useReducer } from "react";

type Type =
  | "SHOW_SEARCH"
  | "HIDE_SEARCH"
  | "SHOW_ADDURL"
  | "HIDE_ADDURL"
  | "SHOW_SPINNER"
  | "HIDE_SPINNER"
  | "SHOW_BOOKMARKS"
  | "HIDE_BOOKMARKS"
  | "SHOW_TOOL"
  | "HIDE_TOOL";

type State = {
  showSearch: boolean;
  showAddUrl: boolean;
  showSpinner: boolean;
  showBookmarks: boolean;
  showTool: number | null;
};

const initialState = {
  showSearch: false,
  showAddUrl: false,
  showSpinner: false,
  showBookmarks: false,
  showTool: null,
};

const reducer = (state: State, action: { type: Type; payload: any }) => {
  switch (action.type) {
    case "SHOW_SEARCH":
      return { ...state, showSearch: true };
    case "HIDE_SEARCH":
      return { ...state, showSearch: false };
    case "SHOW_ADDURL":
      return { ...state, showAddUrl: true };
    case "HIDE_ADDURL":
      return { ...state, showAddUrl: false };
    case "SHOW_SPINNER":
      return { ...state, showSpinner: true };
    case "HIDE_SPINNER":
      return { ...state, showSpinner: false };
    case "SHOW_BOOKMARKS":
      return { ...state, showBookmarks: true };
    case "HIDE_BOOKMARKS":
      return { ...state, showBookmarks: false };
    case "SHOW_TOOL":
      return { ...state, showTool: action.payload };
    case "HIDE_TOOL":
      return { ...state, showTool: null };

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
