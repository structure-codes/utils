export interface TreeType {
  name: string;
  index: number;
  children: TreeType[]
  attributes?: Record<string, string | number | boolean>,
}

export interface ISettings {
  depth: number;
  hideFiles: boolean;
  hideDotDirs: boolean;
}
