import { getBranchPrefix } from "./utils";
import { ISettings, TreeType } from "./types";

/**
 * Converts JSON representation of a tree back to string format
 * @param tree
 * @returns string format of tree
 */
export const treeJsonToString = (tree: TreeType, tabChar = "  ", options?: ISettings): string => {
  let treeString = "";
  const parseBranches = (tree: TreeType, depth: boolean[]) => {
    const branches = Object.entries(tree);
    branches.forEach(([key, values], index) => {
      const isLastBranch = index === branches.length - 1;
      const prefix = getBranchPrefix(depth, isLastBranch, tabChar);
      const branchString = prefix + key + "\n";
      treeString = treeString.concat(branchString);
      parseBranches(values, [...depth, isLastBranch]);
    });
  };
  parseBranches(tree, []);
  treeString = treeString.replace(/\n$/, "");

  return treeString;
};