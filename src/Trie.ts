export class Trie {
    private root: TrieNode = new TrieNode("");

    public addMany(words: string[]): void {
        for (let i = 0; i < words.length; ++i) {
            this.add(words[i]);
        }
    }

    public add(word: string): void {
        let currentNode: TrieNode | undefined = this.root;

        forEachChar(word, char => {
            const node = currentNode?.children.get(char);

            if (!node) {
                const newNode = new TrieNode(char);

                currentNode?.children.set(char, newNode);
                currentNode = newNode;
            } else currentNode = node;
        });

        if (currentNode && !currentNode.isLeaf) currentNode.isLeaf = true;
    }

    public remove(word: string): boolean {
        return this.removeWordFromTrie(word);
    }

    private removeWordFromTrie(
        word: string,
        currentNode: TrieNode = this.root,
        idx: number = 0
    ): boolean {
        if (idx === word.length) {
            if (!currentNode.isLeaf) return false;
            else return (currentNode.isLeaf = false);
        }

        const char: string = word[idx];
        const node: TrieNode | undefined = currentNode.children.get(char);

        if (!node) return false;

        return this.removeWordFromTrie(word, node, idx + 1) && !node?.isLeaf;
    }

    public findWords(prefix: string): string[] {
        const output: string[] = [];
        let currentNode: TrieNode = this.root,
            currentWord = "";

        forEachChar(prefix, char => {
            const node: TrieNode | undefined = currentNode.children.get(char);

            if (node) {
                currentWord += node.key;
                currentNode = node;
            } else {
                return true;
            }
        });

        return this._findWords(currentNode, currentWord.slice(0, currentWord.length - 1), output);
    }

    private _findWords(node: TrieNode, currentWord: string = "", words: string[] = []): string[] {
        currentWord += node.key;

        if (node.isLeaf) words.push(currentWord);

        node.children.forEach(child => {
            this._findWords(child, currentWord, words);
        });

        return words;
    }

    public size(): number {
        return this._findWords(this.root).length;
    }

    public getAllWords(): string[] {
        return this._findWords(this.root);
    }

    public contains(word: string): boolean {
        return !!this.findNode(word);
    }

    public findNode(str: string): TrieNode | undefined {
        let children = this.root.children,
            trieNode: undefined | TrieNode = undefined;

        forEachChar(str, char => {
            trieNode = children.get(char);

            if (trieNode) {
                children = trieNode.children;
            }
        });

        return trieNode;
    }
}

export class TrieNode {
    public isLeaf: boolean = false;
    public readonly children: Map<string, TrieNode> = new Map();

    public constructor(public readonly key: string) {}
}

function forEachChar(str: string | number, cb: (char: string, idx: number) => boolean | void): void {
    let i = 0,
        safeString = String(str),
        len = safeString.length;

    for (; i < len; ++i) if (cb(safeString[i], i)) break;
}
