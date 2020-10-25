import React, { useContext, useRef, useEffect } from "react";
import { TodoContext } from "../../App";

export default function TodoItem({ id, text, completed, color }) {
  const todosDispatch = useContext(TodoContext);
  const todoDiv = useRef(null);
  const todoInput = useRef(null);
  const todoCheckbox = useRef(null);

  useEffect(() => {
    changeColor(color);
    // eslint-disable-next-line
  }, [color, completed]);

  useEffect(() => {
    if (completed) {
      todoInput.current.style.textDecoration = "line-through";
    } else {
      todoInput.current.style.textDecoration = "none";
    }
  }, [completed]);

  const changeColor = (color) => {
    if (completed) {
      switch (color) {
        case "yellow":
          todoDiv.current.style.backgroundColor = "#FDD835";
          todoInput.current.style.backgroundColor = "#FDD835";
          break;
        case "black":
          todoDiv.current.style.backgroundColor = "#BDBDBD";
          todoInput.current.style.backgroundColor = "#BDBDBD";
          break;
        case "green":
          todoDiv.current.style.backgroundColor = "#43A047";
          todoInput.current.style.backgroundColor = "#43A047";
          break;
        case "blue":
          todoDiv.current.style.backgroundColor = "#42A5F5";
          todoInput.current.style.backgroundColor = "#42A5F5";
          break;
        case "red":
          todoDiv.current.style.backgroundColor = "#E57373";
          todoInput.current.style.backgroundColor = "#E57373";
          break;
        default:
          todoDiv.current.style.backgroundColor = "#FDD835";
          todoInput.current.style.backgroundColor = "#FDD835";
      }
    } else {
      switch (color) {
        case "yellow":
          todoDiv.current.style.backgroundColor = "#FFF59D";
          todoInput.current.style.backgroundColor = "#FFF59D";
          break;
        case "black":
          todoDiv.current.style.backgroundColor = "#E0E0E0";
          todoInput.current.style.backgroundColor = "#E0E0E0";
          break;
        case "green":
          todoDiv.current.style.backgroundColor = "#81C784";
          todoInput.current.style.backgroundColor = "#81C784";
          break;
        case "blue":
          todoDiv.current.style.backgroundColor = "#90CAF9";
          todoInput.current.style.backgroundColor = "#90CAF9";
          break;
        case "red":
          todoDiv.current.style.backgroundColor = "#EF9A9A";
          todoInput.current.style.backgroundColor = "#EF9A9A";
          break;
        default:
          todoDiv.current.style.backgroundColor = "#FFF59D";
          todoInput.current.style.backgroundColor = "#FFF59D";
      }
    }
  };

  return (
    <div ref={todoDiv} className="todo-item">
      <input
        ref={todoCheckbox}
        type="checkbox"
        checked={completed}
        onChange={() => todosDispatch({ type: "completed", payload: id })}
      />
      <input
        ref={todoInput}
        className="todo-inputfield"
        type="text"
        value={text}
        onChange={(e) =>
          todosDispatch({ type: "change", payload: id, text: e.target.value })
        }
      />
      <button
        className="btn-delete"
        onClick={() => todosDispatch({ type: "delete", payload: id })}
      >
        ✘
      </button>
    </div>
  );
}
