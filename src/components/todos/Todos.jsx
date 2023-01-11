import Todo from "../todo/Todo";
import "./todos.scss";

export default function Todos({ todos }) {
  return (
    <div className="todos">
      {todos?.length > 0
        ? todos?.map((todo) => <Todo key={todo.id} {...todo} />)
        : "No todo found!"}
    </div>
  );
}
