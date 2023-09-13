// (C) 2020-2023 GoodData Corporation
import React, { useState, useEffect } from "react";
import { defineMessages, useIntl } from "react-intl";
import { LRUCache } from "lru-cache";
import { objRefToString } from "@gooddata/sdk-model";
import { ParameterDetail } from "./ParameterDetail.js";
import { emptyHeaderTitleFromIntl, useBackendStrict } from "@gooddata/sdk-ui";
import { selectBackendCapabilities, selectCatalogDateDatasets, useDashboardSelector, } from "../../../../../model/index.js";
import { newDisplayFormMap } from "../../../../../_staging/metadata/objRefMap.js";
import flatMap from "lodash/flatMap.js";
const MAX_CACHED_REQUESTS = 50;
const MAX_URL_LENGTH = 100;
const DISPLAY_FORM_ELEMENTS_LIMIT = 3;
const requestCache = new LRUCache({ max: MAX_CACHED_REQUESTS });
const getDisplayFormLabel = (type) => {
    const messages = defineMessages({
        hyperlink: { id: "configurationPanel.drillIntoUrl.editor.urlDisplayFormTypeLabel" },
        pushpin: { id: "configurationPanel.drillIntoUrl.editor.geoDisplayFormTypeLabel" },
        default: { id: "configurationPanel.drillIntoUrl.editor.defaultDisplayFormTypeLabel" },
    });
    switch (type) {
        case "GDC.link":
            return messages.hyperlink;
        case "GDC.geo.pin":
        case "GDC.geo.pin_latitude":
        case "GDC.geo.pin_longitude":
            return messages.pushpin;
        default:
            return messages.default;
    }
};
const handleEmptyValues = (values, intl) => values.map((value) => !value || value.length === 0 ? emptyHeaderTitleFromIntl(intl) : value);
const prepareValues = (elements, type) => {
    if (type !== "GDC.link") {
        return elements.map(({ title }) => title);
    }
    return elements.map(({ title }) => title && title.length > MAX_URL_LENGTH ? `${title.substr(0, MAX_URL_LENGTH)}...` : title);
};
function getElements(backend, projectId, displayFormRef, limit = 5) {
    return backend
        .workspace(projectId)
        .attributes()
        .elements()
        .forDisplayForm(displayFormRef)
        .withLimit(limit)
        .query();
}
const getCachedRequests = async (backend, projectId, displayFormRef) => {
    const cacheKey = objRefToString(displayFormRef);
    const cachedResponse = requestCache.get(cacheKey);
    if (cachedResponse) {
        return cachedResponse;
    }
    const response = await getElements(backend, projectId, displayFormRef, DISPLAY_FORM_ELEMENTS_LIMIT);
    requestCache.set(cacheKey, response);
    return response;
};
const useSupportsEnumeration = (displayFormRef) => {
    const dateDatasets = useDashboardSelector(selectCatalogDateDatasets);
    const { hasTypeScopedIdentifiers, supportsEnumeratingDatetimeAttributes } = useDashboardSelector(selectBackendCapabilities);
    if (supportsEnumeratingDatetimeAttributes) {
        return true;
    }
    const dateAttributes = flatMap(dateDatasets, (dateDataset) => dateDataset.dateAttributes);
    const displayForms = flatMap(dateAttributes, (dateAttribute) => dateAttribute.attribute.displayForms);
    const displayFormMap = newDisplayFormMap(displayForms, hasTypeScopedIdentifiers);
    const isDateAttribute = Boolean(displayFormMap.get(displayFormRef));
    // datetime attributes should be skipped as they are not supporting enumeration
    return !isDateAttribute;
};
export const AttributeDisplayFormParameterDetail = (props) => {
    const { title, label, type, displayFormRef, projectId, showValues } = props;
    const intl = useIntl();
    const backend = useBackendStrict();
    const [isLoading, setIsLoading] = useState(true);
    const [values, setValues] = useState([]);
    const [additionalValues, setAdditionalValues] = useState(0);
    const supportsEnumeration = useSupportsEnumeration(displayFormRef);
    useEffect(() => {
        let isMounted = true;
        const getValues = async () => {
            const response = await getCachedRequests(backend, projectId, displayFormRef);
            if (isMounted) {
                const additional = response.totalCount - DISPLAY_FORM_ELEMENTS_LIMIT;
                if (additional > 0) {
                    setAdditionalValues(additional);
                }
                setValues(handleEmptyValues(prepareValues(response.items, type), intl));
                setIsLoading(false);
            }
        };
        if (showValues && supportsEnumeration) {
            getValues();
        }
        else {
            setIsLoading(false);
        }
        return () => {
            isMounted = false;
        };
    }, [displayFormRef, type, intl, projectId, showValues, backend, supportsEnumeration]);
    return (React.createElement(ParameterDetail, { title: title, label: label, typeName: intl.formatMessage(getDisplayFormLabel(type)), isLoading: isLoading, useEllipsis: type !== "GDC.link", values: values ? values : [], additionalValues: additionalValues }));
};
//# sourceMappingURL=AttributeDisplayFormParameterDetail.js.map