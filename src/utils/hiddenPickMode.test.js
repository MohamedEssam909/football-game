import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveHiddenPickChoice } from './hiddenPickMode.js'

const slot = { slotId: 'st', position: 'ST', label: 'ST' }
const visible = { id: 'visible', name: 'Visible ST' }
const hiddenA = { id: 'hidden-a', name: 'Hidden A' }
const hiddenB = { id: 'hidden-b', name: 'Hidden B' }

test('choosing visible keeps the revealed player and misses only the selected hidden option', () => {
  const result = resolveHiddenPickChoice({
    boxes: [{ player: visible }, { player: hiddenA }, { player: hiddenB }],
    slot,
    choice: 'visible',
    hiddenIndex: 2,
  })

  assert.equal(result.entry.player, visible)
  assert.deepEqual(result.missedPlayers, [hiddenB])
})

test('choosing hidden assigns the selected hidden player and misses only the visible player', () => {
  const result = resolveHiddenPickChoice({
    boxes: [{ player: visible }, { player: hiddenA }, { player: hiddenB }],
    slot,
    choice: 'hidden',
    hiddenIndex: 2,
  })

  assert.equal(result.entry.player, hiddenB)
  assert.deepEqual(result.missedPlayers, [visible])
})

test('hidden choice supports every hidden box index', () => {
  const boxes = [{ player: visible }, { player: hiddenA }, { player: hiddenB }]

  assert.equal(
    resolveHiddenPickChoice({ boxes, slot, choice: 'hidden', hiddenIndex: 1 }).entry.player,
    hiddenA,
  )
  assert.equal(
    resolveHiddenPickChoice({ boxes, slot, choice: 'hidden', hiddenIndex: 2 }).entry.player,
    hiddenB,
  )
})
