/**
 * Returns random value from the array
 * @param {Array<any>} arr
 * @return {any}
 */
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

/**
 * Returns random values from the array
 * @param {Array<any>} arr
 * @param {Number} num
 * @return {Array<any>} new sliced random values array
 */
const getMultipleRandom = (arr, numOfRandoms) => {
  const shuffledArray = [...arr].sort(() => 0.5 - Math.random())
  return shuffledArray.slice(0, numOfRandoms)
}

module.exports = {
  getRandom,
  getMultipleRandom
}
