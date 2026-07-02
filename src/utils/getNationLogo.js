const NATION_LOGOS = {
  Egypt: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Egyptian_Football_Association_logo.svg',
}

export function getNationLogo(nationality) {
  return NATION_LOGOS[nationality] || null
}
