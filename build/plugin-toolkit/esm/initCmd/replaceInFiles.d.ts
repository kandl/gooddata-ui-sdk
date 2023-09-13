import fse from "fs-extra";
type ReadFileFn = typeof fse.readFile;
type WriteFileFn = typeof fse.writeFile;
export type RegexReplacement = {
    regex: RegExp;
    value: string;
    apply?: boolean;
};
export interface FileReplacementSpec extends Record<string, RegexReplacement[] | FileReplacementSpec> {
}
export declare function replaceInFiles(initialPath: string, spec: FileReplacementSpec, readFile?: ReadFileFn, writeFile?: WriteFileFn): Promise<void>;
export {};
//# sourceMappingURL=replaceInFiles.d.ts.map