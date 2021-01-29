# mdast-sort-lists

Transforms a **M**ark**d**own **A**bstract **S**yntax **T**ree. ([mdast](https://github.com/syntax-tree/mdast)) so that listItem are naturally alphabetized. Mutates the input AST.

## Installation

```sh
npm install mdast-sort-lists
```

## Usage

```js
const fs = require("fs");
const remarkParse = require("remark-parse");
const remarkStringify = require("remark-stringify");
const sortLists = require("mdast-sort-lists");

const doc = fs.readFileSync("test/unsorted.md")

const tree = unified().use(remarkParse).parse(doc);
sortLists(tree);
const sorted = unified().use(remarkStringify).stringify(tree);
```

Markdown input:

```
# Animals

- Zoo Animals
  - Herbivores
    - Zebra
    - Gazelle
  - Omnivores
    - Gorilla
    - Baboon
    - Chimpanzee
  - Carnivores
    - Tiger
    - Lion
- Domestic Animals
  - Felines
    - Tabby
    - Bengal
    - Siamese
  - Canines
    - German Shepherd
    - Cocker Spaniel
```

Markdown output:

```
# Animals

- Domestic Animals
  - Canines
    - Cocker Spaniel
    - German Shepherd
  - Felines
    - Bengal
    - Siamese
    - Tabby
- Zoo Animals
  - Carnivores
    - Lion
    - Tiger
  - Herbivores
    - Gazelle
    - Zebra
  - Omnivores
    - Baboon
    - Chimpanzee
    - Gorilla
```

## License

[MIT](LICENSE)
