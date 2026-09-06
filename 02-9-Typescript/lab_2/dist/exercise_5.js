/**
 * Exercise 5 — Two type parameters (`zip` / `unzip` / `swap`)
 *
 * One generic (`<T>`) is enough when every value shares the same type.
 * Use two (`<T, U>`) when the two sides of a pair can differ:
 *   zip(["Ada", "Grace"], [36, 85])  →  [string, number][]
 *
 * TypeScript infers T and U from the arguments. No `extends`, no `any`.
 */
/**
 * Pair items from two arrays, stopping at the shorter length.
 * leftover items on the longer array are ignored.
 *
 * zip([1, 2, 3], ["a"])  →  [[1, "a"]]
 */
function zip(left, right) {
    const length = Math.min(left.length, right.length);
    const pairs = [];
    for (let i = 0; i < length; i++) {
        // i is in range for both arrays. The assertion is only needed because
        // tsconfig has noUncheckedIndexedAccess (indexed access is T | undefined).
        const leftItem = left[i];
        const rightItem = right[i];
        pairs.push([leftItem, rightItem]);
    }
    return pairs;
}
/**
 * Split an array of pairs back into two arrays (the inverse of zip).
 * unzip([["Ada", 36], ["Grace", 85]])  →  [["Ada", "Grace"], [36, 85]]
 */
const data = [["numberOfUsers", 100], ["numberOfOrders", 1000], ["numberOfProducts", 10000]];
function unzip(pairs) {
    const left = [];
    const right = [];
    for (const [leftItem, rightItem] of pairs) {
        left.push(leftItem);
        right.push(rightItem);
    }
    return [left, right];
}
/**
 * Flip a single pair. The tuple type flips with the values:
 * swap(["pen", 10]) is typed as [number, string], not [string, number].
 */
function swap(pair) {
    const [left, right] = pair;
    return [right, left];
}
const pairs = zip(["Ada", "Grace"], [36, 85]);
const back = unzip(pairs);
const flipped = swap(["pen", 10]);
const names = back[0];
const ages = back[1];
const label = flipped[0];
const count = flipped[1];
console.log("pairs:", pairs);
console.log("names / ages:", names, ages);
console.log("flipped:", label, count);
console.log("shorter array wins:", zip([1, 2, 3], ["a"]));
// Makes this file a module so `names` / `zip` do not collide with other src files.
export {};
