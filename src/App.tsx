import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=3'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      const initialTodos: Todo[] = data.map((t: any) => ({
        id: t.id,
        description: t.title,
        isDone: t.completed,
      }));
      setTodos(initialTodos);
      console.log(initialTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (description: string) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: description,
            completed: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const newTodo = await response.json();

      const adaptedNewTodo: Todo = {
        id: newTodo.id,
        description: newTodo.title,
        isDone: newTodo.completed,
      };

      setTodos([...todos, adaptedNewTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updatedData: Todo) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${updatedData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo = await response.json();

      const updatedTodos = todos.map((todo) => {
        if (todo.id === updatedData.id) {
          return {
            id: updatedData.id,
            description: todo.description,
            isDone: updatedTodo.isDone,
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
