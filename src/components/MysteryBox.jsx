import PlayerCard from './PlayerCard.jsx'
import { RARITY_RANK } from '../data/rarity.js'
import { getRarityStyle } from '../utils/getRarityColor.js'

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
  // The closed box is tinted by the hidden card's rarity — a colour hint about
  // the level inside, without revealing who it is.
  const hintStyle = getRarityStyle(box.player.rarity)

  if (state === 'closed') {
    return (
      <button
        type="button"
        onClick={onOpen}
        disabled={!canOpen}
        style={{ '--glow-color': hintStyle.glowColor }}
        className={`flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-slate-800/70 text-center shadow-lg ring-1 transition
          ${hintStyle.border} ${hintStyle.ring} ${hintStyle.glow}
          ${
            canOpen
              ? 'anim-glow cursor-pointer hover:scale-[1.03] hover:brightness-125 active:scale-95'
              : 'cursor-not-allowed opacity-60 grayscale'
          }`}
      >
        <span className={`text-4xl sm:text-5xl ${canOpen ? 'anim-float' : ''}`}>📦</span>
        <span className="mt-2 text-xs font-semibold text-slate-200">Box {index + 1}</span>
        <span className={`text-[10px] font-semibold ${hintStyle.text}`}>
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
