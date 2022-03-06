import { treeStringToJson } from "../treeStringToJson";
import * as fs from "fs";
import * as path from "path";
import { defaultSettings, ISettings, TreeType } from "../types";
import { treeJsonToString } from "../treeJsonToString";

const dirPath = path.join(__dirname, "trees");
const tabTrees = fs.readdirSync(dirPath + "/tab-tests");
const settingsTree = fs.readFileSync(dirPath + "/settings-tests/base.tree").toString();
const noDotsTree = fs.readFileSync(dirPath + "/settings-tests/no-dots.tree").toString();
const noFilesTree = fs.readFileSync(dirPath + "/settings-tests/no-files.tree").toString();
const depth2Tree = fs.readFileSync(dirPath + "/settings-tests/depth-2.tree").toString();

tabTrees.forEach((file) => {
  const treeString = fs.readFileSync(path.join(dirPath + "/tab-tests", file)).toString();
  let tree: TreeType[];
  test(`treeStringToJson can convert file to TreeType format: ${file}`, () => {
    tree = treeStringToJson(treeString);

    // Number of parents
    expect(tree.length).toBe(3);
    // Last node is dir name "static"
    expect(tree[2].name).toBe("static");
  });

  test("treeJsonToString can convert TreeType format back to original string", () => {
    const newTreeString = treeJsonToString({ tree });
    expect(treeString === newTreeString);
  });

});


test("treeJsonToString base options works", () => {
  const baseTree = treeStringToJson(settingsTree);
  const newTreeString = treeJsonToString({ tree: baseTree, options: defaultSettings });
  expect(settingsTree === newTreeString);
});

test("treeJsonToString depth option works", () => {
  const options: ISettings = {
    ...defaultSettings,
    depth: 2,
  };
  const baseTree = treeStringToJson(settingsTree);
  const newTreeString = treeJsonToString({ tree: baseTree, options });
  expect(settingsTree !== newTreeString);
  expect(depth2Tree === newTreeString);
});

test("treeJsonToString hideDots option works", () => {
  const options: ISettings = {
    ...defaultSettings,
    hideDots: true,
  };
  const baseTree = treeStringToJson(settingsTree);
  const newTreeString = treeJsonToString({ tree: baseTree, options });
  expect(settingsTree !== newTreeString);
  expect(noDotsTree === newTreeString);
});

test("treeJsonToString hideFiles option works", () => {
  const options: ISettings = {
    ...defaultSettings,
    hideFiles: true,
  };
  const baseTree = treeStringToJson(settingsTree);
  const newTreeString = treeJsonToString({ tree: baseTree, options });
  expect(settingsTree !== newTreeString);
  expect(noFilesTree === newTreeString);
});
