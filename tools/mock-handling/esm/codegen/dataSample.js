// (C) 2020-2022 GoodData Corporation
import { VariableDeclarationKind } from "ts-morph";
import * as path from "path";
import { createUniqueVariableName } from "../base/variableNaming.js";
import groupBy from "lodash/groupBy.js";
const DataSampleConstName = "DataSamples";
function generateRecordingForDataSample(entries) {
    const entryRows = entries
        .map(([_, entryRecording]) => {
        return entryRecording.getAttributeElements().map((element, index) => {
            var _a;
            return `${createUniqueVariableName((_a = element.title) !== null && _a !== void 0 ? _a : "NULL")} : ${entryRecording.getRecordingName()}[${index}]`;
        });
    })
        .join(",");
    return `{ ${entryRows} }`;
}
function comparatorDataSample(a, b) {
    if (a[0] < b[0]) {
        return -1;
    }
    else if (a[0] > b[0]) {
        return 1;
    }
    return 0;
}
function generateDataSampleConst(recordings) {
    const recsWithDataSample = recordings.map((rec) => [
        createUniqueVariableName(rec.getDisplayFormTitle()),
        rec,
    ]);
    const entriesDataSample = Object.entries(groupBy(recsWithDataSample, ([title]) => title)).sort(comparatorDataSample);
    const dataSampleRows = entriesDataSample
        .map(([title, rec]) => `${title}: ${generateRecordingForDataSample(rec)}`)
        .join(",");
    return {
        declarationKind: VariableDeclarationKind.Const,
        isExported: true,
        declarations: [
            {
                name: DataSampleConstName,
                initializer: `{ ${dataSampleRows} }`,
            },
        ],
    };
}
/**
 * Generate constants for the display form recordings and data sample. This function will return non-exported constant per recording
 * and then also an exported 'DataSamples' constant that is a map from data sample ⇒ display form ⇒ recording.
 *
 * @param recordings - recordings to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export function generateConstantsForDataSamples(recordings, targetDir) {
    const recConsts = recordings.map((rec) => {
        return {
            declarationKind: VariableDeclarationKind.Const,
            isExported: false,
            declarations: [
                {
                    name: rec.getRecordingName(),
                    initializer: `require('./${path.relative(targetDir, rec.elementFile)}')`,
                },
            ],
        };
    });
    return [...recConsts, generateDataSampleConst(recordings)];
}
