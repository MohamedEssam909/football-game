// How well a player fits the slot they were placed in. Shared by chemistry and
// rating so both agree on what "out of position" means.
//
//  - natural   : slot is the player's primary position   -> no penalty
//  - secondary : slot is one of their secondary positions -> small penalty
//  - out       : player is out of position                -> bigger penalty

export function getPositionFit(player, slotPosition) {
  if (player.position === slotPosition) {
    return { fit: 'natural', label: 'In position', multiplier: 1.0, bonus: 12 }
  }
  if ((player.secondaryPositions || []).includes(slotPosition)) {
    return { fit: 'secondary', label: 'Off position', multiplier: 0.97, bonus: 0 }
  }
  return { fit: 'out', label: 'Out of position', multiplier: 0.9, bonus: -20 }
}
