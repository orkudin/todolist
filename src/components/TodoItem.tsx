import { useState, useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../context/TodoContext';

interface Props {
  todo: Todo;
  showStatus: boolean;
}

const TodoItem = ({ todo, showStatus }: Props) => {
  const { deleteTodo, updateTodo, changeStatus } = useContext(TodoContext)!;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleSave = () => {
    updateTodo(todo.id, title, description);
    setIsEditing(false);
  };

  const nextStatus = todo.status === 'in_plans' ? 'in_progress' : todo.status === 'in_progress' ? 'completed' : 'in_plans';

  const statusText = {
    in_plans: '📅 В планах',
    in_progress: '🚀 В работе',
    completed: '✅ Выполнено'
  };

  return (
    <div className={`todo-item ${isEditing ? 'edit-mode' : ''}`}>
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" />
          <button onClick={handleSave}>💾 Сохранить</button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>
          {showStatus && <p className="status-label">{statusText[todo.status]}</p>}
          <p>{todo.description}</p>
          <button onClick={() => setIsEditing(true)}>✏ Редактировать</button>
          <button onClick={() => changeStatus(todo.id, nextStatus)}>{statusText[nextStatus]} </button>
          <button onClick={() => deleteTodo(todo.id)}>❌ Удалить</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
