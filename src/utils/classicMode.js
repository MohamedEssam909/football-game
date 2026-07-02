export function getLatestOpenedIndex(openedIndices) {
  if (openedIndices.length === 0) return null
  return openedIndices[openedIndices.length - 1]
}

export function getClassicMaxOpens(boxCount) {
  return boxCount
}

export function canChooseClassicBox(openedIndices, boxIndex) {
  return getLatestOpenedIndex(openedIndices) === boxIndex
}
