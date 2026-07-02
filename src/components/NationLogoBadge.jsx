import { useState } from 'react'
import { getNationCode } from '../utils/getNationCode.js'
import { getNationLogo } from '../utils/getNationLogo.js'

export default function NationLogoBadge({ nationality }) {
  const [failed, setFailed] = useState(false)
  const logo = getNationLogo(nationality)

  if (!logo || failed) {
    return (
      <span className="flex h-5 min-w-7 items-center justify-center rounded-sm border border-white/70 bg-black/80 px-1 text-[8px] font-black tracking-wide text-white shadow sm:h-6 sm:min-w-8 sm:text-[9px]">
        {getNationCode(nationality)}
      </span>
    )
  }

  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/80 bg-white p-0.5 shadow sm:h-7 sm:w-7">
      <img
        src={logo}
        alt={`${nationality} national team logo`}
        className="h-full w-full object-contain"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </span>
  )
}
