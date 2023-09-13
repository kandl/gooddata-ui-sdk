// (C) 2020-2022 GoodData Corporation
import { areObjRefsEqual, idRef } from "@gooddata/sdk-model";
import { isDrillToCustomUrlConfig } from "../../../../drill/types.js";
import { useDashboardSelector, selectAllCatalogDisplayFormsMap } from "../../../../../model/index.js";
import { useMemo } from "react";
import { getAttributeIdentifiersPlaceholdersFromUrl } from "../../../../../_staging/drills/drillingUtils.js";
export function useInvalidAttributeDisplayFormIdentifiers(urlDrillTarget, attributes) {
    const displayForms = useDashboardSelector(selectAllCatalogDisplayFormsMap);
    return useMemo(() => {
        if (isDrillToCustomUrlConfig(urlDrillTarget)) {
            const parameters = getAttributeIdentifiersPlaceholdersFromUrl(urlDrillTarget.customUrl);
            return parameters
                .filter(({ identifier }) => {
                // parameter is invalid if either it points to display form that no longer exists
                const relevantDf = displayForms.get(idRef(identifier, "displayForm"));
                if (!relevantDf) {
                    return false;
                }
                // or if it points to an attribute that is no longer a valid drill target
                return !attributes.some((attribute) => areObjRefsEqual(relevantDf.attribute, attribute.attributeHeader.formOf));
            })
                .map(({ identifier }) => identifier);
        }
        return [];
    }, [displayForms, urlDrillTarget, attributes]);
}
//# sourceMappingURL=useInvalidAttributeDisplayFormIdentifier.js.map