import { useState } from 'react'
import { FORMATIONS, DEFAULT_FORMATION } from '../data/formations.js'
import { generateBoxes, BOXES_PER_POSITION } from '../utils/generateBoxes.js'
import BoxGrid from '../components/BoxGrid.jsx'
import PositionHeader from '../components/PositionHeader.jsx'
import SquadPitch from '../components/SquadPitch.jsx'

const MAX_OPENS = 2

// The core game loop. Walks the formation slot by slot; for each slot the
// player opens up to MAX_OPENS boxes, picks one revealed player, sees what was
// missed, then advances. On the final slot it hands the full squad up to App.
export default function Game({ onFinish }) {
  const formation = FORMATIONS[DEFAULT_FORMATION]
  const slots = formation.slots

  const [currentIndex, setCurrentIndex] = useState(0)
  const [squad, setSquad] = useState([]) // [{ slotId, slot, player }]
  const [missedPlayers, setMissedPlayers] = useState([])

  // Per-position state
  const [boxes, setBoxes] = useState(() => generateBoxes(slots[0].position, []))
  const [openedIndices, setOpenedIndices] = useState([])
  const [phase, setPhase] = useState('opening') // 'opening' | 'revealing'
  const [chosenIndex, setChosenIndex] = useState(null)

  const currentSlot = slots[currentIndex]

  const squadBySlot = squad.reduce((map, entry) => {
    map[entry.slotId] = entry
    return map
  }, {})

  function openBox(i) {
    if (phase !== 'opening') return
    if (openedIndices.includes(i)) return
    if (openedIndices.length >= MAX_OPENS) return
    setOpenedIndices((prev) => [...prev, i])
  }

  function choosePlayer(i) {
    // Only an already-opened box can be chosen; blocks picking a hidden card.
    if (phase !== 'opening' || !openedIndices.includes(i)) return
    setChosenIndex(i)
    setPhase('revealing')
  }

  function nextPosition() {
    if (phase !== 'revealing' || chosenIndex == null) return

    const entry = {
      slotId: currentSlot.slotId,
      slot: currentSlot,
      player: boxes[chosenIndex].player,
    }
    const newSquad = [...squad, entry]
    const newMissed = [
      ...missedPlayers,
      ...boxes.filter((_, i) => i !== chosenIndex).map((b) => b.player),
    ]
    const nextIndex = currentIndex + 1

    if (nextIndex >= slots.length) {
      onFinish(newSquad, newMissed)
      return
    }

    // Set up the next position, excluding everyone already in the squad.
    const usedIds = newSquad.map((e) => e.player.id)
    setSquad(newSquad)
    setMissedPlayers(newMissed)
    setCurrentIndex(nextIndex)
    setBoxes(generateBoxes(slots[nextIndex].position, usedIds))
    setOpenedIndices([])
    setPhase('opening')
    setChosenIndex(null)
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
      <div key={currentIndex} className="anim-fade-up flex flex-col gap-6">
        <PositionHeader
          slot={currentSlot}
          index={currentIndex}
          total={slots.length}
          opensUsed={openedIndices.length}
          maxOpens={MAX_OPENS}
          phase={phase}
        />

        <BoxGrid
          boxes={boxes}
          openedIndices={openedIndices}
          phase={phase}
          chosenIndex={chosenIndex}
          slotPosition={currentSlot.position}
          maxOpens={MAX_OPENS}
          onOpen={openBox}
          onChoose={choosePlayer}
        />
      </div>

      {phase === 'opening' && openedIndices.length === 0 && (
        <p className="text-center text-sm text-slate-400">
          Open a box to reveal a player. You can open up to {MAX_OPENS} of the{' '}
          {BOXES_PER_POSITION}.
        </p>
      )}

      {phase === 'revealing' && (
        <div className="anim-pop flex justify-center">
          <button
            type="button"
            onClick={nextPosition}
            className="w-full rounded-xl bg-emerald-500 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400 active:scale-95 sm:w-auto"
          >
            {currentIndex + 1 >= slots.length ? 'See Final Squad →' : 'Next Position →'}
          </button>
        </div>
      )}

      <div className="mt-2">
        <h3 className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-slate-400">
          Your squad so far ({squad.length}/{slots.length})
        </h3>
        <SquadPitch slots={slots} squadBySlot={squadBySlot} size="sm" />
      </div>
    </div>
  )
}
