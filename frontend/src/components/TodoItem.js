const TodoItem = ({ todo, handleDelete, handleToggle }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <button 
        onClick={() => handleDelete(todo.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;