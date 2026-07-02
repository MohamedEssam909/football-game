import { getRarityStyle } from '../utils/getRarityColor.js'
import { getFlag } from '../utils/getFlag.js'
import { LINE_LABELS } from '../data/positions.js'

function Bar({ label, value }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-300">
        <span>{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
        <div
          className="anim-grow-x h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  )
}

function Highlight({ title, player, note }) {
  if (!player) return null
  const style = getRarityStyle(player.rarity)
  return (
    <div className={`flex items-center gap-3 rounded-xl border bg-slate-900/70 p-3 ${style.border}`}>
      <div className="flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </div>
        <div className="truncate text-sm font-bold text-white">{player.name}</div>
        <div className="flex items-center gap-1 text-xs text-slate-300">
          <span>{getFlag(player.nationality)}</span>
          <span>
            {player.rating} · {player.rarity}
          </span>
        </div>
      </div>
      {note && <div className="text-xl font-black text-emerald-400">{note}</div>}
    </div>
  )
}

// End-of-game scorecard: headline score, line strengths and the notable picks.
export default function RatingSummary({ summary }) {
  if (!summary) return null

  return (
    <div className="flex flex-col gap-5">
      <div className="anim-pop rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-600/20 to-slate-900 p-6 text-center shadow-xl shadow-emerald-500/20">
        <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Final Score
        </div>
        <div className="my-1 text-6xl font-black text-white">
          {summary.score10.toFixed(1)}
          <span className="text-2xl text-slate-400"> / 10</span>
        </div>
        <div className="text-lg font-bold text-emerald-300">{summary.grade}</div>
        <p className="mt-2 text-sm italic text-slate-300">"{summary.comment}"</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <h3 className="text-sm font-bold text-white">Team Strength</h3>
          <Bar label={LINE_LABELS.ATT} value={summary.lines.attack} />
          <Bar label={LINE_LABELS.MID} value={summary.lines.midfield} />
          <Bar label={LINE_LABELS.DEF} value={summary.lines.defense} />
          <Bar label={LINE_LABELS.GK} value={summary.lines.goalkeeping} />
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <h3 className="text-sm font-bold text-white">Ratings</h3>
          <Bar label="Player Average" value={summary.playerAverage} />
          <Bar label="Chemistry" value={summary.chemistry} />
          <Bar label="Squad Balance" value={summary.balance} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Highlight title="Best Player" player={summary.bestPlayer} note="★" />
        <Highlight title="Weakest Link" player={summary.worstPlayer} />
        <Highlight title="Best Value Pick" player={summary.bestValue} note="💎" />
        <Highlight title="Rarest Card Packed" player={summary.rarest} />
        {summary.biggestMissed && (
          <div className="sm:col-span-2">
            <Highlight title="Biggest Player You Missed" player={summary.biggestMissed} note="😱" />
          </div>
        )}
      </div>
    </div>
  )
}
