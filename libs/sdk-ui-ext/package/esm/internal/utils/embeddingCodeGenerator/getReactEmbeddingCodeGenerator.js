// (C) 2022 GoodData Corporation
import compact from "lodash/compact";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";
import join from "lodash/fp/join";
import map from "lodash/fp/map";
import partition from "lodash/fp/partition";
import repeat from "lodash/repeat";
import sortBy from "lodash/sortBy";
import toPairs from "lodash/fp/toPairs";
import uniqBy from "lodash/uniqBy";
import { factoryNotationFor } from "@gooddata/sdk-model";
import { normalizeInsight } from "./normalizeInsight";
// these are in line with what `factoryNotationFor` supports
const defaultFactories = [
    // ObjRef factories
    "uriRef",
    "idRef",
    "localIdRef",
    // attribute factories
    "newAttribute",
    // measure factories
    "newMeasure",
    "newArithmeticMeasure",
    "newPopMeasure",
    "newPreviousPeriodMeasure",
    // filter factories
    "newAbsoluteDateFilter",
    "newRelativeDateFilter",
    "newNegativeAttributeFilter",
    "newPositiveAttributeFilter",
    "newMeasureValueFilter",
    "newRankingFilter",
    // sort factories
    "newAttributeSort",
    "newAttributeAreaSort",
    "newMeasureSort",
    // total factories
    "newTotal",
].map((name) => ({ name, importType: "named", package: "@gooddata/sdk-model" }));
function detectFactoryImports(propDeclarations, additionalFactories) {
    const serializedProps = propDeclarations.join("\n");
    return [...defaultFactories, ...additionalFactories.map((f) => f.importInfo)].filter(({ name }) => serializedProps.includes(name));
}
function extendedFactoryNotationFor(value, additionalFactories) {
    return factoryNotationFor(value, (obj) => {
        let additionalMatch;
        for (const f of additionalFactories) {
            additionalMatch = f.transformation(obj);
            if (additionalMatch) {
                break;
            }
        }
        return additionalMatch;
    });
}
const TAB_SIZE = 4;
const DEFAULT_HEIGHT = 400;
function indent(str, tabs) {
    return str
        .split("\n")
        .map((chunk) => `${repeat(" ", tabs * TAB_SIZE)}${chunk}`)
        .join("\n");
}
const renderImports = flow(groupBy((i) => i.package), toPairs, map(([pkg, imports]) => {
    const [[defaultImport], namedImports] = partition((i) => i.importType === "default", imports);
    return compact([
        "import",
        compact([
            defaultImport === null || defaultImport === void 0 ? void 0 : defaultImport.name,
            namedImports.length &&
                `{ ${sortBy(namedImports.map((i) => i.name), (i) => i.toLowerCase()).join(", ")} }`,
        ]).join(", "),
        "from",
        `"${pkg}";`,
    ]).join(" ");
}), join("\n"));
const REACT_IMPORT_INFO = { name: "React", package: "react", importType: "default" };
function walkProps(props, additionalFactories, config) {
    var _a, _b;
    const language = (_a = config === null || config === void 0 ? void 0 : config.language) !== null && _a !== void 0 ? _a : "ts";
    const propsToOmit = (_b = config === null || config === void 0 ? void 0 : config.omitChartProps) !== null && _b !== void 0 ? _b : [];
    const importsUsed = [];
    // we ignore undefined values and functions as there is no bullet-proof way to serialize them
    const propPairsIgnoredFunctions = toPairs(props).filter(([_, meta]) => meta !== undefined && !isFunction(meta.value) && !isEmpty(meta.value));
    //omit chart configuration when define in config
    const propPairs = propPairsIgnoredFunctions.filter(([key, _]) => !propsToOmit.includes(key));
    // get variable declaration for each prop to render outside of the component
    const propDeclarations = propPairs.map(([key, { value, meta }]) => {
        if (isString(value)) {
            return `const ${key} = "${value}";`;
        }
        const rhsValue = extendedFactoryNotationFor(value, additionalFactories !== null && additionalFactories !== void 0 ? additionalFactories : []);
        const needsType = language === "ts";
        if (needsType) {
            const typeDeclaration = meta.cardinality === "array" ? `${meta.typeImport.name}[]` : meta.typeImport.name;
            importsUsed.push(meta.typeImport);
            return `const ${key}: ${typeDeclaration} = ${rhsValue};`;
        }
        else {
            return `const ${key} = ${rhsValue};`;
        }
    });
    // get the prop={prop} pairs to fill the component with
    const propUsages = propPairs.map(([key]) => `${key}={${key}}`);
    // add all the factories used in the propDeclarations so that we can add their imports later
    const detectedFactories = detectFactoryImports(propDeclarations, additionalFactories !== null && additionalFactories !== void 0 ? additionalFactories : []);
    importsUsed.push(...detectedFactories);
    return {
        importsUsed: uniqBy(importsUsed, (i) => `${i.package}#${i.name}`),
        propDeclarations,
        propUsages,
    };
}
/**
 * Creates a React embedding code generator.
 *
 * @remarks
 * This abstracts away much of the particular-pluggable-visualization-type-agnostic logic,
 * taking the visualization-type-specific information in the `specification` parameter.
 *
 * @param specification - specification of the code generator
 * @returns function that can be used to obtain React embedding code
 */
export function getReactEmbeddingCodeGenerator(specification) {
    const { component, insightToProps, additionalFactories } = specification;
    return (insight, config) => {
        var _a;
        const normalizedInsight = normalizeInsight(insight);
        const props = insightToProps(normalizedInsight, config === null || config === void 0 ? void 0 : config.context);
        const { importsUsed, propDeclarations, propUsages } = walkProps(props, additionalFactories, config);
        const imports = compact([REACT_IMPORT_INFO, ...importsUsed, component]);
        const height = (_a = config === null || config === void 0 ? void 0 : config.height) !== null && _a !== void 0 ? _a : DEFAULT_HEIGHT;
        const stringifiedHeight = isString(height) ? `"${height}"` : height.toString();
        const componentBody = `<${component.name}\n${indent(propUsages.join("\n"), 1)}\n/>`;
        return `${renderImports(imports)}

${propDeclarations.join("\n")}
const style = {height: ${stringifiedHeight}};

export function MyComponent() {
    return (
        <div style={style}>
${indent(componentBody, 3)}
        </div>
    );
}
`;
    };
}
//# sourceMappingURL=getReactEmbeddingCodeGenerator.js.map