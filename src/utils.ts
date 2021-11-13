import { EOL_MATCH, TRUNK, BRANCH, LAST_BRANCH } from "./constants";

/**
 * Scans a line of text for tab chars
 * @param line
 * @returns Number of tabs in the line
 */
export const getNumberOfTabs = (line: string): number => {
  return (line.match(/\t/g) || []).length;
};

/**
 * Get's the tab char based on the first child tree item
 * @param text Tree string to search for tab character in
 * @returns A character that represents the tab char
 */
export const getTabChar = (text: string): string | null => {
  // Search for the first child in the tree and extract the tab character from there
  const treeLines = text.split(EOL_MATCH);
  const childRegex = /│?(.+)(├──|└──)/;
  const firstChild = treeLines.find((line) => line.match(childRegex));
  const match = firstChild?.match(childRegex);
  return match?.[1] || null;
};

export const getBranchPrefix = (depth: boolean[], isLastBranch: boolean) => {
  let base = "";
  const tab = "  ";
  depth.forEach(
    (isLastBranch) =>
      (base = base.concat(isLastBranch ? tab : `${TRUNK}${tab}`))
  );
  if (isLastBranch) return base + LAST_BRANCH + " ";
  else return base + BRANCH + " ";
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
