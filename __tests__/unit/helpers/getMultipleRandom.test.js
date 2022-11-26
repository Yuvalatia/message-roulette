const { getMultipleRandom } = require('../../../helpers')

describe('getMultipleRandom Function tests', () => {
  test('should return 2 random numbers', () => {
    const testArray = [5, 2, 3]
    const numOfRandoms = 2
    const randomValues = getMultipleRandom(testArray, numOfRandoms)

    expect(randomValues.every(e => testArray.includes(e))).toBe(true)
    expect(randomValues.length).toBe(numOfRandoms)
  })

  test('should return random string array length 1', () => {
    const testArray = ['yuval', 'atia', 'test']
    const numOfRandoms = 1
    const randomValues = getMultipleRandom(testArray, numOfRandoms)

    expect(testArray.includes(randomValues[0])).toBe(true)
    expect(randomValues.length).toBe(numOfRandoms)
  })

  test('should return random string array length 2', () => {
    const testArray = ['yuval', 'atia', 'test']
    const numOfRandoms = 2
    const randomValues = getMultipleRandom(testArray, numOfRandoms)

    expect(randomValues.every(e => testArray.includes(e))).toBe(true)
    expect(randomValues.length).toBe(numOfRandoms)
  })

  test('expect for failure', () => {
    const testArray = ['yuval', 'atia', 'test']
    const numOfRandoms = 1
    const randomValues = getMultipleRandom(testArray, numOfRandoms)

    expect(randomValues.includes(1)).toBe(false)
    expect(randomValues.length === 2).toBe(false)
  })

  test('single value array', () => {
    const testArray = [6]
    const numOfRandoms = 1
    const randomValues = getMultipleRandom(testArray, numOfRandoms)

    expect(randomValues[0]).toBe(6)
    expect(randomValues.length).toBe(numOfRandoms)
  })
})
