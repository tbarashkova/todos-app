"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

const TodosContext = createContext();

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
export const TodosProvider = ({ children }) => {
  const todosReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, action.payload];
      case "TOGGLE_COMPLETE":
        return state.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: action.payload.completed,
                successTime: action.payload.successTime,
              }
            : todo
        );
      case "UPDATE_TODO":
        return state.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        );
      case "DELETE_TODO":
        return state.filter((todo) => todo.id !== action.payload.id);
      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(todosReducer, [], () => {
    if (global?.window !== undefined) {
      // Now it's safe to access window and localStorage
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
