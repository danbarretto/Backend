const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 9]

/**
 * Finds the number without a pair in a array
 * @param {number[]} array Array containing all pairs of numbers and only 1 number without pair
 * @returns The number without a pair
 */
function findNoPair(array) {
  const counter = {}

  array.forEach((number) => {
    //initialize object to prevent NaN value
    if (counter[number] === undefined) counter[number] = 0

    //Counts the number of ocurrences of each element in array
    counter[number]++
  })

  //Returns the number without a pair in array
  const noPair = Object.keys(counter).find((key) => counter[key] == 1)

  return noPair === undefined ? 'This array does not have a number without a pair' : noPair
}

console.log(findNoPair(arr))
