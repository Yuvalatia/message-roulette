/**
 * Returns random value from the array
 * @param {Array<any>} arr
 * @return {any}
 */
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

module.exports = {
  getRandom
}
