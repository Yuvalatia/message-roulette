const { getRandom } = require('../../../helpers')

describe('getRandom Function tests', () => {
  test('should return random number', () => {
    const testArray = [5, 2, 3]
    const randomValue = getRandom(testArray)

    expect(testArray.includes(randomValue)).toBe(true)
  })

  test('should return random string', () => {
    const testArray = ['yuval', 'atia', 'test']
    const randomValue = getRandom(testArray)

    expect(testArray.includes(randomValue)).toBe(true)
  })

  test('expect for failure', () => {
    const testArray = ['yuval', 'atia', 'test']

    expect(testArray.includes(1)).toBe(false)
  })

  test('single value array', () => {
    const testArray = [6]

    expect(getRandom(testArray)).toBe(6)
  })
})
