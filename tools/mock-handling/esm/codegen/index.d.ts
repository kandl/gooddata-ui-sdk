import { IRecording } from "../recordings/common.js";
/**
 * Given various types of recordings, this function will generate and write `dataSample.ts and index.ts` file in the root of
 * the recordings directory.
 *
 * The index will use require() to reference the JSON files. It is assumed that all paths on input to this function
 * are absolute, the code will relativize paths as needed.
 *
 * @param recordings - recordings to include in the index
 * @param targetDir - absolute path to directory where the index should be created
 */
export declare function generateAllFiles(recordings: IRecording[], targetDir: string): void;
//# sourceMappingURL=index.d.ts.map