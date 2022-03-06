import { getNumberOfTabs, getTabChar, uuid } from "./utils";
import { EOL_MATCH } from "./constants";
import { TreeType } from "./types";

// INDEX_NAME is randomly generated as a unique string so that it does not 
// overlap with filenames in the tree JSON output
export const INDEX_NAME = uuid();

/**
 * Converts a tree string output to a json object
 * @param text - String to convert to a tree JSON object
 * @returns JSON object representing the tree
 */
export const treeStringToJson = (text: string): TreeType[] => {
  const elements: TreeType[] = [];
  // Current location in the tree to add new children too
  let current: TreeType[] = elements;
  // Path is a stack that contains nodes at each level of current position in tree
  const path: TreeType[] = [];
  let prevLine = "";

  const tabChar = getTabChar(text);
  if (!tabChar) {
    console.error("Unable to parse tab character");
    return [];
  }

  // replace whatever tabChar is used with \t in memory to make parsing easier
  const treeFormatted = text.replace(new RegExp(tabChar, "g"), "\t");

  // look for line breaks that works on all platforms
  treeFormatted.split(EOL_MATCH).forEach((line, index) => {
    const isTreeFormat = line.match(/^(\t+)?(│|├──|└──|\t)+.+/);
    if (!isTreeFormat) return;
    const prevPrefix = prevLine.split(" ")[0];
    const prevNumTabs = getNumberOfTabs(prevPrefix);
    // thanks to our formatting, a space will always separate prefix and suffix
    const prefix = line.split(" ")[0];
    const numTabs = getNumberOfTabs(prefix);
    const filename: string = line.substring(prefix.length).trim();
    // Pop a certain number of elements from path
    const popCount = numTabs <= prevNumTabs ? prevNumTabs - numTabs + 1 : 0;
    Array(popCount)
      .fill("pop")
      .forEach(() => path.pop());
    
    const node: TreeType = {
      _index: index,
      name: filename,
      children: [],
    };

    // If we are at root, add root node - else add it to previous parent's children
    current = path.length > 0 ? path[path.length - 1].children : elements;
    current.push(node);
    // Add the new node to the path stack
    path.push(node);

    prevLine = line;
  });

  return elements;
};
