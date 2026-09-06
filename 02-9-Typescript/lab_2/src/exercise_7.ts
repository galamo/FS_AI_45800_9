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

type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

/**
 * Build a success result. E is unused here, so it is `never`:
 * ok(42) infers Result<number, never>, which can still flow into Result<number, string>.
 */
function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

/**
 * Build a failure result. T is unused, so it is `never`:
 * err("missing") infers Result<never, string>.
 */
function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

/**
 * Transform the success value T → U. The error type E is unchanged.
 * On failure, `fn` is not called — the same error object is returned
 * (typed as Result<U, E> because the error branch does not mention T).
 */
function mapResult<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  if (result.ok) {
    return ok(fn(result.value));
  }

  return result;
}

/**
 * Parse a string into an integer greater than 0.
 * "42" → ok(42). "0", "-3", "3.5", "abc" → err(message).
 */
function parsePositiveInt(raw: string): Result<number, string> {
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
function getFromRecord<V>(
  record: Record<string, V>,
  key: string,
): Result<V, string> {
  if (Object.hasOwn(record, key)) {
    return ok(record[key] as V);
  }

  return err(`No value found for key "${key}"`);
}

const parsed = parsePositiveInt("42");
const doubled = mapResult(parsed, (n) => n * 2);

const stock: Record<string, number> = {
  pen: 10,
  notebook: 3,
};

const pens = getFromRecord(stock, "pen");
const missing = getFromRecord(stock, "stapler");

if (doubled.ok) {
  const amount: number = doubled.value;
  console.log("doubled:", amount);
} else {
  const message: string = doubled.error;
  console.log("parse error:", message);
}

if (pens.ok) {
  const count: number = pens.value;
  console.log("pens in stock:", count);
}

if (!missing.ok) {
  const message: string = missing.error;
  console.log("missing key:", message);
}

console.log("failed parse:", parsePositiveInt("abc"));
console.log("mapResult on failure does not call fn:", mapResult(err("boom"), (n: number) => n * 2));

// Makes this file a module so `Result` / `ok` / `err` do not collide with other src files.
export {};
