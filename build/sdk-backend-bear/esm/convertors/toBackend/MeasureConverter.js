import { isSimpleMeasure, measureAlias, measureFormat, measureLocalId, measureTitle, measureAggregation, measureDoesComputeRatio, measureIdentifier, measureUri, isArithmeticMeasure, measureArithmeticOperands, measureArithmeticOperator, isPoPMeasure, measureMasterIdentifier, measurePopAttribute, isPreviousPeriodMeasure, measurePreviousPeriodDateDataSets, measureFilters, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import { toBearRef } from "./ObjRefConverter.js";
import { convertFilter } from "./FilterConverter.js";
import { convertAggregation } from "./afm/MeasureConverter.js";
const convertPreviousPeriodDataSet = (dataSet) => {
    return {
        dataSet: toBearRef(dataSet.dataSet),
        periodsAgo: dataSet.periodsAgo,
    };
};
const convertPreviousPeriodMeasureDefinition = (measure) => {
    return {
        previousPeriodMeasure: {
            measureIdentifier: measureMasterIdentifier(measure),
            dateDataSets: measurePreviousPeriodDateDataSets(measure).map(convertPreviousPeriodDataSet),
        },
    };
};
const convertPoPMeasureDefinition = (measure) => {
    return {
        popMeasureDefinition: {
            measureIdentifier: measureMasterIdentifier(measure),
            popAttribute: toBearRef(measurePopAttribute(measure)),
        },
    };
};
const convertArithmeticMeasureDefinition = (measure) => {
    return {
        arithmeticMeasure: {
            measureIdentifiers: measureArithmeticOperands(measure),
            operator: measureArithmeticOperator(measure),
        },
    };
};
const convertSimpleMeasureDefinition = (measure) => {
    const identifier = measureIdentifier(measure);
    const uri = measureUri(measure);
    if (!identifier && !uri) {
        throw new Error("Measure has neither uri nor identifier.");
    }
    const aggregation = convertAggregation(measureAggregation(measure));
    const computeRatio = measureDoesComputeRatio(measure);
    const filters = (measureFilters(measure) || []).map(convertFilter);
    return {
        measureDefinition: Object.assign(Object.assign(Object.assign({ item: identifier ? { identifier } : { uri: uri } }, (aggregation && { aggregation })), (computeRatio && { computeRatio })), (!isEmpty(filters) && { filters })),
    };
};
const convertMeasureDefinition = (measure) => {
    if (isSimpleMeasure(measure)) {
        return convertSimpleMeasureDefinition(measure);
    }
    else if (isArithmeticMeasure(measure)) {
        return convertArithmeticMeasureDefinition(measure);
    }
    else if (isPoPMeasure(measure)) {
        return convertPoPMeasureDefinition(measure);
    }
    else if (isPreviousPeriodMeasure(measure)) {
        return convertPreviousPeriodMeasureDefinition(measure);
    }
    throw new Error("Unknown measure type");
};
export const convertMeasure = (measure) => {
    const alias = measureAlias(measure);
    const format = measureFormat(measure);
    const title = measureTitle(measure);
    return {
        measure: Object.assign(Object.assign(Object.assign({ definition: convertMeasureDefinition(measure), localIdentifier: measureLocalId(measure) }, (alias && { alias })), (format && { format })), (title && { title })),
    };
};
//# sourceMappingURL=MeasureConverter.js.map