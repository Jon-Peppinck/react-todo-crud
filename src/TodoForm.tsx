import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description.trim()) {
      addTodo(description);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter todo description"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
