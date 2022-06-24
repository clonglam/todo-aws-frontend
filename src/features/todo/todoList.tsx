import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  todoCompleted,
  todoDeleted,
  todoUpdated,
  getTodosAsync,
} from "./todosSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const TodoList = () => {
  const todosList = useAppSelector((state) => state.todos.list);
  const dispatch = useAppDispatch();
  const [selectedEditField, setSelectedEditField] = useState("-99999");
  const [editField, setEditField] = useState("");
  const todosStat = useAppSelector((state) => state.todos.status);

  useEffect(() => {
    if (todosStat === "fulfilled") dispatch(getTodosAsync());
  }, [todosStat, dispatch]);

  const editHadler = (id: string) => {
    if (selectedEditField !== id) {
      setSelectedEditField(id);
      const idx = todosList.findIndex((todo) => todo.id === id);
      setEditField(todosList[idx].text);
    } else {
      setSelectedEditField("-99999");
    }
  };

  const updateHandler = (id: string) => {
    const idx = todosList.findIndex((todo) => todo.id === id);
    const updatedTodo = {
      id,
      text: editField,
      completed: todosList[idx].completed,
    };
    dispatch(todoUpdated(updatedTodo));
    setSelectedEditField("-99999");
  };

  return (
    <div>
      {todosList.map((todo) => (
        <div key={todo.id} className="todoItem">
          {todo.id !== selectedEditField ? (
            <p
              onClick={() => dispatch(todoCompleted(todo.id))}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </p>
          ) : (
            <div>
              <input
                value={editField}
                onChange={(e) => setEditField(e.target.value)}
              ></input>
              <button onClick={() => updateHandler(todo.id)}>update</button>
            </div>
          )}

          <div>
            <button onClick={() => editHadler(todo.id)}>
              <AiOutlineEdit />
            </button>

            <button>
              <AiOutlineDelete onClick={() => dispatch(todoDeleted(todo.id))} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
