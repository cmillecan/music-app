import React from 'react'
import './Music.css'
import * as Tone from 'tone'
import notes from "./notes"

const octaves = [4, 5]

export default function Music() {
  const synth = new Tone.Synth().toDestination();
  const playNote = (note, octave) => {
    synth.triggerAttackRelease(`${note}${octave}`, '8n')
  }

  const renderNotes = () => {
    let noteButtons = []
    octaves.forEach(o => {
      notes.forEach(n => {
        const absNote = `${n.name}`
        noteButtons.push(<button key={absNote} className={n.isWhite ? "white-key" : "black-key"} onClick={() => playNote(n.name, o)}>{absNote}</button>)
      })
    })

    return noteButtons
  }

  return (
    <div className='app-container'>
      <h1>Musical Keyboard Game</h1>
      <div className='keyboard'>
        {renderNotes()}
      </div>
    </div>
  )
}