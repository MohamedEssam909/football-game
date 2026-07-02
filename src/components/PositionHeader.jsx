import { POSITIONS } from '../data/positions.js'

// Top banner during the game: which position is being drafted, overall squad
// progress, and how many opens remain for this position.
export default function PositionHeader({ slot, index, total, opensUsed, maxOpens, phase }) {
  const positionName = POSITIONS[slot.position]?.name || slot.position
  const opensLeft = Math.max(0, maxOpens - opensUsed)

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Position {index + 1} of {total}
      </div>
      <h2 className="text-3xl font-black text-white sm:text-4xl">
        {positionName} <span className="text-emerald-400">({slot.label})</span>
      </h2>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i < index ? 'bg-emerald-400' : i === index ? 'bg-white' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      {phase === 'opening' ? (
        <p className="text-sm text-slate-300">
          Opens left:{' '}
          <span className="font-bold text-white">
            {opensLeft} / {maxOpens}
          </span>
          {opensLeft === 0 && ' — choose one of your opened players'}
        </p>
      ) : (
        <p className="text-sm text-slate-300">Here's what was hiding in the other boxes…</p>
      )}
    </div>
  )
}
