// (C) 2019-2022 GoodData Corporation
//import { GdcMetadata } from "../meta/index.js";
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export const isDateFilterReference = (obj) => !isEmpty(obj) && !!obj.dateFilterReference;
/**
 * @public
 */
export const isAttributeFilterReference = (obj) => !isEmpty(obj) && !!obj.attributeFilterReference;
//# sourceMappingURL=GdcExtendedDateFilters.js.map