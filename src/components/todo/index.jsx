import React, { useState } from "react";
import "./todo.scss";
import EditIcon from "../../assets/image/pen-solid.png";
import DeleteIcon from "../../assets/image/trash-solid.png";
import { useActions } from "../../hooks/useActions";
import useAuth from "../../hooks/useAuth";

export default function Todo({ title, id, isCompleted }) {
  const { deleteTodo, completeTodo, getTodo, editModalOpen } = useActions();
  const { user } = useAuth();
  const [isChecked, setIsChecked] = useState(isCompleted);

  const openEditModalHandler = (id) => {
    getTodo(id);
    editModalOpen();
  };

  const deleteTodoHandler = () => {
    deleteTodo(id);
  };

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    completeTodo({ id, isChecked: isChecked ? false : true, userId: user?.id });
  };

  return (
    <div className="todo">
      <div className="todo__container">
        <div className="todo__info">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            id={title}
            name={title}
            value={title}
          />
          <p
            style={{
              textDecoration: isChecked ? "line-through" : "none",
              color: isChecked ? "#537178" : "inherit",
            }}
          >
            {title}
          </p>
          <hr />
        </div>
        <div className="todo__actions">
          <img src={EditIcon} alt="" onClick={() => openEditModalHandler(id)} />
          <img src={DeleteIcon} alt="" onClick={deleteTodoHandler} />
        </div>
      </div>
    </div>
  );
}
