// (C) 2022-2023 GoodData Corporation
import React, { useState, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import { insightTitle, insightVisualizationType, insightUpdated, insightIsLocked, isUriRef, areObjRefsEqual, insightSummary, insightCreated, } from "@gooddata/sdk-model";
import debounce from "lodash/debounce.js";
import range from "lodash/range.js";
import { useBackendStrict, usePagedResource, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { InsightListItem, DropdownList } from "@gooddata/sdk-ui-kit";
import { InsightListNoData } from "./InsightListNoData.js";
import { createInsightRequested, selectAllowCreateInsightRequest, selectCanCreateVisualization, selectInsightListLastUpdateRequested, selectSettings, useDashboardEventDispatch, useDashboardSelector, selectCurrentUser, selectSupportsObjectUris, } from "../../model/index.js";
import { messages } from "../../locales.js";
const ITEMS_PER_PAGE = 50;
const ITEM_HEIGHT = 40;
const LIST_WIDTH = 229;
export function getInsightListSourceItem(insight) {
    const insightType = insightVisualizationType(insight);
    return {
        insight,
        insightType,
    };
}
const dropdownTabsTranslationIds = [messages.tabsMy, messages.tabsAll];
const useAuthor = () => {
    const isObjectUrisSupported = useDashboardSelector(selectSupportsObjectUris);
    const user = useDashboardSelector(selectCurrentUser);
    const userUri = isUriRef(user.ref) ? user.ref.uri : undefined;
    // getInsights filter via user URI on Bear, via user's login on Tiger
    return isObjectUrisSupported ? userUri : user.login;
};
/**
 * @internal
 */
export const InsightList = ({ height, width = LIST_WIDTH, searchAutofocus, renderItem, selectedRef, onSelect, }) => {
    const intl = useIntl();
    const backend = useBackendStrict();
    const workspaceId = useWorkspaceStrict();
    const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
    const [pagesToLoad, setPagesToLoad] = useState([0]); // first page loaded
    const [search, setSearch] = useState("");
    const [selectedTabId, setSelectedTabId] = useState(messages.tabsMy.id);
    const author = useAuthor();
    const insightListLastUpdateRequested = useDashboardSelector(selectInsightListLastUpdateRequested);
    const canCreateVisualization = useDashboardSelector(selectCanCreateVisualization);
    const allowCreateInsightRequest = useDashboardSelector(selectAllowCreateInsightRequest);
    const settings = useDashboardSelector(selectSettings);
    const params = pagesToLoad.map((pageNumber) => ({
        limit: ITEMS_PER_PAGE,
        offset: pageNumber * ITEMS_PER_PAGE,
        title: search,
        author: selectedTabId === messages.tabsMy.id && !search ? author : undefined,
    }));
    const { items: insights, totalItemsCount: totalInsightsCount, isLoading, } = usePagedResource(({ limit, offset, title, author, }) => {
        const options = {
            limit,
            offset,
            author,
            title,
            orderBy: "updated",
        };
        return backend.workspace(workspaceId).insights().getInsights(options);
    }, params, [backend, pagesToLoad, search, selectedTabId, insightListLastUpdateRequested], [search, selectedTabId, pagesToLoad.length === 0, insightListLastUpdateRequested], undefined, undefined, true);
    useEffect(() => {
        if (!initialLoadCompleted && typeof totalInsightsCount !== "undefined") {
            setInitialLoadCompleted(true);
            if (totalInsightsCount === 0) {
                // when the user has no insights of their own, switch to the All tab
                setSelectedTabId(messages.tabsAll.id);
            }
        }
    }, [initialLoadCompleted, totalInsightsCount]);
    const onSearch = useCallback(debounce((searchString) => {
        setPagesToLoad([0]);
        setSearch(searchString);
    }, 500), []);
    const itemHeightGetter = (index) => {
        // Modify item heights for first/last item so that their hover states don't overlap.
        // Also @see styles and keep this value in sync with what's in css styles
        // for is-first and is-last in visualization items in the list
        const firstLastItemMargin = 10;
        const isFirstOrLast = totalInsightsCount ? index === 0 || index === totalInsightsCount - 1 : false;
        return isFirstOrLast ? ITEM_HEIGHT + firstLastItemMargin : ITEM_HEIGHT;
    };
    const eventDispatch = useDashboardEventDispatch();
    const createInsightRequestedEvent = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        eventDispatch(createInsightRequested());
    }, []);
    const TABS_AND_SEARCHFIELD_HEIGHT = 70;
    const SEARCHFIELD_HEIGHT = 47;
    // need to subtract height of controls from the overall size which was measured
    const controlsHeight = search ? SEARCHFIELD_HEIGHT : TABS_AND_SEARCHFIELD_HEIGHT;
    const dropdownListHeight = height && height - controlsHeight;
    const dropdownListLoading = isLoading && insights.length === 0;
    const showDropdownListTabs = initialLoadCompleted && !search;
    const showNoDataCreateButton = allowCreateInsightRequest && canCreateVisualization;
    return (React.createElement(DropdownList, { width: width, height: dropdownListHeight, isMobile: false, isLoading: dropdownListLoading, showSearch: initialLoadCompleted, searchString: search, searchFieldSize: "small", searchPlaceholder: intl.formatMessage({ id: "search_insights" }), onSearch: onSearch, disableAutofocus: !searchAutofocus, showTabs: showDropdownListTabs, tabs: backend.capabilities.supportsOwners && author ? dropdownTabsTranslationIds : undefined, selectedTabId: selectedTabId, onTabSelect: ({ id }) => {
            setPagesToLoad([0]);
            setSelectedTabId(id);
        }, itemHeight: ITEM_HEIGHT, itemHeightGetter: itemHeightGetter, items: insights, itemsCount: totalInsightsCount, renderItem: renderItem !== null && renderItem !== void 0 ? renderItem : (({ item: insight, width }) => {
            var _a, _b;
            if (!insight) {
                return React.createElement(InsightListItem, { isLoading: true });
            }
            const title = insightTitle(insight);
            const description = (_a = insightSummary(insight)) === null || _a === void 0 ? void 0 : _a.trim();
            const insightListSourceItem = getInsightListSourceItem(insight);
            const isSelected = areObjRefsEqual(insight.insight.ref, selectedRef);
            return (React.createElement(InsightListItem, { title: title, description: description, showDescriptionPanel: settings === null || settings === void 0 ? void 0 : settings.enableDescriptions, type: insightListSourceItem.insightType, width: width, isSelected: isSelected, updated: (_b = insightUpdated(insightListSourceItem.insight)) !== null && _b !== void 0 ? _b : insightCreated(insightListSourceItem.insight), isLocked: insightIsLocked(insightListSourceItem.insight), onClick: () => onSelect === null || onSelect === void 0 ? void 0 : onSelect(insight), metadataTimeZone: settings === null || settings === void 0 ? void 0 : settings.metadataTimeZone }));
        }), renderNoData: ({ hasNoMatchingData }) => (React.createElement(InsightListNoData, { isUserInsights: selectedTabId === messages.tabsMy.id, hasNoMatchingData: hasNoMatchingData, showNoDataCreateButton: showNoDataCreateButton, onCreateButtonClick: createInsightRequestedEvent })), onScrollEnd: (startIndex, endIndex) => {
            const startPage = Math.floor(startIndex / ITEMS_PER_PAGE);
            const endPage = Math.floor(endIndex / ITEMS_PER_PAGE);
            const pagesToLoad = range(startPage, endPage + 1);
            setPagesToLoad(pagesToLoad);
        } }));
};
//# sourceMappingURL=InsightList.js.map