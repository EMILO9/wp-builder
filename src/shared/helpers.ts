import * as changeCase from "change-case";

/**
 * Template helpers for wp-builder.
 * Used inside Handlebars templates during build time.
 */
export const helpers = {
  /**
   * Convert to camelCase
   */
  camelCase(v: unknown) {
    return changeCase.camelCase(String(v));
  },

  /**
   * Convert to Capital Case
   */
  capitalCase(v: unknown) {
    return changeCase.capitalCase(String(v));
  },

  /**
   * Convert to CONSTANT_CASE
   */
  constantCase(v: unknown) {
    return changeCase.constantCase(String(v));
  },

  /**
   * Convert to dot.case
   */
  dotCase(v: unknown) {
    return changeCase.dotCase(String(v));
  },

  /**
   * Convert to kebab-case
   */
  kebabCase(v: unknown) {
    return changeCase.kebabCase(String(v));
  },

  /**
   * Convert to no case (space separated lowercase)
   */
  noCase(v: unknown) {
    return changeCase.noCase(String(v));
  },

  /**
   * Convert to PascalCase
   */
  pascalCase(v: unknown) {
    return changeCase.pascalCase(String(v));
  },

  /**
   * Convert to Pascal_Snake_Case
   */
  pascalSnakeCase(v: unknown) {
    return changeCase.pascalSnakeCase(String(v));
  },

  /**
   * Convert to path/case
   */
  pathCase(v: unknown) {
    return changeCase.pathCase(String(v));
  },

  /**
   * Convert to Sentence case
   */
  sentenceCase(v: unknown) {
    return changeCase.sentenceCase(String(v));
  },

  /**
   * Convert to snake_case
   */
  snakeCase(v: unknown) {
    return changeCase.snakeCase(String(v));
  },

  /**
   * Split string into words
   */
  split(v: unknown) {
    return changeCase.split(String(v));
  },

  /**
   * Split string and keep numbers separate
   */
  splitSeparateNumbers(v: unknown) {
    return changeCase.splitSeparateNumbers(String(v));
  },

  /**
   * Convert to Train-Case
   */
  trainCase(v: unknown) {
    return changeCase.trainCase(String(v));
  },

  /**
   * Converts a value to uppercase string.
   */
  upper(v: unknown) {
    return String(v).toUpperCase();
  },

  /**
   * Converts a value to lowercase string.
   */
  lower(v: unknown) {
    return String(v).toLowerCase();
  },

  /**
   * Trims whitespace from both sides of a string.
   */
  trim(v: unknown) {
    return String(v).trim();
  },

  /**
   * Replaces all occurrences of a substring.
   */
  replace(v: unknown, search: string, value: string) {
    return String(v).replaceAll(search, value);
  },

  /**
   * Joins an array into a string using a separator.
   */
  join(arr: unknown, sep = ", ") {
    return Array.isArray(arr) ? arr.map(String).join(sep) : "";
  },

  /**
   * Returns the first element of an array.
   */
  first(arr: unknown) {
    return Array.isArray(arr) ? arr[0] : undefined;
  },

  /**
   * Returns the last element of an array.
   */
  last(arr: unknown) {
    return Array.isArray(arr) ? arr[arr.length - 1] : undefined;
  },

  /**
   * Returns the length of an array.
   */
  length(arr: unknown) {
    return Array.isArray(arr) ? arr.length : 0;
  },

  /**
   * Checks if an array includes a value.
   */
  includes(arr: unknown, value: unknown) {
    return Array.isArray(arr) && arr.some((v) => v === value);
  },

  /**
   * Removes duplicate values from an array.
   */
  unique(arr: unknown) {
    return Array.isArray(arr) ? [...new Set(arr)] : [];
  },

  /**
   * Removes falsy values from an array.
   */
  compact(arr: unknown) {
    return Array.isArray(arr) ? arr.filter(Boolean) : [];
  },

  /**
   * Returns a slice of an array.
   */
  slice(arr: unknown, start = 0, end?: number) {
    return Array.isArray(arr) ? arr.slice(start, end) : [];
  },

  /**
   * Strict equality check.
   */
  eq(a: unknown, b: unknown) {
    return a === b;
  },

  /**
   * Strict inequality check.
   */
  ne(a: unknown, b: unknown) {
    return a !== b;
  },

  /**
   * Greater than comparison.
   */
  gt(a: unknown, b: unknown) {
    return Number(a) > Number(b);
  },

  /**
   * Greater than or equal comparison.
   */
  gte(a: unknown, b: unknown) {
    return Number(a) >= Number(b);
  },

  /**
   * Less than comparison.
   */
  lt(a: unknown, b: unknown) {
    return Number(a) < Number(b);
  },

  /**
   * Less than or equal comparison.
   */
  lte(a: unknown, b: unknown) {
    return Number(a) <= Number(b);
  },

  /**
   * Returns true if all arguments are truthy.
   */
  and(...args: unknown[]) {
    return args.every(Boolean);
  },

  /**
   * Returns true if any argument is truthy.
   */
  or(...args: unknown[]) {
    return args.some(Boolean);
  },

  /**
   * Logical NOT.
   */
  not(v: unknown) {
    return !v;
  },

  /**
   * Checks if a value exists (not null, undefined, or empty string).
   */
  exists(v: unknown) {
    return v !== undefined && v !== null && v !== "";
  },

  /**
   * Returns fallback if value is null/undefined.
   */
  default(v: unknown, fallback: unknown) {
    return v ?? fallback;
  },

  /**
   * Converts value to pretty JSON string.
   */
  json(v: unknown) {
    return JSON.stringify(v, null, 2);
  },

  /**
   * Converts value to JSON string.
   */
  stringify(v: unknown) {
    return JSON.stringify(v);
  },

  /**
   * Ensures value is an array.
   */
  toArray(v: unknown) {
    return Array.isArray(v) ? v : v == null ? [] : [v];
  },

  /**
   * Checks if value is an array.
   */
  isArray(v: unknown) {
    return Array.isArray(v);
  },

  /**
   * Checks if an array is empty (or value is falsy).
   */
  isEmpty(v: unknown) {
    return Array.isArray(v) ? v.length === 0 : !v;
  },

  /**
   * Returns value or fallback if null/undefined.
   */
  safe(v: unknown, fallback = "") {
    return v == null ? fallback : v;
  },
};
