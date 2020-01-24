

class TrieNode extends Map {
  constructor(args) {
    super(args);
    this.isTerminal = false;
  }

  isEmpty() {
    return this.size === 0;
  }
}

let node = new TrieNode([['a', 'cat']]);
console.log(node);

module.exports = TrieNode;