import PlayerImage from './PlayerImage.jsx'
import { getRarityStyle } from '../utils/getRarityColor.js'

// Football pitch with each slot placed by its x/y percentage. Filled slots show
// the player token; empty slots show a dashed placeholder with the slot label.
// Used both as a small in-game preview and the large final view (`size`).
export default function SquadPitch({ slots, squadBySlot, size = 'lg' }) {
  const token = size === 'sm' ? 'w-9 sm:w-11' : 'w-14 sm:w-16'

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-emerald-900 bg-gradient-to-b from-emerald-700 to-emerald-800">
      {/* Pitch markings */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border-2 border-white/25" />
      <div className="pointer-events-none absolute left-3 right-3 top-1/2 h-0 border-t-2 border-white/25" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-1/2 top-3 h-14 w-28 -translate-x-1/2 border-2 border-t-0 border-white/25" />
      <div className="pointer-events-none absolute bottom-3 left-1/2 h-14 w-28 -translate-x-1/2 border-2 border-b-0 border-white/25" />

      {slots.map((slot) => {
        const entry = squadBySlot[slot.slotId]
        return (
          <div
            key={slot.slotId}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          >
            {entry ? (
              <>
                <div
                  className={`overflow-hidden rounded-full border-2 bg-slate-900 ${token} aspect-square ring-2 ${getRarityStyle(entry.player.rarity).border} ${getRarityStyle(entry.player.rarity).ring}`}
                >
                  <PlayerImage player={entry.player} className="h-full w-full" />
                </div>
                <div className="mt-0.5 max-w-[72px] truncate rounded bg-black/60 px-1 text-[9px] font-semibold text-white sm:text-[10px]">
                  {entry.player.rating} {entry.player.name.split(' ').slice(-1)[0]}
                </div>
              </>
            ) : (
              <div
                className={`flex ${token} aspect-square items-center justify-center rounded-full border-2 border-dashed border-white/40 bg-black/20 text-[10px] font-bold text-white/70`}
              >
                {slot.label}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
