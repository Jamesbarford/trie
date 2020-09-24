# Trie

An implementation of a [Trie](https://en.wikipedia.org/wiki/Trie) 

The Trie can either be created string by string or from an array of strings.

## Example

```typescript
import { Trie } from "trie";

const trie = new Trie();
const strings = ["he", "hello", "helios", "woof", "dog", "doom"];

trie.addMany(strings);

const allWords = trie.getAllWords(); // => ["he", "hello", "helios", "woof", "dog", "doom"]
const helPrefixedWords = trie.findWords("he"); // => ["hello", "helios"];
```

## Usage

public methods:

```typescript

class Trie {
  public add(word: string): void; // adds the word to the Trie

  public addMany(words: string[]): void; // invokes add for each string

  public remove(word: string): boolean; // removes the word from the Trie, does not delete the node

  public findWords(prefix: string): string[]; // Matches all words by the given prefix

  public size(): number; // returns how many full words are in the Trie

  public getAllWords(): string[]; // returns an array of all the words in the Trie

  public contains(word: string): boolean; // returns true if the given string exists within the tree, may not be a full word

  public findNode(prefix: string): TrieNode | undefined; // returns first match
}
```

The items in the `Trie` are stored as `TrieNodes` these should not need to be directly referenced

```ts
class TrieNode {
  public isLeaf: boolean; // defaults to false
  public readonly children: Map<string, TrieNode>; // defaults to an empty map

  public constructor(public readonly key: string) {}
}
```
