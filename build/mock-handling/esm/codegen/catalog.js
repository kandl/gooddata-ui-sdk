// (C) 2020 GoodData Corporation
import * as path from "path";
import { VariableDeclarationKind } from "ts-morph";
import compact from "lodash/compact.js";
// const CatalogIndexConstName = "Catalog";
function catalogRecordingInit(rec, targetDir) {
    const entries = Object.entries(rec.getEntryForRecordingIndex());
    const entryRows = entries
        .map(([type, file]) => `${type}: require('./${path.relative(targetDir, file)}')`)
        .join(",");
    return `{ ${entryRows} }`;
}
function generateRecordingConst(rec, targetDir) {
    return {
        declarationKind: VariableDeclarationKind.Const,
        isExported: false,
        declarations: [
            {
                name: rec.getRecordingName(),
                initializer: catalogRecordingInit(rec, targetDir),
            },
        ],
    };
}
/**
 * Generate constants for catalog recording. This function will return non-exported constant per recording.
 *
 * @param recording - recording to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export function generateConstantsForCatalog(recording, targetDir) {
    return compact([recording && generateRecordingConst(recording, targetDir)]);
}
