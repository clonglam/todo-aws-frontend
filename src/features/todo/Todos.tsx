import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { GrStatusGood, GrStatusCritical, GrStatusInfo } from "react-icons/gr";
import { checkServerStatus } from "./todosSlice";

import TodoList from "./todoList";
import AddTodo from "./addTodo";

const Todos = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkServerStatus());
  }, [dispatch]);
  const todosStat = useAppSelector((state) => state.todos.status);
  return (
    <>
      <div className="objective">
        <ol>
          <li style={{ textDecoration: "line-through" }}>
            Use redux to create a todo list, which included the function
            create.edit,finished,delete
          </li>
          <li style={{ textDecoration: "line-through" }}>
            connect it to AWS dynamo DB{" "}
          </li>
          <li style={{ textDecoration: "line-through" }}>
            Create online and offline version, if the frontend cannect fetch
            data form backend change to the local mode
          </li>
          <li>every fetch is a count QAQ test in offline mode</li>
        </ol>
      </div>

      <div className="ProjectTitleContainer">
        <p className="ProjectTitle">Todos List</p>
        <div className="serverStatusContainer">
          <span> Server Status: </span>
          {todosStat === "fulfilled" ? (
            <GrStatusGood />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Server disconnected </p> <GrStatusCritical />
            </div>
          )}
        </div>
      </div>
      <AddTodo />
      <TodoList />
    </>
  );
};

export default Todos;
