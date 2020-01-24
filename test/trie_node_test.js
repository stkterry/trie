const expect = require("chai").expect;
const TrieNode = require("../lib/trie_node.js");

describe("TrieNode", () => {

  describe("Constructor", () => {
    const node = new TrieNode();
    it("should be an extension of Map", () => {
      expect(node).to.be.an.instanceOf(Map);
    });

    it("should be an instance of TrieNode", () => {
      expect(node).to.be.an.instanceOf(TrieNode)
    });

    it("should initialize with isTerminal property set to false", () => {
      expect(node.isTerminal).to.be.equal(false)
    });

  })

  describe("isEmpty", () => {
    const node = new TrieNode();
    it("should return true when empty", () => {
      expect(node.isEmpty()).to.be.equal(true);
    });

    it("should return false when not empty", () => {
      node.set('a', 'dat');
      expect(node.isEmpty()).to.be.equal(false);
    });
  })

});

