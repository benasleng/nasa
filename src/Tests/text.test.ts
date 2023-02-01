import { formatText } from "../Utils/text"

test('formatText should return null', () => {
  const text = formatText('')

  expect(text).toBeNull()
})

test('formatText should change "TESTING TEXT" to "Testing text"', () => {
  const text = formatText('TESTING TEXT')

  expect(text).toEqual('Testing Text')
})

export {}