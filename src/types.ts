export type TreeType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};

export interface ISettings {
  depth: number;
  hideFiles: boolean;
  hideDotDirs: boolean;
}
