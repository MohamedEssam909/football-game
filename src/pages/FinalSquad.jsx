import { useMemo, useState } from 'react'
import { FORMATIONS, DEFAULT_FORMATION } from '../data/formations.js'
import { calculateRating } from '../utils/calculateRating.js'
import { getPositionFit } from '../utils/positionFit.js'
import { getRarityStyle } from '../utils/getRarityColor.js'
import { getFlag } from '../utils/getFlag.js'
import SquadPitch from '../components/SquadPitch.jsx'
import RatingSummary from '../components/RatingSummary.jsx'

export default function FinalSquad({ squad, missedPlayers, onRestart }) {
  const slots = FORMATIONS[DEFAULT_FORMATION].slots
  const [copied, setCopied] = useState(false)

  // calculateRating is pure and mildly expensive; memoize on the squad.
  const summary = useMemo(
    () => calculateRating(squad, missedPlayers),
    [squad, missedPlayers],
  )

  const squadBySlot = squad.reduce((map, entry) => {
    map[entry.slotId] = entry
    return map
  }, {})

  async function shareResult() {
    if (!summary) return
    const lines = [
      `⚽ My Football Mystery Boxes squad: ${summary.score10.toFixed(1)}/10 — ${summary.grade}`,
      `Attack ${summary.lines.attack} · Midfield ${summary.lines.midfield} · Defense ${summary.lines.defense} · GK ${summary.lines.goalkeeping}`,
      `Chemistry ${summary.chemistry} · Best: ${summary.bestPlayer.name}`,
    ]
    const text = lines.join('\n')
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Football Mystery Boxes', text })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // User dismissed the share sheet or clipboard was blocked — no-op.
    }
  }

  if (!summary) {
    return (
      <div className="p-8 text-center text-slate-300">
        No squad to show.{' '}
        <button className="text-emerald-400 underline" onClick={onRestart}>
          Restart
        </button>
      </div>
    )
  }

  return (
    <div className="anim-fade-up mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
      <h1 className="text-center text-3xl font-black text-white sm:text-4xl">
        Your Final Squad
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <SquadPitch slots={slots} squadBySlot={squadBySlot} size="lg" />
        <RatingSummary summary={summary} />
      </div>

      {/* Full squad table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-700">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-slate-800 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Slot</th>
              <th className="px-3 py-2">Player</th>
              <th className="px-3 py-2">Rating</th>
              <th className="px-3 py-2">Nation</th>
              <th className="px-3 py-2">Rarity</th>
              <th className="px-3 py-2">Fit</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => {
              const entry = squadBySlot[slot.slotId]
              if (!entry) return null
              const { player } = entry
              const fit = getPositionFit(player, slot.position)
              const style = getRarityStyle(player.rarity)
              return (
                <tr key={slot.slotId} className="border-t border-slate-800">
                  <td className="px-3 py-2 font-semibold text-emerald-400">{slot.label}</td>
                  <td className="px-3 py-2 font-medium text-white">{player.name}</td>
                  <td className="px-3 py-2 font-bold text-white">{player.rating}</td>
                  <td className="px-3 py-2 text-slate-300">
                    {getFlag(player.nationality)} {player.nationality}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[11px] font-bold text-white ${style.badgeBg}`}
                    >
                      {player.rarity}
                    </span>
                  </td>
                  <td
                    className={`px-3 py-2 text-xs font-semibold ${
                      fit.fit === 'natural'
                        ? 'text-emerald-400'
                        : fit.fit === 'secondary'
                          ? 'text-amber-400'
                          : 'text-red-400'
                    }`}
                  >
                    {fit.label}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-center gap-4 pb-4 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-emerald-500 px-8 py-3 font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400 active:scale-95"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={shareResult}
          className="rounded-xl border border-slate-600 bg-slate-800 px-8 py-3 font-bold text-white transition hover:scale-105 hover:bg-slate-700 active:scale-95"
        >
          {copied ? 'Copied! ✓' : 'Share Result'}
        </button>
      </div>
    </div>
  )
}
