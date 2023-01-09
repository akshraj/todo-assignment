import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import Input from "../../components/Input";
import searchIcon from "../../assets/image/search-solid.png";
import "./dashboard.scss";
import Todos from "../../components/todos";
import useAuth from "../../hooks/useAuth";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import Modal from "../../components/modal";
import Chart from "../../components/chart";

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
  } = useActions();
  const { isOpen, isEditOpen } = useSelector((state) => state.modalState);
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

  const createTask = () => {
    setError("");
    if (!task) {
      setError("task title is required");
      return;
    }
    const data = {
      id: Math.round(Math.random() * 1000),
      userId: user?.id,
      title: task,
      isCompleted: false,
    };
    addTodo(data);
    modalClose();
    setTask("");
  };

  const editTask = () => {
    setError("");
    if (!editTaskTitle) {
      setError("task title is required");
      return;
    }
    editTodo({ title: editTaskTitle, id: todo?.id });
    editModalClose();
    setEditTaskTitle("");
  };

  return (
    <>
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
                          {d.title}
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
              onClick={() => modalClose()}
              create={true}
            >
              <p>+ New Task</p>
              <Input
                type="text"
                placeholder="Task Name"
                onChange={(e) => setTask(e.target.value)}
                value={task}
              />
              {!!error ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              ) : null}
              <Button style={{ width: "100%" }} onClick={createTask}>
                + New Task
              </Button>
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
              edit={true}
            >
              <p>+ Edit Task</p>
              <Input
                type="text"
                placeholder="Task Name"
                onChange={(e) => setEditTaskTitle(e.target.value)}
                value={editTaskTitle}
              />
              {!!error ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              ) : null}
              <Button style={{ width: "100%" }} onClick={editTask}>
                + Edit Task
              </Button>
            </Card>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
