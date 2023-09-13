import { IAbsoluteDateFilter, IRelativeDateFilter, ObjRef, IDateFilter } from "@gooddata/sdk-model";
import { AbsoluteDateFilterOption, RelativeDateFilterOption, DateFilterOption } from "../interfaces/index.js";
export declare const mapAbsoluteFilterToAfm: (value: AbsoluteDateFilterOption, dataSet: ObjRef) => IAbsoluteDateFilter;
export declare const mapRelativeFilterToAfm: (value: RelativeDateFilterOption, dataSet: ObjRef) => IRelativeDateFilter;
export declare const mapOptionToAfm: (value: DateFilterOption, dateDataSet: ObjRef, excludeCurrentPeriod: boolean) => IDateFilter;
