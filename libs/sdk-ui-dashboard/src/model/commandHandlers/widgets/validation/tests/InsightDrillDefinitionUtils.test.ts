// (C) 2021-2023 GoodData Corporation
import { idRef, uriRef, DrillOrigin } from "@gooddata/sdk-model";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";
import cloneDeep from "lodash/cloneDeep.js";
import {
    DrillToDashboardFromProductAttributeDefinition,
    DrillToDashboardFromWonMeasureDefinition,
    DrillToToInsightFromWonMeasureDefinition,
    InaccessibleDashboard,
    SimpleDashboardListed,
    SimpleDashboardSimpleSortedTableWidgetDrillTargets,
    SimpleSortedTableWidgetInsight,
} from "../../../../tests/fixtures/SimpleDashboard.fixtures.js";
import {
    ComplexDashboardListed,
    ComplexDashboardWithReferences,
} from "../../../../tests/fixtures/ComplexDashboard.fixtures.js";
import {
    newDisplayFormMap,
    newInsightMap,
    newMapForObjectWithIdentity,
} from "../../../../../_staging/metadata/objRefMap.js";
import {
    InsightDrillDefinitionValidationData,
    validateDrillDefinitionOrigin,
    validateInsightDrillDefinition,
} from "../insightDrillDefinitionUtils.js";

describe("validateDrillDefinitionOrigin", () => {
    const drillTargets: IAvailableDrillTargets = SimpleDashboardSimpleSortedTableWidgetDrillTargets;
    it("should not throw error for valid measure origin drill definition ", async () => {
        const result = validateDrillDefinitionOrigin(DrillToDashboardFromWonMeasureDefinition, drillTargets);
        expect(result).toEqual(DrillToDashboardFromWonMeasureDefinition);
    });

    it("should not throw error for valid attribute origin drill definition ", async () => {
        const result = validateDrillDefinitionOrigin(
            DrillToDashboardFromProductAttributeDefinition,
            drillTargets,
        );
        expect(result).toEqual(DrillToDashboardFromProductAttributeDefinition);
    });

    it("should throw error for invalid measure unknown origin localIdentifier ", async () => {
        const invalidMeasureOriginDrill = cloneDeep(DrillToDashboardFromProductAttributeDefinition);
        const invalidMeasureOrigin: DrillOrigin = {
            type: "drillFromMeasure",
            measure: {
                localIdentifier: "some origin",
            },
        };
        invalidMeasureOriginDrill.origin = invalidMeasureOrigin;

        expect(() => {
            validateDrillDefinitionOrigin(invalidMeasureOriginDrill, drillTargets);
        }).toThrowErrorMatchingSnapshot();
    });

    it("should throw error for invalid attribute unknown origin localIdentifier ", async () => {
        const invalidAttributeOriginDrill = cloneDeep(DrillToDashboardFromProductAttributeDefinition);
        const invalidAttributeOrigin: DrillOrigin = {
            type: "drillFromAttribute",
            attribute: {
                localIdentifier: "some origin",
            },
        };

        invalidAttributeOriginDrill.origin = invalidAttributeOrigin;

        expect(() => {
            validateDrillDefinitionOrigin(invalidAttributeOriginDrill, drillTargets);
        }).toThrowErrorMatchingSnapshot();
    });

    it("should throw error for invalid attribute ref", async () => {
        const uriRefAttributeOriginDrill = cloneDeep(DrillToDashboardFromProductAttributeDefinition);
        const uriRefAttributeOrigin: DrillOrigin = {
            type: "drillFromAttribute",
            attribute: uriRef("some ref"),
        };

        uriRefAttributeOriginDrill.origin = uriRefAttributeOrigin;

        expect(() => {
            validateDrillDefinitionOrigin(uriRefAttributeOriginDrill, drillTargets);
        }).toThrowErrorMatchingSnapshot();
    });
});

describe("validateInsightDrillDefinition", () => {
    const validationContext: InsightDrillDefinitionValidationData = {
        dashboardsMap: newMapForObjectWithIdentity([SimpleDashboardListed, ComplexDashboardListed]),
        insightsMap: newInsightMap([SimpleSortedTableWidgetInsight]),
        displayFormsMap: newDisplayFormMap([]),
        availableDrillTargets: {},
        inaccessibleDashboardsMap: newMapForObjectWithIdentity([InaccessibleDashboard]),
    };

    describe("validate IDrillToDashboard definition", () => {
        it("should not throw error for valid definition with target identifier", async () => {
            const result = validateInsightDrillDefinition(
                DrillToDashboardFromWonMeasureDefinition,
                validationContext,
            );
            expect(result).toEqual(DrillToDashboardFromWonMeasureDefinition);
        });

        it("should not throw error for valid definition with target uri", async () => {
            const uriTarget = cloneDeep(DrillToDashboardFromWonMeasureDefinition);
            uriTarget.target = uriRef(ComplexDashboardWithReferences.dashboard.uri);

            const result = validateInsightDrillDefinition(uriTarget, validationContext);
            expect(result).toEqual(DrillToDashboardFromWonMeasureDefinition);
        });

        it("should not throw error for valid definition with target undefined", async () => {
            const undefinedTarget = cloneDeep(DrillToDashboardFromWonMeasureDefinition);
            undefinedTarget.target = undefined;

            const result = validateInsightDrillDefinition(undefinedTarget, validationContext);
            expect(result).toEqual(undefinedTarget);
        });

        it("should throw error for unknown UriRef target IDrillToDashboard definition", async () => {
            const invalidTarget = cloneDeep(DrillToDashboardFromWonMeasureDefinition);
            invalidTarget.target = uriRef("some ref");
            expect(() => {
                validateInsightDrillDefinition(invalidTarget, validationContext);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should throw error for unknown idRef target IDrillToDashboard definition", async () => {
            const invalidTarget = cloneDeep(DrillToDashboardFromWonMeasureDefinition);
            invalidTarget.target = idRef("some id");
            expect(() => {
                validateInsightDrillDefinition(invalidTarget, validationContext);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should not throw error for unknown ref target IDrillToDashboard definition which is inaccessible", () => {
            const forbiddenTarget = cloneDeep(DrillToDashboardFromWonMeasureDefinition);
            forbiddenTarget.target = idRef(InaccessibleDashboard.identifier, "analyticalDashboard");
            const result = validateInsightDrillDefinition(forbiddenTarget, validationContext);

            expect(result).toEqual(forbiddenTarget);
        });
    });

    describe("validate IDrillToInsight definition", () => {
        it("should not throw error for valid definition with target uri", async () => {
            const result = validateInsightDrillDefinition(
                DrillToToInsightFromWonMeasureDefinition,
                validationContext,
            );
            expect(result).toEqual(DrillToToInsightFromWonMeasureDefinition);
        });

        it("should not throw error for valid definition with target identifier", async () => {
            const identifierTarget = cloneDeep(DrillToToInsightFromWonMeasureDefinition);
            identifierTarget.target = idRef(SimpleSortedTableWidgetInsight.insight.identifier);

            const result = validateInsightDrillDefinition(identifierTarget, validationContext);
            expect(result).toEqual(DrillToToInsightFromWonMeasureDefinition);
        });

        it("should throw error for unknown UriRef target IDrillToDashboard definition", async () => {
            const invalidUriTarget = cloneDeep(DrillToToInsightFromWonMeasureDefinition);
            invalidUriTarget.target = uriRef("some ref");
            expect(() => {
                validateInsightDrillDefinition(invalidUriTarget, validationContext);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should throw error for unknown idRef target IDrillToDashboard definition", async () => {
            const invalidIdTarget = cloneDeep(DrillToToInsightFromWonMeasureDefinition);
            invalidIdTarget.target = idRef("some id");
            expect(() => {
                validateInsightDrillDefinition(invalidIdTarget, validationContext);
            }).toThrowErrorMatchingSnapshot();
        });
    });
});
