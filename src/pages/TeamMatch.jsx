import { useMemo, useState } from 'react'
import { FORMATIONS, DEFAULT_FORMATION } from '../data/formations.js'
import { buildRandomTeam, getPickCandidates, pickRandomPlayer, simulateMatch } from '../utils/teamMatch.js'
import SquadPitch from '../components/SquadPitch.jsx'

const TEAM_NAMES = {
  teamA: 'Team A',
  teamB: 'Team B',
}

function squadBySlot(entries) {
  return entries.reduce((map, entry) => {
    map[entry.slotId] = entry
    return map
  }, {})
}

function TeamPanel({
  teamKey,
  team,
  slots,
  active,
  usedIds,
  onRandomPick,
  onChoosePlayer,
  onAutoFill,
}) {
  const currentSlot = slots[team.length]
  const candidates = useMemo(
    () =>
      currentSlot
        ? getPickCandidates({
            positionCode: currentSlot.position,
            usedPlayerIds: usedIds,
            limit: 6,
          })
        : [],
    [currentSlot, usedIds],
  )

  return (
    <section className={`rounded-2xl border bg-slate-900/70 p-4 ${active ? 'border-emerald-400' : 'border-slate-700'}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black text-white">{TEAM_NAMES[teamKey]}</h2>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {team.length}/{slots.length} players
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAutoFill(teamKey)}
          disabled={team.length >= slots.length}
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-bold uppercase text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Auto Fill
        </button>
      </div>

      <SquadPitch slots={slots} squadBySlot={squadBySlot(team)} size="sm" />

      {currentSlot ? (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="text-sm font-bold text-white">
              Pick {currentSlot.label}
            </div>
            <button
              type="button"
              onClick={() => onRandomPick(teamKey)}
              className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-black uppercase text-white transition hover:bg-emerald-400"
            >
              Random Pick
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {candidates.map((player) => (
              <button
                type="button"
                key={player.id}
                onClick={() => onChoosePlayer(teamKey, player)}
                className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-left transition hover:border-emerald-400 hover:bg-slate-700"
              >
                <div className="truncate text-xs font-black text-white">{player.name}</div>
                <div className="text-[11px] font-semibold text-slate-400">
                  {player.rating} · {player.position} · {player.rarity}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-lg bg-emerald-500/10 px-3 py-2 text-center text-sm font-bold text-emerald-300">
          Team complete
        </p>
      )}
    </section>
  )
}

export default function TeamMatch({ onRestart }) {
  const slots = FORMATIONS[DEFAULT_FORMATION].slots
  const [teams, setTeams] = useState({ teamA: [], teamB: [] })
  const [result, setResult] = useState(null)

  const usedIds = useMemo(
    () => [...teams.teamA, ...teams.teamB].map((entry) => entry.player.id),
    [teams],
  )
  const activeTeam = teams.teamA.length <= teams.teamB.length ? 'teamA' : 'teamB'
  const complete = teams.teamA.length === slots.length && teams.teamB.length === slots.length

  function addPlayer(teamKey, player) {
    setResult(null)
    setTeams((prev) => {
      const team = prev[teamKey]
      const slot = slots[team.length]
      if (!slot || usedIds.includes(player.id)) return prev
      return {
        ...prev,
        [teamKey]: [
          ...team,
          {
            slotId: slot.slotId,
            slot,
            player,
          },
        ],
      }
    })
  }

  function randomPick(teamKey) {
    const team = teams[teamKey]
    const slot = slots[team.length]
    if (!slot) return
    addPlayer(
      teamKey,
      pickRandomPlayer({
        positionCode: slot.position,
        usedPlayerIds: usedIds,
      }),
    )
  }

  function autoFill(teamKey) {
    setResult(null)
    setTeams((prev) => {
      const existing = prev[teamKey]
      const ids = [...prev.teamA, ...prev.teamB].map((entry) => entry.player.id)
      const remainingSlots = slots.slice(existing.length)
      const additions = buildRandomTeam({ slots: remainingSlots, usedPlayerIds: ids })
      return {
        ...prev,
        [teamKey]: [...existing, ...additions],
      }
    })
  }

  function playMatch() {
    if (!complete) return
    setResult(simulateMatch({ teamA: teams.teamA, teamB: teams.teamB }))
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Team Match Mode
          </div>
          <h1 className="text-3xl font-black text-white">Build Two Teams</h1>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          Home
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TeamPanel
          teamKey="teamA"
          team={teams.teamA}
          slots={slots}
          active={activeTeam === 'teamA' && !complete}
          usedIds={usedIds}
          onRandomPick={randomPick}
          onChoosePlayer={addPlayer}
          onAutoFill={autoFill}
        />
        <TeamPanel
          teamKey="teamB"
          team={teams.teamB}
          slots={slots}
          active={activeTeam === 'teamB' && !complete}
          usedIds={usedIds}
          onRandomPick={randomPick}
          onChoosePlayer={addPlayer}
          onAutoFill={autoFill}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={playMatch}
          disabled={!complete}
          className="rounded-xl bg-amber-400 px-8 py-3 text-lg font-black text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Play Match
        </button>
      </div>

      {result && (
        <section className="anim-pop rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Final Result
          </div>
          <div className="my-2 text-5xl font-black text-white">
            {result.teamAGoals} - {result.teamBGoals}
          </div>
          <div className="text-lg font-bold text-emerald-300">
            {result.winner === 'draw' ? 'Draw' : `${TEAM_NAMES[result.winner]} wins`}
          </div>
          <p className="mt-1 text-sm text-slate-300">{result.note}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {['teamA', 'teamB'].map((teamKey) => (
              <div key={teamKey} className="rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-left">
                <div className="font-black text-white">{TEAM_NAMES[teamKey]}</div>
                <div className="text-sm text-slate-300">
                  Strength {result[teamKey].score.toFixed(1)} · Rating{' '}
                  {result[teamKey].score10.toFixed(1)}/10 · Chemistry{' '}
                  {result[teamKey].chemistry}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
