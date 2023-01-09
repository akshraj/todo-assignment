import React, { useState } from "react";
import { useActions } from "../../hooks/useActions";
import Todo from "../todo";
import "./todos.scss";

export default function Todos({ todos }) {
  const { editTodo,editModalOpen,editModalClose } =
    useActions();
  const [todoId, setTodoId] = useState(null);

  const openEditModal = (id) => {
    editModalOpen();
    setTodoId(id);
  };

  const editTodoHandle = (title) => {
    editTodo({ todoId, title });
    editModalClose()
  };

  return (
    <div className="todos">
      {todos?.length > 0
        ? todos?.map((todo) => (
            <Todo
              key={todo.id}
              {...todo}
              openEditModal={({ id }) => openEditModal(id)}
              editTodoHandle={(title) => editTodoHandle(title)}
            />
          ))
        : "No todo found!"}
    </div>
  );
}
