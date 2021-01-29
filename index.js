const visit = require("unist-util-visit");

function removeArticles(str) {
  words = str.toLowerCase().split(" ");
  if (words.length <= 1) return str;
  if (words[0] == "a" || words[0] == "the") return words.splice(1).join(" ");
  return str;
}

function compare(a, b) {
  // Use toLowerCase() to ignore character casing
  let listItemA = a.children[0].children[0].value;
  let listItemB = b.children[0].children[0].value.toLowerCase();

  listItemA = removeArticles(listItemA);
  listItemB = removeArticles(listItemB);

  // naive vanilla sorting
  // shortcomings:
  // Sorts [1, 30, 4, 21, 100000] as [1, 100000, 21, 30, 4]
  // let comparison = 0;
  // if (listItemA > listItemB) {
  //   comparison = 1;
  // } else if (listItemA < listItemB) {
  //   comparison = -1;
  // }
  // return comparison;

  // localeCompare
  // allows for more natural sorting but is slower compared to Intl.Collator
  //return listItemA.localeCompare(listItemB, { numeric: true, sensitivity: 'base' });

  // Intl.Collator
  // All the benefits of localeCompare with higher performance across larger arrays
  // Source
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  return collator.compare(listItemA, listItemB);
}

function sorter(tree) {
  visit(tree, "list", (node) => {
    node.children.sort(compare);
  });
}

module.exports = sorter;
