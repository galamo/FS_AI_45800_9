"use strict";
/**
 * Exercise 7 — Two type parameters + a typed `Result`
 *
 * A function can succeed with a value of type T, or fail with an error of type E.
 * Model both outcomes in one discriminated union, then branch on `ok`.
 *
 *   Result<number, string>  →  { ok: true; value: number } | { ok: false; error: string }
 *
 * Inside `if (result.ok)` TypeScript narrows to the success branch (`.value`).
 * Inside `else` it narrows to the failure branch (`.error`).
 *
 * No `extends`, no `any`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Build a success result. E is unused here, so it is `never`:
 * ok(42) infers Result<number, never>, which can still flow into Result<number, string>.
 */
function ok(value) {
    return { ok: true, value };
}
/**
 * Build a failure result. T is unused, so it is `never`:
 * err("missing") infers Result<never, string>.
 */
function err(error) {
    return { ok: false, error };
}
/**
 * Transform the success value T → U. The error type E is unchanged.
 * On failure, `fn` is not called — the same error object is returned
 * (typed as Result<U, E> because the error branch does not mention T).
 */
function mapResult(result, fn) {
    if (result.ok) {
        return ok(fn(result.value));
    }
    return result;
}
/**
 * Parse a string into an integer greater than 0.
 * "42" → ok(42). "0", "-3", "3.5", "abc" → err(message).
 */
function parsePositiveInt(raw) {
    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed <= 0) {
        return err(`"${raw}" is not a positive integer`);
    }
    return ok(parsed);
}
/**
 * Look up a key in a dictionary. V is the value type of the record.
 * Missing keys fail with a string message (E is string, not V).
 */
function getFromRecord(record, key) {
    if (Object.hasOwn(record, key)) {
        return ok(record[key]);
    }
    return err(`No value found for key "${key}"`);
}
const parsed = parsePositiveInt("42");
const doubled = mapResult(parsed, (n) => n * 2);
const stock = {
    pen: 10,
    notebook: 3,
};
const pens = getFromRecord(stock, "pen");
const missing = getFromRecord(stock, "stapler");
if (doubled.ok) {
    const amount = doubled.value;
    console.log("doubled:", amount);
}
else {
    const message = doubled.error;
    console.log("parse error:", message);
}
if (pens.ok) {
    const count = pens.value;
    console.log("pens in stock:", count);
}
if (!missing.ok) {
    const message = missing.error;
    console.log("missing key:", message);
}
console.log("failed parse:", parsePositiveInt("abc"));
console.log("mapResult on failure does not call fn:", mapResult(err("boom"), (n) => n * 2));
