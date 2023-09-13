import { IDimensionDescriptor, IResultHeader } from "@gooddata/sdk-model";
import { DateFormat } from "./dateValueParser.js";
export declare function findDateAttributeUris(dimensions: IDimensionDescriptor[]): string[];
export declare function transformDateFormat(resultHeader: IResultHeader, dateAttributeUris?: string[], dateFormat?: DateFormat): IResultHeader;
//# sourceMappingURL=dateFormatter.d.ts.map