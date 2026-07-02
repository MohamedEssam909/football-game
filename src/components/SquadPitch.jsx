import PlayerImage from './PlayerImage.jsx'
import NationLogoBadge from './NationLogoBadge.jsx'

// Football pitch with each slot placed by its x/y percentage. Filled slots show
// the player token; empty slots show a dashed placeholder with the slot label.
// Used both as a small in-game preview and the large final view (`size`).
export default function SquadPitch({ slots, squadBySlot, size = 'lg' }) {
  const token = size === 'sm' ? 'w-11 sm:w-14' : 'w-16 sm:w-20'
  const labelWidth = size === 'sm' ? 'max-w-[86px]' : 'max-w-[104px]'

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
                  className={`relative overflow-hidden rounded-full border-2 border-white/80 bg-slate-900 ${token} aspect-square ring-2 ring-black/30`}
                >
                  <PlayerImage player={entry.player} className="h-full w-full" />
                  <span className="absolute bottom-0 right-0">
                    <NationLogoBadge nationality={entry.player.nationality} />
                  </span>
                </div>
                <div className={`mt-1 ${labelWidth} truncate rounded bg-black/60 px-1.5 text-[10px] font-bold text-white sm:text-[11px]`}>
                  {entry.player.rating} {entry.player.name.split(' ').slice(-1)[0]}
                </div>
              </>
            ) : (
              <div
                className={`flex ${token} aspect-square items-center justify-center rounded-full border-2 border-dashed border-white/40 bg-black/20 text-[11px] font-bold text-white/70`}
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
