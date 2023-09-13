// (C) 2019-2022 GoodData Corporation
import stringify from "json-stable-stringify";
/**
 * @internal
 */
export const serializeProperties = (properties) => stringify(properties);
/**
 * @internal
 */
export const deserializeProperties = (properties) => {
    try {
        return properties ? JSON.parse(properties) : {};
    }
    catch (_a) {
        console.error(`Error parsing properties: "${properties}"`);
        return {};
    }
};
//# sourceMappingURL=PropertiesConverter.js.map