import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 16 }}>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Add todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button
        onClick={addTodo}
        style={{ padding: "8px 16px", marginBottom: 16 }}
      >
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              margin: "8px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
