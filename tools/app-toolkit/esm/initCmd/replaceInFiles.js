// (C) 2021-2023 GoodData Corporation
import fse from "fs-extra";
import path from "path";
import flatMap from "lodash/flatMap.js";
import entries from "lodash/entries.js";
function collectFileReplacements(currentPath, spec) {
    return flatMap(entries(spec), ([key, value]) => {
        const nextPath = path.join(currentPath, key);
        if (Array.isArray(value)) {
            return [{ file: nextPath, replacements: value }];
        }
        return collectFileReplacements(nextPath, value);
    });
}
function createFileProcessor(readFile, writeFile) {
    return async ({ file, replacements }) => {
        let contents;
        try {
            contents = await readFile(file, { encoding: "utf8", flag: "r" });
        }
        catch (e) {
            // ENOENT is fine, allow defining replacements for files that may not exist
            if (e.code === "ENOENT")
                return;
            throw e;
        }
        const replaced = replacements.reduce((acc, { regex, value, apply }) => ((apply !== null && apply !== void 0 ? apply : true) ? acc.replace(regex, value) : acc), contents);
        return writeFile(file, replaced, { encoding: "utf8", flag: "w" });
    };
}
export async function replaceInFiles(initialPath, spec, readFile = fse.readFile, writeFile = fse.writeFile) {
    const fileReplacements = collectFileReplacements(initialPath, spec);
    const processor = createFileProcessor(readFile, writeFile);
    await Promise.all(fileReplacements.map(processor));
}
//# sourceMappingURL=replaceInFiles.js.map