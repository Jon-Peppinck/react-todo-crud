import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Todo } from './types';

const URL = 'http://<Public IPv4 address>:3000';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${URL}/todo`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (description: string) => {
    try {
      const response = await fetch(`${URL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description,
          isDone: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updatedData: Todo) => {
    try {
      const response = await fetch(`${URL}/todo/${updatedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo = await response.json();

      const updatedTodos = [...todos].map((t) => {
        if (t.id === updatedData.id) {
          return updatedTodo;
        }
        return t;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${URL}/todo/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      const updatedTodos = [...todos].filter((t) => t.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      {todos.length > 0 && (
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
};

export default App;
