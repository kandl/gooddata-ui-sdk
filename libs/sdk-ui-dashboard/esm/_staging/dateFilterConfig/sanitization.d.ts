import { RelativeDateFilterOption, AbsoluteDateFilterOption } from "@gooddata/sdk-ui-filters";
export declare const sanitizeDateFilterOption: <T extends AbsoluteDateFilterOption | RelativeDateFilterOption>(option: T) => T;
