import React from "react";
import { useState } from "react";
import "./Keyboard.css";
import * as Tone from "tone";
import notes from "./notes";

const octaves = [3, 4];

export default function Keyboard() {
  const [notesPlayed, setNotesPlayed] = useState([]);

  const synth = new Tone.Synth().toDestination();
  const playNote = (note, octave) => {
    synth.triggerAttackRelease(`${note}${octave}`, "8n");
  };

  const renderNotes = () => {
    let noteButtons = [];
    octaves.forEach((o) => {
      notes.forEach((n) => {
        const firstClass = n.isWhite ? "white-key" : "black-key";
        // if (we need a second class) then add that class to the 'keyClass' string
        const maybeSecondClass = notesPlayed.includes(n.name)
          ? "pressed-key"
          : "";

        // 3rd option
        // let combinedClasses = n.isWhite ? "white-key" : "black-key";
        // if (maybeSecondClass)
        //   combinedClasses = `${combinedClasses} ${maybeSecondClass}`;

        // 4th option
        const combinedClasses = [firstClass, maybeSecondClass].join(" ");

        // const combinedClasses = firstClass + " " + maybeSecondClass;
        // const combinedClasses = `${firstClass} ${maybeSecondClass}`;

        noteButtons.push(
          <button
            key={`${n.name}${o}`}
            className={combinedClasses}
            onClick={() => {
              playNote(n.name, o);

              setNotesPlayed([...notesPlayed, n.name]);
            }}
          >
            {n.name}
          </button>
        );
      });
    });

    return noteButtons;
  };

  return (
    <div className="app-container">
      <div className="keyboard">{renderNotes()}</div>
    </div>
  );
}
