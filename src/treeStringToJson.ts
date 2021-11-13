import { getNumberOfTabs, getTabChar, uuid } from "./utils";
import { EOL_MATCH } from "./constants";
import { TreeType } from "./types";

// INDEX_NAME is randomly generated as a unique string so that it does not 
// overlap with filenames in the tree JSON output
const INDEX_NAME = uuid();

/**
 * Converts a tree string output to a json object
 * @param {String} text
 * @returns JSON object representing the tree
 */
export const treeStringToJson = (text: string) => {
  const elements = new Set();
  let prevLine = "";
  const path: string[] = [];

  const tabChar = getTabChar(text);
  if (!tabChar) {
    console.error("Unable to parse tab character");
    return {};
  }

  // replace whatever tabChar is used with \t in memory to make parsing easier
  const treeFormatted = text.replace(new RegExp(tabChar, "g"), "\t");

  // look for line breaks that works on all platforms
  treeFormatted.split(EOL_MATCH).forEach((line, index) => {
    const isTreeFormat = line.match(/^(\t+)?(│|├──|└──|\t)+ .+/);
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

    /* 
      EXAMPLE OF REDUCER FUNCTION
        For each element in path, return elements[pathItem]
        The result is the branch in elements for the current path
        path = [ "src/", "Home/"]
        elements = { 
          "src/": { 
            "Home/": {} 
          }
        }
        iter1 = elements["src/"]
        iter2 = elements["src/"]["Home/"]
        curr = {}
    */
    const current: TreeType = path.reduce(
      (branch: TreeType, filename: string) => branch[filename],
      elements
    );
    current[filename] = { [INDEX_NAME]: index };
    prevLine = line;
    path.push(filename);
  });
  return elements;
};
