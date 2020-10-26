import React, { useState, useReducer, useEffect, useRef } from "react";
import TodoList from "./components/Todo/TodoList";
import NoteList from "./components/Notes/NoteList";
import "./css/style.css";
import { todoList } from "./dummy";
import { noteList } from "./dummy";

const initialTodosState = [];
const todosReducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload;
    case "add":
      if (action.text !== "") {
        return [
          ...state,
          {
            id: Date.now(),
            text: action.text,
            completed: false,
            color: action.color,
          },
        ];
      } else {
        alert("You can't create an empty task!");
        return state;
      }
    case "change":
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            text: action.text,
          };
        }
        return item;
      });
    case "delete":
      return state.filter((item) => item.id !== action.payload);
    case "completed":
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
    default:
      return state;
  }
};

const initialNotesState = [];
const notesReducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload;
    case "add":
      if (action.text !== "") {
        return [
          ...state,
          {
            id: Date.now(),
            text: action.text,
            color: action.color,
          },
        ];
      } else {
        alert("You can't create an empty note!");
        return state;
      }
    case "change":
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            text: action.text,
          };
        }
        return item;
      });
    case "delete":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export const TodoContext = React.createContext();
export const NoteContext = React.createContext();

function App() {
  const [category, setCategory] = useState("notes");
  const [color, setColor] = useState("yellow");
  const [todoText, setTodoText] = useState("");
  const [noteText, setNoteText] = useState("");
  const [todoState, todosDispatch] = useReducer(
    todosReducer,
    initialTodosState
  );
  const [noteState, notesDispatch] = useReducer(
    notesReducer,
    initialNotesState
  );
  const notesTodos = useRef(null);
  const notes = useRef(null);
  const todos = useRef(null);
  const noteInput = useRef(null);
  const todoInput = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("todo") === null) {
      todosDispatch({ type: "reset", payload: todoList });
    } else {
      const raw = localStorage.getItem("todo");
      todosDispatch({ type: "reset", payload: JSON.parse(raw) });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("note") === null) {
      notesDispatch({ type: "reset", payload: noteList });
    } else {
      const raw = localStorage.getItem("note");
      notesDispatch({ type: "reset", payload: JSON.parse(raw) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoState));
  }, [todoState]);

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(noteState));
  }, [noteState]);

  useEffect(() => {
    changeColor(color);
    // eslint-disable-next-line
  }, [color, category]);

  const openTodos = () => {
    setCategory("todos");
  };

  const openNotes = () => {
    setCategory("notes");
  };

  const changeColor = (color) => {
    setColor(color);
    var lightColor;
    var darkColor;
    if (category === "notes") {
      lightColor = notes;
      darkColor = todos;
    } else {
      lightColor = todos;
      darkColor = notes;
    }
    switch (color) {
      case "yellow":
        notesTodos.current.style.backgroundColor = "#FFF59D";
        lightColor.current.style.backgroundColor = "#FFF59D";
        darkColor.current.style.backgroundColor = "#FDD835";
        if (category === "notes") {
          noteInput.current.style.backgroundColor = "#FFF59D";
        } else {
          todoInput.current.style.backgroundColor = "#FFF59D";
        }
        break;
      case "black":
        notesTodos.current.style.backgroundColor = "#E0E0E0";
        lightColor.current.style.backgroundColor = "#E0E0E0";
        darkColor.current.style.backgroundColor = "#BDBDBD";
        if (category === "notes") {
          noteInput.current.style.backgroundColor = "#E0E0E0";
        } else {
          todoInput.current.style.backgroundColor = "#E0E0E0";
        }
        break;
      case "green":
        notesTodos.current.style.backgroundColor = "#81C784";
        lightColor.current.style.backgroundColor = "#81C784";
        darkColor.current.style.backgroundColor = "#43A047";
        if (category === "notes") {
          noteInput.current.style.backgroundColor = "#81C784";
        } else {
          todoInput.current.style.backgroundColor = "#81C784";
        }
        break;
      case "blue":
        notesTodos.current.style.backgroundColor = "#90CAF9";
        lightColor.current.style.backgroundColor = "#90CAF9";
        darkColor.current.style.backgroundColor = "#42A5F5";
        if (category === "notes") {
          noteInput.current.style.backgroundColor = "#90CAF9";
        } else {
          todoInput.current.style.backgroundColor = "#90CAF9";
        }
        break;
      case "red":
        notesTodos.current.style.backgroundColor = "#EF9A9A";
        lightColor.current.style.backgroundColor = "#EF9A9A";
        darkColor.current.style.backgroundColor = "#E57373";
        if (category === "notes") {
          noteInput.current.style.backgroundColor = "#EF9A9A";
        } else {
          todoInput.current.style.backgroundColor = "#EF9A9A";
        }
        break;
      default:
        notesTodos.current.style.backgroundColor = "#FFF59D";
        lightColor.current.style.backgroundColor = "#FFF59D";
        darkColor.current.style.backgroundColor = "#FDD835";
        if (category === "notes") {
          noteInput.current.style.backgroundColor = "#FFF59D";
        } else {
          todoInput.current.style.backgroundColor = "#FFF59D";
        }
    }
  };

  return (
    <TodoContext.Provider value={todosDispatch}>
      <NoteContext.Provider value={notesDispatch}>
        {category === "notes" ? (
          <React.Fragment>
            <div className="container-notes">
              <div ref={notesTodos} className="tab">
                <div>
                  <button
                    ref={notes}
                    onClick={openNotes}
                    className="btn-default btn-notes-1"
                  >
                    Notes
                  </button>
                  <button
                    ref={todos}
                    onClick={openTodos}
                    className="btn-default btn-todos-1"
                  >
                    Todos
                  </button>
                </div>
                <div className="color-container">
                  <button
                    onClick={() => setColor("yellow")}
                    className="color-yellow"
                  />
                  <button
                    onClick={() => setColor("black")}
                    className="color-black"
                  />
                  <button
                    onClick={() => setColor("green")}
                    className="color-green"
                  />
                  <button
                    onClick={() => setColor("blue")}
                    className="color-blue"
                  />
                  <button
                    onClick={() => setColor("red")}
                    className="color-red"
                  />
                </div>
                <div className="note-div">
                  <textarea
                    ref={noteInput}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    cols="26"
                    rows="7"
                  ></textarea>
                  <button
                    className="btn-create"
                    onClick={() => {
                      notesDispatch({
                        type: "add",
                        text: noteText,
                        color: color,
                      });
                      setNoteText("");
                    }}
                  >
                    Create note
                  </button>
                </div>
              </div>
            </div>
            <div className="container">
              <NoteList items={noteState} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="container-todos">
              <div ref={notesTodos} className="tab">
                <div>
                  <button
                    ref={notes}
                    onClick={openNotes}
                    className="btn-default btn-notes-2"
                  >
                    Notes
                  </button>
                  <button
                    ref={todos}
                    onClick={openTodos}
                    className="btn-default btn-todos-2"
                  >
                    Todos
                  </button>
                </div>
                <div className="color-container">
                  <button
                    onClick={() => setColor("yellow")}
                    className="color-yellow"
                  />
                  <button
                    onClick={() => setColor("black")}
                    className="color-black"
                  />
                  <button
                    onClick={() => setColor("green")}
                    className="color-green"
                  />
                  <button
                    onClick={() => setColor("blue")}
                    className="color-blue"
                  />
                  <button
                    onClick={() => setColor("red")}
                    className="color-red"
                  />
                </div>
                <div>
                  <input
                    ref={todoInput}
                    type="text"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    className="todo-input"
                  />
                  <br />
                  <button
                    className="btn-create"
                    onClick={() => {
                      todosDispatch({
                        type: "add",
                        text: todoText,
                        color: color,
                      });
                      setTodoText("");
                    }}
                  >
                    Create todo
                  </button>
                </div>
              </div>
            </div>
            <div className="container">
              <TodoList items={todoState} />
            </div>
          </React.Fragment>
        )}
      </NoteContext.Provider>
    </TodoContext.Provider>
  );
}

export default App;
