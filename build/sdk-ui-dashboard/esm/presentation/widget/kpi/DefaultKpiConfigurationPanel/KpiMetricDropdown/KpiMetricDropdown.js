// (C) 2022 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWorkspaceStrict } from "@gooddata/sdk-ui";
import { safeSerializeObjRef } from "../../../../../_staging/metadata/safeSerializeObjRef.js";
import { MetricDropdown } from "./MetricDropdown.js";
export const KpiMetricDropdown = (props) => {
    const { widget, onMeasureChange } = props;
    const workspace = useWorkspaceStrict();
    const measureRef = widget === null || widget === void 0 ? void 0 : widget.kpi.metric;
    const [selectedMeasure, setSelectedMeasure] = useState(measureRef);
    const selectedItems = useMemo(() => (selectedMeasure ? [selectedMeasure] : []), [selectedMeasure]);
    const handleMeasureChanged = useCallback((measure) => {
        onMeasureChange(measure.ref);
        setSelectedMeasure(measure.ref);
    }, [onMeasureChange]);
    useEffect(() => {
        setSelectedMeasure(measureRef);
    }, [safeSerializeObjRef(measureRef)]);
    return (React.createElement(MetricDropdown, { workspace: workspace, openOnInit: !measureRef, bodyClassName: "configuration-dropdown metrics-list s-metrics-list", selectedItems: selectedItems, onSelect: handleMeasureChanged }));
};
//# sourceMappingURL=KpiMetricDropdown.js.map