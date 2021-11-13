import { getBranchPrefix } from "./utils";

export const treeJsonToString = (tree: any) => {
  let treeString = "";
  const parseBranches = (tree: any, depth: boolean[]) => {
    const branches = Object.entries(tree);
    branches.forEach(([key, values], index) => {
      const isLastBranch = index === branches.length - 1;
      const prefix = getBranchPrefix(depth, isLastBranch);
      const branchString = prefix + key + "\n";
      treeString = treeString.concat(branchString);
      parseBranches(values, [...depth, isLastBranch]);
    });
  };
  parseBranches(tree, []);
  treeString = treeString.replace(/\n$/, "");

  return treeString;
};