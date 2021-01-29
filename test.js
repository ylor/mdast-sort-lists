const fs = require("fs");
const unified = require("unified");
const remarkParse = require("remark-parse");
const removePosition = require("unist-util-remove-position");

const madstSortLists = require(".");

const doc = fs.readFileSync("test/unsorted.md");
const sortedDoc = fs.readFileSync("test/sorted.md");

test("Sort nested lists", () => {
  // Tokenize both markdown
  const sortedDocParsed = unified().use(remarkParse).parse(sortedDoc);
  const docParsed = unified().use(remarkParse).parse(doc);
  // Remove positions because they shift around after sorting and cause test to fail
  removePosition(sortedDocParsed, true);
  removePosition(docParsed, true);
  // Call ourselves 🎉
  madstSortLists(docParsed);
  // Compare trees
  expect(docParsed).toEqual(sortedDocParsed);
});
