export type RulePredicate = (measureDefinition: any, mdObj: any) => boolean;
export type RuleCallback = (measure: any, mdObj: any, measureIndex: number, attributesMap: any) => any;
export declare class Rules {
    private rules;
    constructor();
    addRule(tests: RulePredicate[], callback: RuleCallback): void;
    match(subject: any, params: any): any;
}
//# sourceMappingURL=rules.d.ts.map