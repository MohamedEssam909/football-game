import test from 'node:test'
import assert from 'node:assert/strict'
import { getNationLogo } from './getNationLogo.js'

test('Egypt maps to an actual national team logo image URL', () => {
  assert.match(getNationLogo('Egypt'), /^https:\/\/upload\.wikimedia\.org\/.+\.svg$/)
})
