import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

const AddTodo = () => {
  const { addTodo } = useTodoContext()!;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Описание (необязательно)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddTodo;
