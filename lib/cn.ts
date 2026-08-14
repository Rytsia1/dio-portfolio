/**
 * Tiny className concatenator.
 *
 * Keeps component className strings readable and lets us pass `false`,
 * `null`, or `undefined` to skip a class without juggling template literals.
 */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
