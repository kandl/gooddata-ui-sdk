// (C) 2007-2022 GoodData Corporation
import moment from "moment";
import { platformDateFormat, TIME_FORMAT } from "../constants/Platform.js";
const mergeModifiers = (defaultModifiers, userModifiers) => defaultModifiers ? { modifiers: Object.assign(Object.assign({}, defaultModifiers), userModifiers) } : undefined;
const mergeDayPickerPropsBody = (defaultProps, userProps) => (Object.assign(Object.assign(Object.assign({}, defaultProps), userProps), mergeModifiers(defaultProps.modifiers, userProps.modifiers)));
export const mergeDayPickerProps = (defaultProps, userProps) => (userProps ? mergeDayPickerPropsBody(defaultProps, userProps) : defaultProps);
export const areRangeBoundsCrossed = (from, to) => from && to ? moment(from).isAfter(moment(to)) : false;
export const getPlatformStringFromDate = (value) => moment(value).format(platformDateFormat);
export const getTimeStringFromDate = (value) => moment(value).format(TIME_FORMAT);
//# sourceMappingURL=utils.js.map