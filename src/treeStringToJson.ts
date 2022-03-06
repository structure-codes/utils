import { getNumberOfTabs, getTabChar, uuid } from "./utils";
import { EOL_MATCH } from "./constants";
import { TreeType } from "./types";

// INDEX_NAME is randomly generated as a unique string so that it does not 
// overlap with filenames in the tree JSON output
export const INDEX_NAME = uuid();

/**
 * Converts a tree string output to a json object
 * @param text
 * @param includeIndex whether or not the results need to include index
 * @returns JSON object representing the tree
 */
export const treeStringToJson = (text: string): TreeType[] => {
  const elements: TreeType[] = [];
  let prevLine = "";
  const path: string[] = [];

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
    if (!isTreeFormat) return {};
    const prevPrefix = prevLine.split(" ")[0];
    const prevNumTabs = getNumberOfTabs(prevPrefix);
    const prefix = line.split(" ")[0];
    const numTabs = getNumberOfTabs(prefix);
    const filename: string = line.substr(prefix.length).trim();
    // Pop a certain number of elements from path
    const popCount = numTabs <= prevNumTabs ? prevNumTabs - numTabs + 1 : 0;
    Array(popCount)
      .fill("pop")
      .forEach(() => path.pop());

    // probably could be made more performant
    let current = elements;
    path.forEach((node) => {
      const next = current?.find(c => c.name === node)?.children;
      if (next) current = next;
    });
    
    current.push({
      name: filename,
      children: [],
      index,
    });

    prevLine = line;
    path.push(filename);
  });

  return elements;
};
