import test from 'node:test'
import assert from 'node:assert/strict'
import { canChooseClassicBox, getClassicMaxOpens, getLatestOpenedIndex } from './classicMode.js'

test('classic mode only allows choosing the latest opened box', () => {
  const openedIndices = [1, 3]

  assert.equal(getLatestOpenedIndex(openedIndices), 3)
  assert.equal(canChooseClassicBox(openedIndices, 1), false)
  assert.equal(canChooseClassicBox(openedIndices, 3), true)
})

test('classic mode has no chooseable box before opening', () => {
  assert.equal(getLatestOpenedIndex([]), null)
  assert.equal(canChooseClassicBox([], 0), false)
})

test('classic mode allows opening every box', () => {
  assert.equal(getClassicMaxOpens(4), 4)
})
