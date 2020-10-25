import React, { useContext, useRef, useEffect } from "react";
import { NoteContext } from "../../App";

export default function NoteItem({ id, text, color }) {
  const notesDispatch = useContext(NoteContext);
  const noteDiv = useRef(null);
  const noteInput = useRef(null);

  useEffect(() => {
    changeColor(color);
    // eslint-disable-next-line
  }, [color]);

  const changeColor = (color) => {
    switch (color) {
      case "yellow":
        noteDiv.current.style.backgroundColor = "#FFF59D";
        noteInput.current.style.backgroundColor = "#FFF59D";
        break;
      case "black":
        noteDiv.current.style.backgroundColor = "#E0E0E0";
        noteInput.current.style.backgroundColor = "#E0E0E0";
        break;
      case "green":
        noteDiv.current.style.backgroundColor = "#81C784";
        noteInput.current.style.backgroundColor = "#81C784";
        break;
      case "blue":
        noteDiv.current.style.backgroundColor = "#90CAF9";
        noteInput.current.style.backgroundColor = "#90CAF9";
        break;
      case "red":
        noteDiv.current.style.backgroundColor = "#EF9A9A";
        noteInput.current.style.backgroundColor = "#EF9A9A";
        break;
      default:
        noteDiv.current.style.backgroundColor = "#FFF59D";
        noteInput.current.style.backgroundColor = "#FFF59D";
    }
  };

  return (
    <div ref={noteDiv} className="note-item">
      <textarea
        ref={noteInput}
        className="note-inputfield"
        type="text"
        value={text}
        onChange={(e) =>
          notesDispatch({ type: "change", payload: id, text: e.target.value })
        }
      />
      <button
        className="btn-delete note-btn"
        onClick={() => notesDispatch({ type: "delete", payload: id })}
      >
        ✘
      </button>
    </div>
  );
}
