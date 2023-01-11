import React, { useCallback, useEffect, useState } from "react";
import searchIcon from "../../assets/image/search-solid.png";
import "./dashboard.scss";
import useAuth from "../../hooks/useAuth";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { truncate } from "../../utils/utils";
import {
  Modal,
  Todos,
  Input,
  Card,
  Button,
  Chart,
  Toast,
} from "../../components";
import { toast } from "react-toastify";

const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

export default function Dashboard() {
  const { user } = useAuth();
  const { data, matched, todo } = useSelector((state) => state.todos);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const {
    getTodos,
    searchTodos,
    modalOpen,
    addTodo,
    modalClose,
    editTodo,
    editModalClose,
    deleteModalClose,
    deleteTodo,
  } = useActions();
  const { isOpen, isEditOpen, isDeleteOpen } = useSelector(
    (state) => state.modalState
  );
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todo) {
      setEditTaskTitle(todo?.title);
    }
  }, [todo]);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  useEffect(() => {
    if (matched) {
      setTodos(matched);
    }
  }, [matched]);

  const handleChange = (value = "") => {
    searchTodos(value);
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  useEffect(() => {
    if (user) {
      getTodos(user?.id);
    }
  }, [user]);

  const onClick = () => {
    modalOpen();
    setTask("");
  };

  const completedLength = () => {
    return data?.length > 0
      ? data.filter((todo) => todo.isCompleted).length
      : 0;
  };

  const createTask = (e) => {
    e.preventDefault();
    setError("");
    if (!task) {
      setError("Task is required");
      return;
    }
    const data = {
      id: Math.round(Math.random() * 1000),
      userId: user?.id,
      title: task.trim(),
      isCompleted: false,
    };
    addTodo(data);
    modalClose();
    setTask("");
    toast("Task Created Successfully", {
      position: "top-right",
    });
  };

  const editTask = (e) => {
    e.preventDefault();
    setError("");
    if (!editTaskTitle) {
      setError("Task is required");
      return;
    }
    editTodo({ title: editTaskTitle.trim(), id: todo?.id });
    editModalClose();
    setEditTaskTitle("");
    toast("Task Edited Successfully", {
      position: "top-right",
    });
  };

  const closeModal = () => {
    setError("");
    modalClose();
  };

  const handleDeleteConfirm = (action) => {
    if (action.toLowerCase() === "yes") {
      deleteTodo(todo?.id);
      deleteModalClose();
      toast("Task Deleted Successfully", {
        position: "top-right",
      });
    } else {
      deleteModalClose();
    }
  };

  return (
    <>
      <Toast />
      {data?.length > 0 ? (
        <div className="dashboard">
          <div className="tasks-container">
            <Card height="158px" width="304px">
              <p>Tasks Completed</p>
              <p>
                <span style={{ fontSize: "64px", color: "#5285EC" }}>
                  {completedLength()}
                </span>
                /{data?.length}
              </p>
            </Card>
            <Card height="158px" width="304px">
              <p>Latest Created Tasks</p>
              <ul>
                {data?.length > 0
                  ? data
                      .sort(
                        (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
                      )
                      .slice(0, 3)
                      .map((d) => (
                        <li
                          key={d.id}
                          style={{
                            textDecoration: d.isCompleted
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {truncate(d.title, 20)}
                        </li>
                      ))
                  : null}
              </ul>
            </Card>
            <Card height="158px" width="304px" styls={{ display: "flex" }}>
              <Chart
                total={todos?.length}
                completed={todos?.filter((todo) => todo.isCompleted).length}
              />
            </Card>
          </div>
          <div className="tasks-info">
            <p>Tasks</p>
            <div className="input-container">
              <div className="input">
                <img src={searchIcon} alt="search-icon" />
                <Input
                  placeholder="Search by task name"
                  type="text"
                  onChange={(e) => optimizedFn(e.target.value)}
                />
              </div>
              <Button onClick={onClick}>+ New Task</Button>
            </div>
          </div>
          <Todos todos={todos} />
        </div>
      ) : (
        <div className="dashboard_no_todos">
          <Card width="304px" height="158px">
            <p>You have no task</p>
            <Button
              style={{ width: "124px", display: "block", margin: "0 auto" }}
              onClick={onClick}
            >
              + New Task
            </Button>
          </Card>
        </div>
      )}

      {isOpen ? (
        <Modal>
          <div className="create">
            <Card
              width="296px"
              height="193px"
              onClick={closeModal}
              closeBtn={true}
            >
              <p>+ New Task</p>
              <form onSubmit={createTask}>
                <Input
                  type="text"
                  placeholder="Task Name"
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                />
                {!!error ? <p className="error">{error}</p> : null}
                <Button style={{ width: "100%" }} type="submit">
                  + New Task
                </Button>
              </form>
            </Card>
          </div>
        </Modal>
      ) : null}

      {isEditOpen ? (
        <Modal>
          <div className="create">
            <Card
              width="296px"
              height="193px"
              onClick={() => editModalClose()}
              closeBtn={true}
            >
              <p>+ Edit Task</p>
              <form onSubmit={editTask}>
                <Input
                  type="text"
                  placeholder="Task Name"
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                  value={editTaskTitle}
                />
                {!!error ? <p className="error">{error}</p> : null}
                <Button style={{ width: "100%" }} type="submit">
                  + Edit Task
                </Button>
              </form>
            </Card>
          </div>
        </Modal>
      ) : null}

      {isDeleteOpen ? (
        <Modal>
          <Card
            closeBtn={true}
            onClick={() => deleteModalClose()}
            width="296px"
            height="193px"
          >
            <div className="deleteContainer">
              <p>You really want to delete this todo?</p>
              <div className="buttonContainer">
                <Button
                  onClick={() => handleDeleteConfirm("yes")}
                  style={{ width: "100%", backgroundColor: "red" }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleDeleteConfirm("no")}
                  style={{ width: "100%" }}
                >
                  No
                </Button>
              </div>
            </div>
          </Card>
        </Modal>
      ) : null}
    </>
  );
}
