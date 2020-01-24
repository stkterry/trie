const TrieNode = require("./trie_node");

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, node = this.root) {
    let char = word[0];

    if (!node.has(char)) node.set(char, new TrieNode());

    word.length === 1 ?
      node.get(char).isTerminal = true :
      this.insert(word.slice(1), node.get(char));
  }

  insertAll(words) {
    for (let word of words) this.insert(word);
  }

  has(word, node = this.root) {
    if (word.length === 0) return node.isTerminal;
    
    let char = word[0];

    return node.has(char) ?
      this.has(word.slice(1), node.get(char)) :
      false;
  }

  dump(node = this.root) {
    let allWords = [];
    let suffixes, words;
    if (node.isTerminal) allWords.push('');

    for (let [char, child] of node) {
      suffixes = this.dump(child);
      words = suffixes.map(suffix => char + suffix);
      allWords.push(...words);
    }

    return allWords;
  }

  query(prefix, node=this.root) {
    if (prefix.length === 0) return this.dump(node);

    let char = prefix[0];

    if (node.has(char)) {
      let suffixes = this.query(prefix.slice(1), node.get(char));
      return suffixes.map(suffix => char + suffix);
    }
    else return [];
  }

  eject(word, node=this.root) {
    if (word.length === 0) {
      node.isTerminal = false;
      return node.isEmpty();
    }

    let char = word[0];
    if (node.has(char)) {
      let isEmpty = this.eject(word.slice(1), node.get(char));
      if (isEmpty) node.delete(char);
    } else return false;

    return node.isEmpty();
  }

  cutAfter(prefix, node = this.root) {
    if (prefix.length === 0) return node.clear();

    let char = prefix[0];
    if (node.has(char)) this.cutAfter(prefix.slice(1), node.get(char));
  }

  sterilize(word, node=this.root) {
    if (word.length === 0) return node.clear();

    let char = word[0];
    if (node.has(char)) {
      let copyNode = node.get(char);
      node.clear();
      node.set(char, copyNode);
    } else return;

    this.sterilize(word.slice(1), node.get(char));
  }
  
}

module.exports = Trie;