import { filterObjRef, isUriRef, isNegativeAttributeFilter, filterAttributeElements, isAttributeElementsByRef, isIdentifierRef, areObjRefsEqual, objRefToString, } from "@gooddata/sdk-model";
import { NotSupported } from "@gooddata/sdk-backend-spi";
import { invariant } from "ts-invariant";
import flatMap from "lodash/flatMap.js";
import groupBy from "lodash/groupBy.js";
import uniqWith from "lodash/uniqWith.js";
import { toBearRef } from "../../../../convertors/toBackend/ObjRefConverter.js";
import { convertMeasure } from "../../../../convertors/toBackend/afm/MeasureConverter.js";
import { objRefsToUris } from "../../../../utils/api.js";
export class LimitingAfmFactory {
    constructor(authCall, displayFormRef, workspace) {
        this.authCall = authCall;
        this.displayFormRef = displayFormRef;
        this.workspace = workspace;
        this.getAfm = async (filters, measures, relativeDateFilters) => {
            if (!(filters === null || filters === void 0 ? void 0 : filters.length) && !(measures === null || measures === void 0 ? void 0 : measures.length) && !(relativeDateFilters === null || relativeDateFilters === void 0 ? void 0 : relativeDateFilters.length)) {
                return undefined;
            }
            const filtersPart = (filters === null || filters === void 0 ? void 0 : filters.length)
                ? [
                    {
                        expression: {
                            value: await this.createFiltersExpressionFromAttributeFilters(filters),
                        },
                    },
                ]
                : undefined;
            const measuresPart = (measures === null || measures === void 0 ? void 0 : measures.length) ? measures.map(convertMeasure) : undefined;
            const mergedFiltersPart = filtersPart &&
                relativeDateFilters && [...filtersPart, ...relativeDateFilters];
            return {
                attributes: [
                    {
                        localIdentifier: "a1",
                        displayForm: toBearRef(this.displayFormRef),
                    },
                ],
                filters: mergedFiltersPart || filtersPart || relativeDateFilters,
                measures: measuresPart,
            };
        };
        this.createFiltersExpressionFromAttributeFilters = async (filters) => {
            const filterDisplayForms = filters.map((f) => filterObjRef(f.attributeFilter));
            const allDisplayFormRefs = uniqWith([this.displayFormRef, ...filterDisplayForms], areObjRefsEqual);
            const [identifierUriPairs, displayFormAttributeUriMapping] = await Promise.all([
                this.getIdentifierUriPairs(filters),
                this.getDisplayFormAttributeUriMapping(allDisplayFormRefs),
            ]);
            const getDisplayFormAttributeUri = (ref) => {
                const entry = displayFormAttributeUriMapping.find(([displayFormRef]) => areObjRefsEqual(displayFormRef, ref));
                invariant(entry, `Attribute URI for the display form "${objRefToString(ref)}" was not found`);
                return entry[1];
            };
            const getFilterAttributeUri = (attributeFilter) => getDisplayFormAttributeUri(filterObjRef(attributeFilter));
            const getUriForIdentifier = (objRef) => {
                if (isUriRef(objRef)) {
                    return objRef.uri;
                }
                else {
                    const foundUri = identifierUriPairs.find((pair) => pair.identifier === objRef.identifier);
                    if (foundUri === undefined) {
                        throw new Error(`URI for identifier ${objRef.identifier} have not been found`);
                    }
                    return foundUri.uri;
                }
            };
            const attributeRefUri = getDisplayFormAttributeUri(this.displayFormRef);
            const groupsByOverAttribute = groupBy(filters, (filter) => getUriForIdentifier(filter.overAttribute));
            const expressionsByOverAttribute = Object.keys(groupsByOverAttribute).map((overAttribute) => {
                const filterGroupExpression = groupsByOverAttribute[overAttribute]
                    .map((parentFilter) => {
                    const isNegativeFilter = isNegativeAttributeFilter(parentFilter.attributeFilter);
                    const filterElements = filterAttributeElements(parentFilter.attributeFilter);
                    const parentFilterAttributeUri = getFilterAttributeUri(parentFilter.attributeFilter);
                    if (!isAttributeElementsByRef(filterElements)) {
                        throw new NotSupported("Only attribute elements by ref are supported in elements attribute filter on the bear backend");
                    }
                    const elementsString = filterElements.uris
                        .map((attributeElementUri) => `[${attributeElementUri}]`)
                        .join(", ");
                    const operatorString = isNegativeFilter ? "NOT IN" : "IN";
                    return `[${parentFilterAttributeUri}] ${operatorString} (${elementsString})`;
                })
                    .join(" AND ");
                return `((${filterGroupExpression}) OVER [${overAttribute}] TO [${attributeRefUri}])`;
            });
            return expressionsByOverAttribute.join(" AND ");
        };
        this.getIdentifierUriPairs = (filters) => {
            const allIdentifiersUsed = this.getAllIdentifiersUsedInAttributeFilters(filters);
            return this.authCall((sdk) => sdk.md.getUrisFromIdentifiers(this.workspace, allIdentifiersUsed));
        };
        this.getAllIdentifiersUsedInAttributeFilters = (filters) => {
            return flatMap(filters, (filter) => {
                // the only candidates are the filter itself and the overAttribute
                return [filter.overAttribute, filterObjRef(filter.attributeFilter)]
                    .filter(isIdentifierRef)
                    .map((ref) => ref.identifier);
            });
        };
        this.getDisplayFormAttributeUriMapping = async (displayForms) => {
            const displayFormUris = await objRefsToUris(displayForms, this.workspace, this.authCall);
            return this.authCall(async (sdk) => {
                const response = await sdk.md.getObjects(this.workspace, displayFormUris);
                return displayForms.map((displayForm) => {
                    const attribute = response.find((item) => {
                        if (isIdentifierRef(displayForm)) {
                            return displayForm.identifier === item.attributeDisplayForm.meta.identifier;
                        }
                        else {
                            return displayForm.uri === item.attributeDisplayForm.meta.uri;
                        }
                    });
                    if (attribute === undefined) {
                        throw new Error("Cannot find attribute for display form");
                    }
                    return [displayForm, attribute.attributeDisplayForm.content.formOf];
                });
            });
        };
    }
}
//# sourceMappingURL=limitingAfmFactory.js.map