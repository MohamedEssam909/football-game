// Maps a nationality name to a flag emoji. Kept separate from player data so the
// same lookup is reused by every card. Falls back to a neutral globe so an
// unknown nationality never breaks rendering.
const NATION_FLAGS = {
  Argentina: '🇦🇷',
  Portugal: '🇵🇹',
  France: '🇫🇷',
  Brazil: '🇧🇷',
  Norway: '🇳🇴',
  Egypt: '🇪🇬',
  Belgium: '🇧🇪',
  Croatia: '🇭🇷',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  Germany: '🇩🇪',
  Spain: '🇪🇸',
  Netherlands: '🇳🇱',
  Poland: '🇵🇱',
  Slovenia: '🇸🇮',
  Italy: '🇮🇹',
  Uruguay: '🇺🇾',
  Morocco: '🇲🇦',
  Sweden: '🇸🇪',
  Canada: '🇨🇦',
  Colombia: '🇨🇴',
  Senegal: '🇸🇳',
  Cameroon: '🇨🇲',
  Algeria: '🇩🇿',
  Georgia: '🇬🇪',
  Hungary: '🇭🇺',
  Austria: '🇦🇹',
  Nigeria: '🇳🇬',
  Serbia: '🇷🇸',
  Denmark: '🇩🇰',
  Switzerland: '🇨🇭',
}

export function getFlag(nationality) {
  return NATION_FLAGS[nationality] || '🏳️'
}
