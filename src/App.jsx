import { useState } from 'react'
import Home from './pages/Home.jsx'
import Game from './pages/Game.jsx'
import FinalSquad from './pages/FinalSquad.jsx'

// Top-level screen router. Kept intentionally simple (no router lib) for the
// MVP: three screens and the squad result passed between them. `runId` forces a
// fresh Game instance on replay so all per-game state resets cleanly.
export default function App() {
  const [screen, setScreen] = useState('home')
  const [result, setResult] = useState(null) // { squad, missedPlayers }
  const [runId, setRunId] = useState(0)

  function startGame() {
    setResult(null)
    setRunId((id) => id + 1)
    setScreen('game')
  }

  function finishGame(squad, missedPlayers) {
    setResult({ squad, missedPlayers })
    setScreen('final')
  }

  function restart() {
    setResult(null)
    setScreen('home')
  }

  return (
    <div className="min-h-screen">
      {screen === 'home' && <Home onStart={startGame} />}
      {screen === 'game' && <Game key={runId} onFinish={finishGame} />}
      {screen === 'final' && result && (
        <FinalSquad
          squad={result.squad}
          missedPlayers={result.missedPlayers}
          onRestart={restart}
        />
      )}
    </div>
  )
}
