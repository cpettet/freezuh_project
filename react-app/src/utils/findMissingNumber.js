export default function findMissingNumber(list, min, max) {
  /**
   * Uses a modified binary search to find the first position in a given list.
   */
  if (min >= max) {
    // base case
    return min + 1;
  } else {
    // recursive case
    const pivot = Math.floor((min + max) / 2);
    if (list[pivot] === pivot + 1) {
      // case missing is greater than pivot
      return findMissingNumber(list, pivot + 1, max);
    } else {
      // case missing is less than pivot
      return findMissingNumber(list, min, pivot);
    }
  }
}
