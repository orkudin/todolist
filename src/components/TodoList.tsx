import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos } = useTodoContext()!;
  const [filter, setFilter] = useState<'all' | 'in_plans' | 'in_progress' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || todo.status === filter;
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Поле поиска */}
      <input 
        type="text" 
        placeholder="🔍 Поиск задач..." 
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Фильтры */}
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Все</button>
        <button className={filter === 'in_plans' ? 'active' : ''} onClick={() => setFilter('in_plans')}>📅 В планах</button>
        <button className={filter === 'in_progress' ? 'active' : ''} onClick={() => setFilter('in_progress')}>🚀 В работе</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>✅ Выполнено</button>
      </div>

      {/* Список задач */}
      <div className="todo-container">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} showStatus={filter === 'all'} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
