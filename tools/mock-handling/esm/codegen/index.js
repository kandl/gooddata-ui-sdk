// (C) 2007-2021 GoodData Corporation
import * as fs from "fs";
import * as path from "path";
import pkg from "prettier";
const { format } = pkg;
import { Project, VariableDeclarationKind, } from "ts-morph";
import { RecordingType } from "../recordings/common.js";
import { generateConstantsForDisplayForms } from "./displayForm.js";
import { generateConstantsForDataSamples } from "./dataSample.js";
import { generateConstantsForExecutions } from "./execution.js";
import { generateConstantsForInsights } from "./insight.js";
import { generateConstantsForCatalog } from "./catalog.js";
import { generateConstantsForVisClasses } from "./visClasses.js";
import groupBy from "lodash/groupBy.js";
import { generateConstantsForDashboards } from "./dashboard.js";
const FILE_DIRECTIVES = [
    "/* eslint-disable @typescript-eslint/no-var-requires */",
    "/* eslint-disable header/header */",
];
const FILE_HEADER = `/* THIS FILE WAS AUTO-GENERATED USING MOCK HANDLING TOOL; YOU SHOULD NOT EDIT THIS FILE; GENERATE TIME: ${new Date().toISOString()}; */`;
const MainIndexConstName = "Recordings";
function initialize(targetDir, fileName) {
    const outputFile = path.join(targetDir, fileName);
    const project = new Project({});
    const sourceFile = project.createSourceFile(outputFile, {
        leadingTrivia: [...FILE_DIRECTIVES, FILE_HEADER],
    }, { overwrite: true });
    return {
        project,
        sourceFile,
    };
}
function recNameList(recs) {
    return recs.map((r) => r.getRecordingName()).join(",");
}
function generateIndexConst(input) {
    const executionsInit = `executions: {${input
        .executions()
        .map((e) => e.getRecordingName())
        .filter((value, index, array) => array.indexOf(value) === index)
        .join(",")}}`;
    const metadataInit = `
        metadata: {
            ${input.catalog() !== null ? "catalog," : ""}
            ${input.visClasses() !== null ? "visClasses," : ""}
            displayForms: { ${recNameList(input.displayForms())} },
            insights: { ${recNameList(input.insights())} },
            dashboards: { ${recNameList(input.dashboards())} }
        }
    `;
    return {
        declarationKind: VariableDeclarationKind.Const,
        isExported: true,
        declarations: [
            {
                name: MainIndexConstName,
                initializer: `{ ${executionsInit}, ${metadataInit} }`,
            },
        ],
    };
}
function transformToTypescript(input, targetDir, fileName) {
    const output = initialize(targetDir, fileName);
    const sourceFile = output.sourceFile;
    if (fileName === "dataSample.ts") {
        sourceFile.addVariableStatements(generateConstantsForDataSamples(input.displayForms(), targetDir));
    }
    else {
        sourceFile.addVariableStatements(generateConstantsForExecutions(input.executions(), targetDir));
        sourceFile.addVariableStatements(generateConstantsForDisplayForms(input.displayForms(), targetDir));
        sourceFile.addVariableStatements(generateConstantsForInsights(input.insights(), targetDir));
        sourceFile.addVariableStatements(generateConstantsForCatalog(input.catalog(), targetDir));
        sourceFile.addVariableStatements(generateConstantsForVisClasses(input.visClasses(), targetDir));
        sourceFile.addVariableStatements(generateConstantsForDashboards(input.dashboards(), targetDir));
        sourceFile.addVariableStatement(generateIndexConst(input));
    }
    return output;
}
function createGeneratorInput(recordings) {
    const categorized = groupBy(recordings, (rec) => rec.getRecordingType());
    return {
        executions: () => {
            return categorized[RecordingType.Execution] || [];
        },
        displayForms: () => {
            return categorized[RecordingType.DisplayForms] || [];
        },
        insights: () => {
            return categorized[RecordingType.Insights] || [];
        },
        catalog: () => (categorized[RecordingType.Catalog] &&
            categorized[RecordingType.Catalog][0]) ||
            null,
        visClasses: () => (categorized[RecordingType.VisClasses] &&
            categorized[RecordingType.VisClasses][0]) ||
            null,
        dashboards: () => {
            return categorized[RecordingType.Dashboards] || [];
        },
    };
}
function generateRecordingIndex(recordings, targetDir) {
    const input = createGeneratorInput(recordings);
    const output = transformToTypescript(input, targetDir, "index.ts");
    const sourceFile = output.sourceFile;
    const generatedTypescript = sourceFile.getFullText();
    const formattedTypescript = format(generatedTypescript, { parser: "typescript", printWidth: 120 });
    fs.writeFileSync(sourceFile.getFilePath(), formattedTypescript, { encoding: "utf-8" });
}
function generateDataSample(recordings, targetDir) {
    const input = createGeneratorInput(recordings);
    const output = transformToTypescript(input, targetDir, "dataSample.ts");
    const sourceFile = output.sourceFile;
    const generatedTypescriptForDataSample = sourceFile.getFullText();
    const formattedTypescriptForDataSample = format(generatedTypescriptForDataSample, {
        parser: "typescript",
        printWidth: 120,
    });
    fs.writeFileSync(sourceFile.getFilePath(), formattedTypescriptForDataSample, { encoding: "utf-8" });
}
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
export function generateAllFiles(recordings, targetDir) {
    generateRecordingIndex(recordings, targetDir);
    generateDataSample(recordings, targetDir);
}
