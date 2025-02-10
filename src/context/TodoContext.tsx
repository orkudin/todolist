import React, { createContext, useState, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import { v4 as uuidv4 } from 'uuid';

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string, description?: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string, description?: string) => void;
  changeStatus: (id: string, newStatus: Todo['status']) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = { id: uuidv4(), title, description, status: 'in_plans' };
    setTodos(prev => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, title: string, description?: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title, description } : todo))
    );
  };

  const changeStatus = (id: string, newStatus: Todo['status']) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, status: newStatus } : todo))
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo, changeStatus }}>
      {children}
    </TodoContext.Provider>
  );
};
