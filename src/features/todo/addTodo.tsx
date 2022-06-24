import React, { useState } from "react";
import { todoAdded, addTodoAsync } from "./todosSlice";
import { AiOutlineSend } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const [todoField, setTodoField] = useState("");
  const todosStat = useAppSelector((state) => state.todos.status);

  function onClickHandler() {
    if (todoField) {
      // check is the server online, if yes dispatch save to server if no save to local
      todosStat === "fulfilled"
        ? dispatch(addTodoAsync(todoField))
        : dispatch(todoAdded(todoField));
      setTodoField("");
    }
  }
  return (
    <>
      <div className="addNewTodoContainer">
        <input
          placeholder="Add new Todo Item"
          onChange={(e) => setTodoField(e.target.value)}
          value={todoField}
        />

        <button onClick={() => onClickHandler()}>
          <AiOutlineSend />
        </button>
      </div>
    </>
  );
};

export default AddTodo;
