import React from "react";
import { useState, useEffect } from "react";
import "./Music.css";
import * as Tone from "tone";
import notes, { qualities } from "./notes";

const octaves = [3, 4];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export default function Music() {
  const [incorrectCountMap, setIncorrectCountMap] = useState({});
  const [correctRoot, setCorrectRoot] = useState(
    notes[getRandomInt(notes.length)]
  );
  const [correctQuality, setCorrectQuality] = useState(
    qualities[getRandomInt(qualities.length)]
  );
  const [notesPlayed, setNotesPlayed] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const updateIncorrectCountMap = () => {
    setIncorrectCountMap((currentIncorrectCountMap) => {
      const triadLabel = `${correctRoot.name} ${correctQuality.label}`;
      if (triadLabel in currentIncorrectCountMap)
        currentIncorrectCountMap[triadLabel]++;
      else currentIncorrectCountMap[triadLabel] = 1;

      return currentIncorrectCountMap;
    });
  };

  useEffect(() => {
    if (notesPlayed.length === 3) {
      setTimeout(() => {
        setNotesPlayed([]);
        setCorrectRoot(notes[getRandomInt(notes.length)]);
        setCorrectQuality(qualities[getRandomInt(qualities.length)]);
      }, 1000);
      const triadSet = correctQuality.generateTriad(correctRoot);
      const notesPlayedSet = new Set(notesPlayed.map((n) => n.value));
      if (notesPlayedSet.size !== triadSet.size) {
        setIncorrectCount((current) => current + 1);
        updateIncorrectCountMap();
        return;
      }
      for (let note of notesPlayedSet) {
        if (!triadSet.has(note)) {
          setIncorrectCount((current) => current + 1);
          updateIncorrectCountMap();
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
          <h3>Play the correct triad:</h3>
          <h2>
            {correctRoot.name} {correctQuality.label}
          </h2>
        </div>
        <h4>Needs more practice:</h4>
        <div className="quiz-results">
          <div className="results-row">
            <div>
              <h5>Chord</h5>
            </div>
            <div>
              <h5>Incorrect Count</h5>
            </div>
          </div>
          {Object.entries(incorrectCountMap).map(([triadLabel, count]) => (
            <div key={triadLabel}>
              <div className="results-row">
                <div>
                  <p>{triadLabel}</p>
                </div>
                <div>
                  <p>{count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
