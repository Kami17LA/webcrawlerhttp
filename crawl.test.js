const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

// Test 1
test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

// Test 2
test("normalizeURL strip trailing slash", () => {
	const input = "https://blog.boot.dev/path/";
	const actual = normalizeURL(input);
	const expected = "blog.boot.dev/path";
	expect(actual).toEqual(expected);
});

// Test 3
test("normalizeURL capitals", () => {
	const input = "https://BLOG.boot.dev/path";
	const actual = normalizeURL(input);
	const expected = "blog.boot.dev/path";
	expect(actual).toEqual(expected);
});

// Test 4
test("normalizeURL strip http", () => {
	const input = "http://blog.boot.dev/path";
	const actual = normalizeURL(input);
	const expected = "blog.boot.dev/path";
	expect(actual).toEqual(expected);
});
