import React from "react";
import { ILocale } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export interface ILocaleSettingProps {
    isChecked: boolean;
    selectedLocal: ILocale;
    onChecked: () => void;
    onLocaleSelected: (locale: ILocale) => void;
}
/**
 * @internal
 */
export declare const LocaleSetting: React.VFC<ILocaleSettingProps>;
//# sourceMappingURL=LocaleSetting.d.ts.map