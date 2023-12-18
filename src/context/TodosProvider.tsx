"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface Todo {
  id: string;
  name: string;
  description: string;
  estimatedTime: Date;
  comment: string;
  createdTime?: Date;
  updatedTime?: Date;
  successTime?: Date;
  completed?: boolean;
}

interface TodosContextType {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | {
      type: "TOGGLE_COMPLETE";
      payload: { id: string; completed: boolean; successTime?: Date };
    }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: { id: string } };

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const todosReducer = (state: Todo[], action: TodoAction): Todo[] => {
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
