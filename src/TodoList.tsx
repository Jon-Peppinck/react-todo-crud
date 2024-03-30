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
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={() =>
              updateTodo({
                id: todo.id,
                description: todo.description,
                isDone: !todo.isDone,
              })
            }
          />
          <span
            style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
          >
            {todo.description}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
