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

const CARD_SURFACES = {
  Common: 'fut-card--common',
  Rare: 'fut-card--rare',
  Epic: 'fut-card--epic',
  Icon: 'fut-card--icon',
  'Egyptian Legend': 'fut-card--legend',
  'Egyptian Phenomena': 'fut-card--phenomena',
}

// Full player card: photo, rarity frame, overall, position, name, nation and
// the six FIFA-style stats. `slotPosition` (optional) shows where the card is
// being played so an off-position pick is visible.
export default function PlayerCard({ player, slotPosition, className = '' }) {
  const style = getRarityStyle(player.rarity)
  const isElite = (RARITY_RANK[player.rarity] ?? 0) >= 3 // Epic, Icon, Egyptian Legend
  const surfaceClass = CARD_SURFACES[player.rarity] || CARD_SURFACES.Common

  return (
    <div
      style={isElite ? { '--glow-color': style.glowColor } : undefined}
      className={`fut-card ${surfaceClass} flex aspect-[3/4] w-full max-w-[184px] flex-col p-2.5 text-slate-950 shadow-xl sm:max-w-[214px] ${style.glow} ${
        isElite ? 'shine-wrap anim-glow' : ''
      } ${className}`}
    >
      <div className="fut-portrait relative z-10 min-h-0 flex-1 overflow-hidden">
        <PlayerImage player={player} className="h-full w-full" />

        <div className="fut-rating-panel absolute left-1.5 top-1.5 leading-none">
          <div className="text-xl font-black tracking-tight sm:text-2xl">{player.rating}</div>
          <div className="mt-0.5 text-[8px] font-black uppercase sm:text-[9px]">
            {slotPosition && slotPosition !== player.position
              ? `${player.position} → ${slotPosition}`
              : player.position}
          </div>
        </div>

        <span
          className={`absolute right-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-white shadow-md ${style.badgeBg}`}
        >
          {style.label}
        </span>
      </div>

      <div className="fut-info-panel relative z-10 mt-1.5">
        <div
          className="truncate text-center text-sm font-black uppercase tracking-wide text-white sm:text-base"
          title={player.name}
        >
          {player.name}
        </div>
        <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-white/75 sm:text-[11px]">
          <span>{getFlag(player.nationality)}</span>
          <span className="truncate">{player.nationality}</span>
        </div>

        <div className="fut-stats mt-1.5 grid grid-cols-3 gap-x-1 gap-y-0.5 pt-1.5 text-center text-[10px] sm:text-[11px]">
          {STAT_ROWS.map(([label, key]) => (
            <div key={key} className="flex items-center justify-center gap-1 whitespace-nowrap text-white">
              <span className="font-black">{player[key]}</span>
              <span className="font-bold text-white/65">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
