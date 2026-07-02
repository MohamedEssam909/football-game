export function resolveHiddenPickChoice({ boxes, slot, choice, hiddenIndex }) {
  const chosenIndex = choice === 'hidden' ? hiddenIndex : 0
  const chosenBox = boxes[chosenIndex]
  const missedIndex = choice === 'hidden' ? 0 : hiddenIndex
  const missedBox = boxes[missedIndex]

  if (!chosenBox || !missedBox || hiddenIndex === 0) {
    throw new Error('Hidden pick choice resolved to an invalid box')
  }

  return {
    chosenIndex,
    entry: {
      slotId: slot.slotId,
      slot,
      player: chosenBox.player,
    },
    missedPlayers: [missedBox.player],
  }
}
