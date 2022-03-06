import { getBranchPrefix } from "./utils";
import { ISettings, TreeType } from "./types";

/**
 * Converts JSON representation of a tree back to string format
 * @param tree
 * @returns string format of tree
 */
export const treeJsonToString = (tree: TreeType[], tabChar = "  ", options?: ISettings): string => {
  let treeString = "";
  const parseBranches = (tree: TreeType[], depth: boolean[]) => {
    tree.forEach((branch, index) => {
      const isLastBranch = index === tree.length - 1;
      const prefix = getBranchPrefix(depth, isLastBranch, tabChar);
      const branchString = prefix + branch.name + "\n";
      treeString = treeString.concat(branchString);
      if (!branch.children) return;
      parseBranches(branch.children, [...depth, isLastBranch]);
    });
  };
  parseBranches(tree, []);
  treeString = treeString.replace(/\n$/, "");
  
  return treeString;
};