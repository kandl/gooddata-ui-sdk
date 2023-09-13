// (C) 2007-2022 GoodData Corporation
import * as path from "path";
import { VariableDeclarationKind } from "ts-morph";
import { createUniqueVariableName } from "../base/variableNaming.js";
import flatMap from "lodash/flatMap.js";
import groupBy from "lodash/groupBy.js";
const ScenariosConstName = "Scenarios";
function executionRecordingInit(rec, targetDir) {
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
                initializer: executionRecordingInit(rec, targetDir),
            },
        ],
    };
}
function generateScenarioForVis(entries) {
    const entryRows = entries
        .map(([_, entryName, entryRecording, scenarioIndex]) => {
        const name = createUniqueVariableName(entryName, {});
        return {
            value: `${name}: { scenarioIndex: ${scenarioIndex}, execution: ${entryRecording.getRecordingName()}}`,
            name,
        };
    })
        .reduce((acc, record) => {
        const exists = acc.findIndex((v) => v.name === record.name);
        if (exists >= 0) {
            acc[exists] = record;
        }
        else {
            acc.push(record);
        }
        return acc;
    }, [])
        .map((a) => a.value)
        .join(",");
    return `{ ${entryRows} }`;
}
function generateScenariosConst(recordings) {
    const recsWithVisAndScenario = flatMap(recordings, (rec) => rec.scenarios.map((s, idx) => [s.vis, s.scenario, rec, idx]));
    const entriesByVis = Object.entries(groupBy(recsWithVisAndScenario, ([visName]) => visName));
    const entryRows = entriesByVis
        .map(([vis, visScenarios]) => `${vis}: ${generateScenarioForVis(visScenarios)}`)
        .join(",");
    return {
        declarationKind: VariableDeclarationKind.Const,
        isExported: true,
        declarations: [
            {
                name: ScenariosConstName,
                initializer: `{ ${entryRows} }`,
            },
        ],
    };
}
/**
 * Generate constants for the execution recordings. This function will return non-exported constant per recording
 * and then also an exported 'Scenarios' constant that is a map from vis ⇒ scenario ⇒ recording.
 * When encounters duplicate entries, favors the newer ones and replace the older one.
 *
 * @param recordings - recordings to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export function generateConstantsForExecutions(recordings, targetDir) {
    const unique = recordings.reduce((acc, rec) => {
        const existsIndex = acc.findIndex((r) => r.getRecordingName() === rec.getRecordingName());
        if (existsIndex >= 0) {
            acc[existsIndex] = rec;
        }
        else {
            acc.push(rec);
        }
        return acc;
    }, []);
    return [...unique.map((r) => generateRecordingConst(r, targetDir)), generateScenariosConst(unique)];
}
