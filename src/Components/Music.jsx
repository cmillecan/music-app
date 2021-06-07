import React from "react";
import { useState, useEffect } from "react";
import "./Music.css";
import * as Tone from "tone";
import notes from "./notes";

const octaves = [3, 4];

export default function Music() {
  const triad = ["C", "E", "G"];
  const [notesPlayed, setNotesPlayed] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    if (notesPlayed.length === 3) {
      setTimeout(() => setNotesPlayed([]), 1000);
      const triadSet = new Set(triad);
      const notesPlayedSet = new Set(notesPlayed.map((n) => n.name));
      if (notesPlayedSet.size !== triadSet.size) {
        setIncorrectCount((current) => current + 1);
        return;
      }
      for (let note of notesPlayedSet) {
        if (!triadSet.has(note)) {
          setIncorrectCount((current) => current + 1);
          return;
        }
      }
      setCorrectCount((current) => current + 1);
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
        const firstClass = n.isWhite ? "white-key" : "black-key";
        // if (we need a second class) then add that class to the 'keyClass' string
        const maybeSecondClass = notesPlayed.some((np) => {
          return np.value === n.value && np.octave === o;
        })
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

              setNotesPlayed([...notesPlayed, { ...n, octave: o }]);
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
      <div className="app-div">
        <div className="app-title">
          <h1>Musical Keyboard Game</h1>
        </div>
        <div className="counter-div">
          <div className="correct-counter">
            <p>Correct: {correctCount}</p>
          </div>
          <div className="incorrect-counter">
            <p>Incorrect: {incorrectCount}</p>
          </div>
        </div>
        <div className="keyboard">{renderNotes()}</div>
        <div className="quiz-text">
          <h3>Play the correct Major Triad:</h3>
          <h2>C Major</h2>
        </div>
      </div>
    </div>
  );
}
