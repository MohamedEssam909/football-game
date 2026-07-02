// A formation is an ordered list of slots. `slotId` is unique (two CBs need
// distinct ids), `position` is the code used to pick eligible players, and
// x/y are percentages on the pitch (0,0 = top-left, 100,100 = bottom-right).
// The player fills slots top-of-list first, so ordering here is the play order.

export const FORMATIONS = {
  '4-3-3': {
    name: '4-3-3',
    slots: [
      { slotId: 'GK', position: 'GK', label: 'GK', x: 50, y: 90 },
      { slotId: 'RB', position: 'RB', label: 'RB', x: 84, y: 72 },
      { slotId: 'CB2', position: 'CB', label: 'CB', x: 62, y: 77 },
      { slotId: 'CB1', position: 'CB', label: 'CB', x: 38, y: 77 },
      { slotId: 'LB', position: 'LB', label: 'LB', x: 16, y: 72 },
      { slotId: 'CDM', position: 'CDM', label: 'CDM', x: 36, y: 57 },
      { slotId: 'CM', position: 'CM', label: 'CM', x: 64, y: 53 },
      { slotId: 'CAM', position: 'CAM', label: 'CAM', x: 50, y: 40 },
      { slotId: 'RW', position: 'RW', label: 'RW', x: 82, y: 22 },
      { slotId: 'ST', position: 'ST', label: 'ST', x: 50, y: 15 },
      { slotId: 'LW', position: 'LW', label: 'LW', x: 18, y: 22 },
    ],
  },
}

export const DEFAULT_FORMATION = '4-3-3'
