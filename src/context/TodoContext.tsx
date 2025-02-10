import { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import { Todo } from '../types/Todo';
import { v4 as uuidv4 } from 'uuid';

// Интерфейс для значений контекста.  Использование undefined больше не нужно.
interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string, description?: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string, description?: string) => void;
  changeStatus: (id: string, newStatus: Todo['status']) => void;
}

// Создаем контекст.  Указываем тип и начальное значение (пустой объект,
// чтобы избежать undefined).  Это избавит от необходимости проверки на
// undefined при использовании контекста.  Начальные функции-заглушки.
const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  changeStatus: () => {},
});

// Создаем кастомный хук для удобного доступа к контексту.
// Это хороший тон, чтобы избежать повторяющегося вызова useContext.
//  Также, добавляем проверку на использование вне провайдера.
const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

// Провайдер контекста
const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Используем useCallback для мемоизации функций.  Это предотвращает
  // ненужные перерисовки компонентов, которые используют эти функции
  // из контекста.  Зависимости указываем явно.
  const addTodo = useCallback((title: string, description?: string) => {
    const newTodo: Todo = { id: uuidv4(), title, description, status: 'in_plans' };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, title: string, description?: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title, description } : todo))
    );
  }, []);

  const changeStatus = useCallback((id: string, newStatus: Todo['status']) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, status: newStatus } : todo))
    );
  }, []);

  // Передаем значения в провайдер.
  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo, changeStatus }}>
      {children}
    </TodoContext.Provider>
  );
};

// Экспортируем и провайдер, и хук.
export { TodoProvider, useTodoContext };