import { WrappedComponentProps } from "react-intl";
import { IPushData } from "@gooddata/sdk-ui";
import { IInsightDefinition } from "@gooddata/sdk-model";
import { IMinMaxControlState, IMinMaxControlProps } from "../interfaces/MinMaxControl.js";
export declare function maxInputValidateAndPushData(data: IPushData, state: IMinMaxControlState, props: IMinMaxControlProps & WrappedComponentProps, setState: (data: Partial<IMinMaxControlState>) => void, defaultState: IMinMaxControlState): void;
export declare function minInputValidateAndPushData(data: IPushData, state: IMinMaxControlState, props: IMinMaxControlProps & WrappedComponentProps, setState: (data: Partial<IMinMaxControlState>) => void, defaultState: IMinMaxControlState): void;
export declare function isSetColumnHeadersPositionToLeftAllowed(insight: IInsightDefinition): boolean;
//# sourceMappingURL=controlsHelper.d.ts.map