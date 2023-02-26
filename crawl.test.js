const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
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


// Prove another functions

//Test 1
test("getURLsFromHTML absolute", () => {
	const inputHTMLBody = `
		<html>
			<body>
				<a href = "https://blog.boot.dev/path/">
					Boot.dev Blog
				</a>
			</body>
		</html>
	`;
	const inputBaseURL = "https://blog.boot.dev/path/";
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expected = ["https://blog.boot.dev/path/"];
	expect(actual).toEqual(expected);
});

//Test 2
test("getURLsFromHTML relative", () => {
	const inputHTMLBody = `
		<html>
			<body>
				<a href = "/path/">
					Boot.dev Blog
				</a>
			</body>
		</html>
	`;
	const inputBaseURL = "https://blog.boot.dev";
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expected = ["https://blog.boot.dev/path/"];
	expect(actual).toEqual(expected);
});

//Test 3
test("getURLsFromHTML both", () => {
	const inputHTMLBody = `
		<html>
			<body>
				<a href = "https://blog.boot.dev/path1/">
					Boot.dev Blog Path one
				</a>

				<a href = "/path2/">
					Boot.dev Blog Path two
				</a>
			</body>
		</html>
	`;
	const inputBaseURL = "https://blog.boot.dev";
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
	expect(actual).toEqual(expected);
});

//Test 4
test("getURLsFromHTML relative", () => {
	const inputHTMLBody = `
		<html>
			<body>
				<a href = "invalid">
					Invalid URL
				</a>
			</body>
		</html>
	`;
	const inputBaseURL = "https://blog.boot.dev";
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expected = [];
	expect(actual).toEqual(expected);
});
