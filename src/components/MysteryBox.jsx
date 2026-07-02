import PlayerCard from './PlayerCard.jsx'
import { RARITY_RANK } from '../data/rarity.js'

// A single mystery box. Three visual states:
//  - 'closed'  : unopened, click to open (disabled when opens are used up)
//  - 'opened'  : revealed during the opening phase, can be chosen
//  - 'revealed': shown after the pick — either the chosen card or a missed one
export default function MysteryBox({
  box,
  state,
  index,
  slotPosition,
  canOpen,
  chosen,
  onOpen,
  onChoose,
}) {
  if (state === 'closed') {
    // Neutral styling — every closed box looks identical so the rarity is a
    // surprise until it's opened.
    return (
      <button
        type="button"
        onClick={onOpen}
        disabled={!canOpen}
        className={`flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center transition
          ${
            canOpen
              ? 'cursor-pointer border-emerald-400/70 bg-gradient-to-br from-emerald-600/30 to-slate-800 hover:scale-[1.03] hover:from-emerald-500/50 active:scale-95'
              : 'cursor-not-allowed border-slate-700 bg-slate-800/60 opacity-60'
          }`}
      >
        <span className={`text-4xl sm:text-5xl ${canOpen ? 'anim-float' : ''}`}>📦</span>
        <span className="mt-2 text-xs font-semibold text-slate-300">Box {index + 1}</span>
        <span className="text-[10px] text-slate-400">
          {canOpen ? 'Tap to open' : 'Locked'}
        </span>
      </button>
    )
  }

  const isMissed = state === 'revealed' && !chosen
  const isBigMiss = isMissed && (RARITY_RANK[box.player.rarity] ?? 0) >= 3

  return (
    <div className="relative flex flex-col">
      <div
        className={`${isMissed ? 'opacity-70 grayscale' : ''} ${
          state === 'opened' || chosen
            ? 'anim-card-reveal'
            : isMissed
              ? 'anim-fade-up'
              : ''
        }`}
        style={isMissed ? { animationDelay: `${index * 90}ms` } : undefined}
      >
        <PlayerCard player={box.player} slotPosition={slotPosition} />
      </div>

      {state === 'opened' && (
        <button
          type="button"
          onClick={onChoose}
          className="mt-2 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-bold text-white transition hover:bg-emerald-400"
        >
          Choose
        </button>
      )}

      {chosen && (
        <span className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow">
          Picked
        </span>
      )}
      {isBigMiss && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-black uppercase text-white shadow-lg">
          Missed!
        </span>
      )}
    </div>
  )
}
