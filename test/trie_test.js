const expect = require("chai").expect;
const Trie = require("../lib/trie.js");
const TrieNode = require("../lib/trie_node.js");

describe("Trie", () => {

  describe("Constructor", () => {
    it("should initialize with a TrieNode as a root propery", () => {
      const trie = new Trie();

      expect(trie.root).to.be.an.instanceOf(TrieNode);
    });
  });

  describe("insert", () => {
    const trie = new Trie();
    trie.insert('cat');

    let root = new TrieNode();
    root.set('c', new TrieNode());
    root.get('c').set('a', new TrieNode());
    root.get('c').get('a').set('t', new TrieNode());

    it ("should recursively insert a word", () => {
      expect(trie.root).to.deep.equal(root);
    });

    it ("should set the final letter of a word as terminal", () => {
      let insertCheck = trie.root.get('c').get('a').get('t').isTerminal;
      expect(insertCheck).to.equal(true);
    });
    
  });

  describe("insertAll", () => {
    it ("should add all given words to the trie", () => {
      const trie = new Trie();
      trie.insertAll(['cat', 'can']);

      let checkCat = trie.root.get('c').get('a').get('t').isTerminal;
      let checkCan = trie.root.get('c').get('a').get('n').isTerminal;

      expect(checkCat).to.equal(true);
      expect(checkCan).to.equal(true);
    });
  });

  describe("has", () => {
    const trie = new Trie();
    trie.insert('cat');

    it ("should return true when a word is in the trie", () => {
      expect(trie.has('cat')).to.equal(true);
    });

    it ("should return false when a word is not in the trie", () => {
      expect(trie.has('can')).to.equal(false);
    });
  });

  describe("dump", () => {
    const trie = new Trie();
    trie.insertAll(['cat', 'can', 'bat']);

    it ("should return an array containing all words", () => {
      const words = trie.dump();
      expect(words).to.deep.equal(['cat', 'can', 'bat']);
    });
  })

  describe("query", () => {
    const trie = new Trie();
    trie.insertAll(['cat', 'can', 'cite', 'bat']);

    it ("should return all words that include the given prefix", () => {
      const queryResult = trie.query("ca");
      expect(queryResult).to.deep.equal(['cat', 'can']);
    })
  })

  describe('eject', () => {
    const trie = new Trie();
    trie.insertAll(['cat', 'can', 'cite', 'cites']);
    trie.eject('cite');
    trie.eject('can');

    it ("should ensure the given word's end node.isTerminal is false", () => {
      expect(trie.has('cite')).to.equal(false);
    });

    it ("should remove unused nodes if possible", () => {
      let exists = trie.root.get('c').get('a').get('n');
      expect(exists).to.equal(undefined);
    });
  });

  describe('cutAfter', () => {
    const trie = new Trie();
    trie.insertAll(['cats', 'take', 'takes', 'taken']);

    it ("should clear the node after the last letter", () => {
      trie.cutAfter('take');
      expect(trie.dump()).to.deep.equal(['cats', 'take']);
    });
  });

  describe('sterilize', () => {
    const trie = new Trie();
    trie.insertAll(['take', 'takes', 'taken', 'tan', 'timber']);

    it ("should clear all nodes of the word except of the word itself", () => {
      trie.sterilize('take');
      expect(trie.dump()).to.deep.equal(['take']);
    });
  })

});