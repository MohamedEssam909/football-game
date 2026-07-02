import { useState } from 'react'

// Renders a player's photo, falling back to an initials badge if the remote
// image fails to load (handles the "missing player images" edge case). Reused
// by the card and the pitch tokens.
export default function PlayerImage({ player, className = '' }) {
  const [failed, setFailed] = useState(false)

  const initials = player.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (failed || !player.image) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-800 font-bold text-slate-200 ${className}`}
        aria-label={player.name}
      >
        {initials}
      </div>
    )
  }

  return (
    <img
      src={player.image}
      alt={player.name}
      loading="lazy"
      // SoFIFA's CDN blocks hotlinking (403) when a Referer is sent, so omit it.
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      // Focus the crop toward the upper body so faces sit centered in the
      // square rather than being cut off near the top edge.
      className={`object-cover object-[center_18%] ${className}`}
    />
  )
}
