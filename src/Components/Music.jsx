import React from "react";
import { useState, useEffect } from "react";
import "./Music.css";
import * as Tone from "tone";
import notes from "./notes";

const octaves = [3, 4];

export default function Music() {
  const [notesPlayed, setNotesPlayed] = useState([]);
  useEffect(() => {
    if (notesPlayed.length === 3) {
      console.log(notesPlayed);
      setNotesPlayed([]);
    }
  }, [notesPlayed]);
  const synth = new Tone.Synth().toDestination();
  const playNote = (note, octave) => {
    synth.triggerAttackRelease(`${note}${octave}`, "8n");
  };

  const renderNotes = () => {
    let noteButtons = [];
    octaves.forEach((o) => {
      notes.forEach((n) => {
        noteButtons.push(
          <button
            key={`${n.name}${o}`}
            className={n.isWhite ? "white-key" : "black-key"}
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
      <h1>Musical Keyboard Game</h1>
      <div className="keyboard">{renderNotes()}</div>
      <div>Notes Played: {notesPlayed}</div>
    </div>
  );
}
