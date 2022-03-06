import { treeStringToJson } from "../treeStringToJson";
import * as fs from "fs";
import * as path from "path";
import { TreeType } from "../types";
import { treeJsonToString } from "../treeJsonToString";

const dirPath = path.join(__dirname, "trees");
const trees = fs.readdirSync(dirPath);
trees.forEach((file) => {
  const treeString = fs.readFileSync(path.join(dirPath, file)).toString();
  let tree: TreeType[];
  test(`can convert file to TreeType format: ${file}`, () => {
    tree = treeStringToJson(treeString);

    // Number of parents
    expect(tree.length).toBe(3);
    // Last node is dir name "static"
    expect(tree[2].name).toBe("static");
  });

  test("can convert TreeType format back to original string", () => {
    const newTreeString = treeJsonToString(tree);
    expect(treeString === newTreeString);
  });
});
