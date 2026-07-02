// Every distinct position code the game understands. `line` groups positions
// for the per-line ratings (attack / midfield / defense / goalkeeping) shown on
// the final screen.
export const POSITIONS = {
  GK: { code: 'GK', name: 'Goalkeeper', line: 'GK' },
  RB: { code: 'RB', name: 'Right Back', line: 'DEF' },
  CB: { code: 'CB', name: 'Center Back', line: 'DEF' },
  LB: { code: 'LB', name: 'Left Back', line: 'DEF' },
  CDM: { code: 'CDM', name: 'Defensive Mid', line: 'MID' },
  CM: { code: 'CM', name: 'Central Mid', line: 'MID' },
  CAM: { code: 'CAM', name: 'Attacking Mid', line: 'MID' },
  RW: { code: 'RW', name: 'Right Wing', line: 'ATT' },
  LW: { code: 'LW', name: 'Left Wing', line: 'ATT' },
  ST: { code: 'ST', name: 'Striker', line: 'ATT' },
}

export const LINE_LABELS = {
  ATT: 'Attack',
  MID: 'Midfield',
  DEF: 'Defense',
  GK: 'Goalkeeping',
}
