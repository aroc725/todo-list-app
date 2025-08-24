import TodoItem from './TodoItem';

const TodoList = ({ todos, handleDelete, handleToggle }) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="no-todos">No todos yet. Add one above!</p>
      ) : (
        todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;