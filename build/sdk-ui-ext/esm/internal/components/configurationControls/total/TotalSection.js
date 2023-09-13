// (C) 2023 GoodData Corporation
import React, { useEffect } from "react";
import set from "lodash/set.js";
import cloneDeep from "lodash/cloneDeep.js";
import { injectIntl } from "react-intl";
import ConfigSection from "../ConfigSection.js";
import InputControl from "../InputControl.js";
import { messages } from "../../../../locales.js";
import { getTranslation } from "../../../utils/translations.js";
import { isTotalSectionEnabled } from "../../../utils/propertiesHelper.js";
const MAX_BUCKET_ITEM_NAME = 50;
const TotalSection = (props) => {
    var _a, _b, _c, _d, _e;
    const { intl, controlsDisabled, properties, propertiesMeta, pushData } = props;
    const hasTotalMeasure = ((_c = (_b = (_a = properties.controls) === null || _a === void 0 ? void 0 : _a.total) === null || _b === void 0 ? void 0 : _b.measures) === null || _c === void 0 ? void 0 : _c.length) > 0;
    const isToggleDisabled = controlsDisabled || hasTotalMeasure;
    //always toggle to false when the control is disabled, otherwise depend on the properties config
    const isTotalEnabled = isToggleDisabled ? false : isTotalSectionEnabled(properties);
    const totalColumnName = (_e = (_d = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _d === void 0 ? void 0 : _d.total) === null || _e === void 0 ? void 0 : _e.name;
    const defaultTotalColumnName = getTranslation(messages.totalTitle.id, intl);
    const toggleMessageId = hasTotalMeasure
        ? messages.totalMeasuresTooltip.id
        : !controlsDisabled
            ? messages.totalToggleTooltip.id
            : undefined;
    useEffect(() => {
        if (isTotalEnabled && !totalColumnName) {
            const cloneProperties = cloneDeep(properties);
            set(cloneProperties, "controls.total.name", defaultTotalColumnName);
            pushData({ properties: cloneProperties });
        }
    }, [isTotalEnabled, totalColumnName, defaultTotalColumnName, properties, pushData]);
    return (React.createElement(ConfigSection, { id: "total_section", className: "gd-total-section", title: messages.totalTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData, canBeToggled: true, toggleDisabled: isToggleDisabled, toggledOn: isTotalEnabled, valuePath: "total.enabled", showDisabledMessage: true, toggleMessageId: toggleMessageId },
        React.createElement(InputControl, { type: "text", properties: properties, labelText: messages.totalNameLabel.id, valuePath: "total.name", disabled: !isTotalEnabled, placeholder: messages.totalTitle.id, pushData: pushData, value: totalColumnName, maxLength: MAX_BUCKET_ITEM_NAME })));
};
export default injectIntl(React.memo(TotalSection));
//# sourceMappingURL=TotalSection.js.map