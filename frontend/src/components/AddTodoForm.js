import { useState } from 'react';

const AddTodoForm = ({ handleAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      handleAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="form-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;