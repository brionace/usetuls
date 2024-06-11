"use client";
import React, { ReactNode, createContext, useEffect, useReducer } from "react";
import { createClient } from "@/utils/supabase/client";

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
  | "HIDE_TOOL"
  | "SHOW_CATEGORIES"
  | "HIDE_CATEGORIES"
  | "SET_CATEGORIES"
  | "SET_TAGS"
  | "SET_BOOKMARKS"
  | "ADD_BOOKMARK"
  | "DELETE_BOOKMARK"
  | "SET_USER"
  | "SET_PRICING";

type State = {
  showSearch: boolean;
  showAddUrl: boolean;
  showSpinner: boolean;
  showBookmarks: boolean;
  showTool: number | string | null;
  showCategories: boolean;
  categories: any;
  tags: any;
  bookmarks: any;
  user: any;
  pricing: any;
};

const initialState = {
  showSearch: false,
  showAddUrl: false,
  showSpinner: false,
  showBookmarks: false,
  showTool: null,
  showCategories: false,
  categories: [],
  bookmarks: [],
  tags: [],
  user: null,
  pricing: null,
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
    case "SHOW_CATEGORIES":
      return { ...state, showCategories: true };
    case "HIDE_CATEGORIES":
      return { ...state, showCategories: false };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    case "SET_BOOKMARKS":
      return { ...state, bookmarks: action.payload };
    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case "DELETE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((pin: any) => pin !== action.payload),
      };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_PRICING":
      return { ...state, pricing: action.payload };

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

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.auth.getUser();
      const {
        data: { user },
        error,
      } = response;

      if (error) {
        console.error("Error:", error.message);
      }

      if (!user) {
        return;
      }

      dispatch({ type: "SET_USER", payload: user });

      // Get pinned tools
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });
      const data = await res.json();

      dispatch({
        type: "SET_BOOKMARKS",
        payload: data.data.map((bookmark: any) => bookmark.bookmark_id),
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();

      dispatch({ type: "SET_CATEGORIES", payload: data.data });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/tags");
      const data = await response.json();

      dispatch({ type: "SET_TAGS", payload: data.data });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/pricing");
      const data = await response.json();

      dispatch({ type: "SET_PRICING", payload: data.data });
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
