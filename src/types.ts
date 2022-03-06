export interface TreeType {
  _index: number;
  name: string;
  children: TreeType[]
  attributes?: Record<string, string | number | boolean>,
}

/**
 * 
 */
export interface ISettings {
  /**
   * depth - How deep in the tree to print
   */
  depth: number;
  /**
   * hideFiles - Whether or not to hide all files in output
   */
  hideFiles: boolean;
  /**
   * hideDots - Whether or not to hide dot directories and files in the output
   */
  hideDots: boolean;
}

export const defaultSettings: ISettings = {
  depth: 0,
  hideFiles: false,
  hideDots: false,
};
