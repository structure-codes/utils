import { getBranchPrefix } from "./utils";
import { defaultSettings, ISettings, TreeType } from "./types";
// @ts-ignore
import isNondot from "@structure-codes/is-nondot";

/**
 * Converts JSON representation of a tree back to string format
 * @param {TreeType[]} tree - The tree to convert to a string
 * @param {string} tabChar - The character(s) used to represent a tab in the string output (optional)
 * @param {ISettings} options - Parameters which can influence how the output string is generated (optional)
 * @returns string format of tree
 */
export const treeJsonToString = ({
  tree,
  tabChar = "  ",
  options = defaultSettings,
}: {
  tree: TreeType[];
  tabChar?: string;
  options?: ISettings;
}): string => {
  let treeString = "";
  const parseBranches = (tree: TreeType[], depth: boolean[]) => {
    tree.forEach((branch, index) => {
      // Hide all dot files and directories in output
      if (
        options.hideDots &&
        (branch.name.startsWith(".") || isNondot(branch.name))
      )
        return;
      // Hide all files in output
      // Note: All leaves with 0 children may not be directories, so we do our best to infer here
      if (
        options.hideFiles &&
        branch.children.length === 0 &&
        (branch.name.includes(".") || isNondot(branch.name))
      )
        return;
      // Hide leaves below a certain depth
      if (options.depth > 0 && depth.length + 1 > options.depth) return;

      const isLastBranch = index === tree.length - 1;
      const prefix = getBranchPrefix(depth, isLastBranch, tabChar);
      const branchString = prefix + branch.name + "\n";
      treeString = treeString.concat(branchString);
      const newDepth = [...depth, isLastBranch];
      parseBranches(branch.children, newDepth);
    });
  };
  parseBranches(tree, []);
  treeString = treeString.replace(/\n$/, "");

  return treeString;
};
