import React from 'react';
import { Todo } from './types';

interface TodoListProps {
  todos: Todo[];
  updateTodo: (updatedData: Todo) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => {
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>
          <input
            type="checkbox"
            checked={t.isDone}
            onChange={() =>
              updateTodo({
                id: t.id,
                description: t.description,
                isDone: !t.isDone,
              })
            }
          />
          <span style={{ textDecoration: t.isDone ? 'line-through' : 'none' }}>
            {t.description}
          </span>
          <button onClick={() => deleteTodo(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
