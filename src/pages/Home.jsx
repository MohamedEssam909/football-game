import { DEFAULT_FORMATION } from '../data/formations.js'

// Landing screen: title, how-to, and the start button. Formation is fixed to
// 4-3-3 for the MVP but shown here so the choice is visible for later versions.
export default function Home({ onStart }) {
  return (
    <div className="anim-fade-up mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-4 py-12 text-center">
      <div>
        <div className="anim-float text-5xl">⚽📦</div>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
          Football <span className="text-emerald-400">Mystery Boxes</span>
        </h1>
        <p className="mt-3 text-slate-300">
          Build your dream starting XI by opening mystery boxes. For each position you
          get 4 boxes — open up to 2, then pick your player. Choose wisely: you'll see
          the legends you left behind.
        </p>
      </div>

      <ol className="w-full space-y-2 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 text-left text-sm text-slate-300">
        <li>1. Each position gives you 4 mystery boxes.</li>
        <li>2. Open a maximum of 2 boxes per position.</li>
        <li>3. Pick one revealed player to fill the slot.</li>
        <li>4. See which players were hiding in the boxes you skipped.</li>
        <li>5. Complete all 11 slots for your final team rating out of 10.</li>
      </ol>

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-300">
          Formation: {DEFAULT_FORMATION}
        </div>
        <button
          type="button"
          onClick={onStart}
          className="rounded-2xl bg-emerald-500 px-10 py-4 text-xl font-black text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400"
        >
          Start Game
        </button>
      </div>
    </div>
  )
}
