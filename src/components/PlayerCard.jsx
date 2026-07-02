import PlayerImage from './PlayerImage.jsx'
import { getRarityStyle } from '../utils/getRarityColor.js'
import { getFlag } from '../utils/getFlag.js'
import { RARITY_RANK } from '../data/rarity.js'

const STAT_ROWS = [
  ['PAC', 'pace'],
  ['SHO', 'shooting'],
  ['PAS', 'passing'],
  ['DRI', 'dribbling'],
  ['DEF', 'defense'],
  ['PHY', 'physical'],
]

// Full player card: photo, rarity frame, overall, position, name, nation and
// the six FIFA-style stats. `slotPosition` (optional) shows where the card is
// being played so an off-position pick is visible.
export default function PlayerCard({ player, slotPosition, className = '' }) {
  const style = getRarityStyle(player.rarity)
  const isElite = (RARITY_RANK[player.rarity] ?? 0) >= 3 // Epic, Icon, Egyptian Legend

  return (
    <div
      style={isElite ? { '--glow-color': style.glowColor } : undefined}
      className={`flex w-full flex-col rounded-2xl border-2 bg-slate-900/80 p-3 shadow-lg ring-1 ${style.border} ${style.ring} ${style.glow} ${
        isElite ? 'shine-wrap anim-glow' : ''
      } ${className}`}
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="leading-tight">
          <div className="text-2xl font-black text-white">{player.rating}</div>
          <div className="text-xs font-semibold text-slate-300">
            {slotPosition && slotPosition !== player.position
              ? `${player.position} → ${slotPosition}`
              : player.position}
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${style.badgeBg}`}
        >
          {style.label}
        </span>
      </div>

      <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl bg-slate-800">
        <PlayerImage player={player} className="h-full w-full" />
      </div>

      <div className="mb-1 truncate text-center text-sm font-bold text-white" title={player.name}>
        {player.name}
      </div>
      <div className="mb-2 flex items-center justify-center gap-1 text-xs text-slate-300">
        <span>{getFlag(player.nationality)}</span>
        <span className="truncate">{player.nationality}</span>
      </div>

      <div className="grid grid-cols-3 gap-x-2 gap-y-1 border-t border-slate-700 pt-2 text-center text-[11px]">
        {STAT_ROWS.map(([label, key]) => (
          <div key={key} className="flex items-center justify-center gap-1">
            <span className="font-bold text-white">{player[key]}</span>
            <span className="text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
