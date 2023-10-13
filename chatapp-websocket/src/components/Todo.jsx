import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [values, setValues] = useState("");

  const socket = io("http://localhost:8000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket_id", socket.id);
    });
    socket.on("send-todo", (data) => {
      setTodos([...todos, data.values]);
      console.log("data", data);
    });
  }, [todos]);

  return (
    <div>
      <input
        type="text"
        value={values}
        onChange={(e) => setValues(e.target.value)}
        placeholder="Enter Your Note"
      />
      <button
        onClick={() => {
          setTodos([...todos, values]);
          setValues("");
          socket.emit("add-todo", { values });
        }}
      >
        Add Todo
      </button>
      <ul>
        {todos.map((v, i) => (
          <li key={i}>
            {v}{" "}
            <button
              onClick={() => {
                const oldTodos = [...todos];
                oldTodos.splice(i, 1);
                setTodos(oldTodos);
              }}
            >
              Delete Todo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
