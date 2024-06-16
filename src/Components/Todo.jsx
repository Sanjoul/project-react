import React, { useEffect, useRef, useState } from "react";

import "./css/Todo.css";
import TodoItems from "./TodoItems";

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input
          type="text"
          placeholder="Add your task"
          className="todo-input"
          ref={inputRef}
        />
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          Add
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <TodoItems
              setTodos={setTodos}
              key={index}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
