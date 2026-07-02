import { useState } from 'react'
import { FORMATIONS, DEFAULT_FORMATION } from '../data/formations.js'
import { generateBoxes, BOXES_PER_POSITION } from '../utils/generateBoxes.js'
import { canChooseClassicBox, getClassicMaxOpens } from '../utils/classicMode.js'
import { resolveHiddenPickChoice } from '../utils/hiddenPickMode.js'
import BoxGrid from '../components/BoxGrid.jsx'
import PlayerCard from '../components/PlayerCard.jsx'
import PositionHeader from '../components/PositionHeader.jsx'
import SquadPitch from '../components/SquadPitch.jsx'

// The core game loop. Walks the formation slot by slot; for each slot the
// player opens boxes, picks one revealed player, sees what was
// missed, then advances. On the final slot it hands the full squad up to App.
export default function Game({ mode = 'classic', onFinish }) {
  const formation = FORMATIONS[DEFAULT_FORMATION]
  const slots = formation.slots
  const isHiddenPick = mode === 'hidden-pick'
  const maxOpens = isHiddenPick ? 1 : getClassicMaxOpens(BOXES_PER_POSITION)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [squad, setSquad] = useState([]) // [{ slotId, slot, player }]
  const [missedPlayers, setMissedPlayers] = useState([])

  // Per-position state
  const [boxes, setBoxes] = useState(() => generateBoxes(slots[0].position, []))
  const [openedIndices, setOpenedIndices] = useState(() => (isHiddenPick ? [0] : []))
  const [phase, setPhase] = useState('opening') // 'opening' | 'revealing'
  const [chosenIndex, setChosenIndex] = useState(null)
  const [hiddenPickIndex, setHiddenPickIndex] = useState(null)
  const [hiddenPickMissed, setHiddenPickMissed] = useState([])

  const currentSlot = slots[currentIndex]

  const squadBySlot = squad.reduce((map, entry) => {
    map[entry.slotId] = entry
    return map
  }, {})

  function openBox(i) {
    if (isHiddenPick) return
    if (phase !== 'opening') return
    if (openedIndices.includes(i)) return
    if (openedIndices.length >= maxOpens) return
    setOpenedIndices((prev) => [...prev, i])
  }

  function choosePlayer(i) {
    // Only an already-opened box can be chosen; blocks picking a hidden card.
    if (isHiddenPick) return
    if (phase !== 'opening' || !openedIndices.includes(i)) return
    if (!canChooseClassicBox(openedIndices, i)) return
    setChosenIndex(i)
    setPhase('revealing')
  }

  function chooseHiddenPick(choice) {
    if (!isHiddenPick || phase !== 'opening') return

    const hiddenIndex = Math.floor(Math.random() * (boxes.length - 1)) + 1
    const result = resolveHiddenPickChoice({
      boxes,
      slot: currentSlot,
      choice,
      hiddenIndex,
    })

    setChosenIndex(result.chosenIndex)
    setHiddenPickIndex(hiddenIndex)
    setHiddenPickMissed(result.missedPlayers)
    setOpenedIndices([0, result.chosenIndex])
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
      ...(isHiddenPick
        ? hiddenPickMissed
        : boxes.filter((_, i) => i !== chosenIndex).map((b) => b.player)),
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
    setOpenedIndices(isHiddenPick ? [0] : [])
    setPhase('opening')
    setChosenIndex(null)
    setHiddenPickIndex(null)
    setHiddenPickMissed([])
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
      <div key={currentIndex} className="anim-fade-up flex flex-col gap-6">
        <PositionHeader
          slot={currentSlot}
          index={currentIndex}
          total={slots.length}
          opensUsed={openedIndices.length}
          maxOpens={maxOpens}
          phase={phase}
          mode={mode}
        />

        {isHiddenPick && phase === 'opening' ? (
          <div className="mx-auto grid w-full max-w-xl items-stretch justify-items-center gap-4 sm:grid-cols-2">
            <div className="flex w-full max-w-[214px] flex-col">
              <PlayerCard player={boxes[0].player} slotPosition={currentSlot.position} />
              <button
                type="button"
                onClick={() => chooseHiddenPick('visible')}
                className="mt-3 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02] hover:bg-emerald-400 active:scale-95"
              >
                Choose Revealed
              </button>
            </div>
            <div className="flex w-full max-w-[214px] flex-col">
              <button
                type="button"
                onClick={() => chooseHiddenPick('hidden')}
                className="fut-card fut-card-back flex aspect-[3/4] w-full max-w-[214px] flex-col items-center justify-center p-4 text-center transition hover:scale-[1.02] hover:brightness-110 active:scale-95"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100/80">
                  Hidden
                </span>
                <span className="mt-4 text-5xl">?</span>
                <span className="mt-4 text-2xl font-black uppercase tracking-wide text-white">
                  Gamble
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/70">
                  Final choice
                </span>
              </button>
              <button
                type="button"
                onClick={() => chooseHiddenPick('hidden')}
                className="mt-3 rounded-xl border border-amber-300/50 bg-amber-400 px-4 py-3 text-sm font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:bg-amber-300 active:scale-95"
              >
                Choose Hidden
              </button>
            </div>
          </div>
        ) : isHiddenPick && phase === 'revealing' && hiddenPickIndex != null ? (
          <div className="mx-auto grid w-full max-w-xl items-start justify-items-center gap-4 sm:grid-cols-2">
            {[0, hiddenPickIndex].map((boxIndex) => {
              const isChosen = boxIndex === chosenIndex
              return (
                <div
                  key={`${currentSlot.slotId}-${boxIndex}`}
                  className={`w-full max-w-[214px] ${isChosen ? 'anim-card-reveal' : 'anim-fade-up opacity-70 grayscale'}`}
                >
                  <div className="relative">
                    <PlayerCard player={boxes[boxIndex].player} slotPosition={currentSlot.position} />
                    <span
                      className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow ${
                        isChosen ? 'bg-emerald-500' : 'bg-red-600/90'
                      }`}
                    >
                      {isChosen ? 'Picked' : 'Missed'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <BoxGrid
            boxes={boxes}
            openedIndices={openedIndices}
            phase={phase}
            chosenIndex={chosenIndex}
            slotPosition={currentSlot.position}
            maxOpens={maxOpens}
            canChooseIndex={(i) => canChooseClassicBox(openedIndices, i)}
            onOpen={openBox}
            onChoose={choosePlayer}
          />
        )}
      </div>

      {!isHiddenPick && phase === 'opening' && openedIndices.length === 0 && (
        <p className="text-center text-sm text-slate-400">
          Open a box to reveal a player. You can open all {BOXES_PER_POSITION} boxes.
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
