import { IAttribute, IMeasure, IMeasureDefinition } from "@gooddata/sdk-model";
/**
 * Attribute Title: Account
 * Attribute ID: attr.account.id
 */
export declare const Account: {
    /**
     * Display Form Title: Name
     * Display Form ID: label.account.id.name
     */
    Name: IAttribute;
    /**
     * Display Form Title: Account
     * Display Form ID: label.account.id
     */ Default: IAttribute;
};
/**
 * Attribute Title: Activity
 * Attribute ID: attr.activity.id
 */
export declare const Activity: {
    /**
     * Display Form Title: Subject
     * Display Form ID: label.activity.id.subject
     */
    Subject: IAttribute;
    /**
     * Display Form Title: Activity
     * Display Form ID: label.activity.id
     */ Default: IAttribute;
};
/**
 * Attribute Title: Activity Type
 * Attribute ID: attr.activity.activitytype
 */
export declare const ActivityType: IAttribute;
/**
 * Attribute Title: Department
 * Attribute ID: attr.owner.department
 */
export declare const Department: IAttribute;
/**
 * Attribute Title: Forecast Category
 * Attribute ID: attr.opportunitysnapshot.forecastcategory
 */
export declare const ForecastCategory: IAttribute;
/**
 * Attribute Title: Is Active?
 * Attribute ID: attr.stage.isactive
 */
export declare const IsActive: IAttribute;
/**
 * Attribute Title: Is Closed?
 * Attribute ID: attr.activity.isclosed
 */
export declare const IsClosed: IAttribute;
/**
 * Attribute Title: Is Closed?
 * Attribute ID: attr.stage.isclosed
 */
export declare const IsClosed_1: IAttribute;
/**
 * Attribute Title: Is Task?
 * Attribute ID: attr.activity.istask
 */
export declare const IsTask: IAttribute;
/**
 * Attribute Title: Is Won?
 * Attribute ID: attr.stage.iswon
 */
export declare const IsWon: IAttribute;
/**
 * Attribute Title: Opp. Snapshot
 * Attribute ID: attr.opportunitysnapshot.id
 */
export declare const OppSnapshot: IAttribute;
/**
 * Attribute Title: Opportunity
 * Attribute ID: attr.opportunity.id
 */
export declare const Opportunity: {
    /**
     * Display Form Title: Opportunity Name
     * Display Form ID: label.opportunity.id.name
     */
    Name: IAttribute;
    /**
     * Display Form Title: Opportunity
     * Display Form ID: label.opportunity.id
     */ Default: IAttribute;
    /**
     * Display Form Title: SFDC URL
     * Display Form ID: label.opportunity.id.url
     */ SFDCURL: IAttribute;
};
/**
 * Attribute Title: Priority
 * Attribute ID: attr.activity.priority
 */
export declare const Priority: IAttribute;
/**
 * Attribute Title: Product
 * Attribute ID: attr.product.id
 */
export declare const Product: {
    /**
     * Display Form Title: Product Name
     * Display Form ID: label.product.id.name
     */
    Name: IAttribute;
    /**
     * Display Form Title: Product
     * Display Form ID: label.product.id
     */ Default: IAttribute;
};
/**
 * Attribute Title: Region
 * Attribute ID: attr.owner.region
 */
export declare const Region: IAttribute;
/**
 * Attribute Title: Sales Rep
 * Attribute ID: attr.owner.id
 */
export declare const SalesRep: {
    /**
     * Display Form Title: Owner Name
     * Display Form ID: label.owner.id.name
     */
    OwnerName: IAttribute;
    /**
     * Display Form Title: Owner
     * Display Form ID: label.owner.id
     */ Owner: IAttribute;
};
/**
 * Attribute Title: Stage History
 * Attribute ID: attr.stagehistory.id
 */
export declare const StageHistory: IAttribute;
/**
 * Attribute Title: Stage Name
 * Attribute ID: attr.stage.name
 */
export declare const StageName: {
    /**
     * Display Form Title: Stage Name
     * Display Form ID: label.stage.name.stagename
     */
    Default: IAttribute;
    /**
     * Display Form Title: Order
     * Display Form ID: label.stage.name.order
     */ Order: IAttribute;
};
/**
 * Attribute Title: Status
 * Attribute ID: attr.activity.status
 */
export declare const Status: IAttribute;
/**
 * Attribute Title: Status
 * Attribute ID: attr.stage.status
 */
export declare const Status_1: IAttribute;
/**
 * Metric Title: _Snapshot [EOP]
 * Metric ID: abxgDICQav2J
 * Metric Type: MAQL Metric
 */
export declare const SnapshotEOP: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: _Timeline [EOP]
 * Metric ID: abYgDBRagANw
 * Metric Type: MAQL Metric
 */
export declare const TimelineEOP: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Of Opportunities
 * Metric ID: abQgDWx4gOUu
 * Metric Type: MAQL Metric
 */
export declare const NrOfOpportunities: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Of Opportunities Won
 * Metric ID: aa4gLlQhcmLO
 * Metric Type: MAQL Metric
 */
export declare const NrOfOpportunitiesWon: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Amount
 * Metric ID: aangOxLSeztu
 * Metric Type: MAQL Metric
 */
export declare const Amount: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Probability
 * Metric ID: abEgMnq5hyJQ
 * Metric Type: MAQL Metric
 */
export declare const Probability: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Sample XIRR
 * Metric ID: aadpHDMBecIy
 * Metric Type: MAQL Metric
 */
export declare const SampleXIRR: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Win Rate
 * Metric ID: abZgFKGPaGYM
 * Metric Type: MAQL Metric
 */
export declare const WinRate: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Won
 * Metric ID: acugFHNJgsBy
 * Metric Type: MAQL Metric
 */
export declare const Won: IMeasure<IMeasureDefinition>;
/**
 * Fact Title: Activity (Date)
 * Fact ID: dt.activity.activity
 */
export declare const ActivityDate: {
    /**
     * Fact Title: Activity (Date)
     * Fact ID: dt.activity.activity
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Activity (Date)
     * Fact ID: dt.activity.activity
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Activity (Date)
     * Fact ID: dt.activity.activity
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Activity (Date)
     * Fact ID: dt.activity.activity
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Activity (Date)
     * Fact ID: dt.activity.activity
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Activity (Date)
     * Fact ID: dt.activity.activity
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Amount
 * Fact ID: fact.opportunitysnapshot.amount
 */
export declare const Amount_1: {
    /**
     * Fact Title: Amount
     * Fact ID: fact.opportunitysnapshot.amount
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Amount
     * Fact ID: fact.opportunitysnapshot.amount
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Amount
     * Fact ID: fact.opportunitysnapshot.amount
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Amount
     * Fact ID: fact.opportunitysnapshot.amount
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Amount
     * Fact ID: fact.opportunitysnapshot.amount
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Amount
     * Fact ID: fact.opportunitysnapshot.amount
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Days to Close
 * Fact ID: fact.opportunitysnapshot.daystoclose
 */
export declare const DaysToClose: {
    /**
     * Fact Title: Days to Close
     * Fact ID: fact.opportunitysnapshot.daystoclose
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Days to Close
     * Fact ID: fact.opportunitysnapshot.daystoclose
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Days to Close
     * Fact ID: fact.opportunitysnapshot.daystoclose
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Days to Close
     * Fact ID: fact.opportunitysnapshot.daystoclose
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Days to Close
     * Fact ID: fact.opportunitysnapshot.daystoclose
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Days to Close
     * Fact ID: fact.opportunitysnapshot.daystoclose
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Duration
 * Fact ID: fact.stagehistory.duration
 */
export declare const Duration: {
    /**
     * Fact Title: Duration
     * Fact ID: fact.stagehistory.duration
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Duration
     * Fact ID: fact.stagehistory.duration
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Duration
     * Fact ID: fact.stagehistory.duration
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Duration
     * Fact ID: fact.stagehistory.duration
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Duration
     * Fact ID: fact.stagehistory.duration
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Duration
     * Fact ID: fact.stagehistory.duration
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Opp. Close (Date)
 * Fact ID: dt.opportunitysnapshot.closedate
 */
export declare const OppCloseDate: {
    /**
     * Fact Title: Opp. Close (Date)
     * Fact ID: dt.opportunitysnapshot.closedate
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Close (Date)
     * Fact ID: dt.opportunitysnapshot.closedate
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Close (Date)
     * Fact ID: dt.opportunitysnapshot.closedate
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Close (Date)
     * Fact ID: dt.opportunitysnapshot.closedate
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Close (Date)
     * Fact ID: dt.opportunitysnapshot.closedate
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Close (Date)
     * Fact ID: dt.opportunitysnapshot.closedate
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Opp. Created (Date)
 * Fact ID: dt.opportunity.oppcreated
 */
export declare const OppCreatedDate: {
    /**
     * Fact Title: Opp. Created (Date)
     * Fact ID: dt.opportunity.oppcreated
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Created (Date)
     * Fact ID: dt.opportunity.oppcreated
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Created (Date)
     * Fact ID: dt.opportunity.oppcreated
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Created (Date)
     * Fact ID: dt.opportunity.oppcreated
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Created (Date)
     * Fact ID: dt.opportunity.oppcreated
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Created (Date)
     * Fact ID: dt.opportunity.oppcreated
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Opp. Snapshot (Date)
 * Fact ID: dt.opportunitysnapshot.snapshotdate
 */
export declare const OppSnapshotDate: {
    /**
     * Fact Title: Opp. Snapshot (Date)
     * Fact ID: dt.opportunitysnapshot.snapshotdate
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Snapshot (Date)
     * Fact ID: dt.opportunitysnapshot.snapshotdate
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Snapshot (Date)
     * Fact ID: dt.opportunitysnapshot.snapshotdate
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Snapshot (Date)
     * Fact ID: dt.opportunitysnapshot.snapshotdate
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Snapshot (Date)
     * Fact ID: dt.opportunitysnapshot.snapshotdate
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Opp. Snapshot (Date)
     * Fact ID: dt.opportunitysnapshot.snapshotdate
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Probability
 * Fact ID: fact.opportunitysnapshot.probability
 */
export declare const Probability_1: {
    /**
     * Fact Title: Probability
     * Fact ID: fact.opportunitysnapshot.probability
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Probability
     * Fact ID: fact.opportunitysnapshot.probability
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Probability
     * Fact ID: fact.opportunitysnapshot.probability
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Probability
     * Fact ID: fact.opportunitysnapshot.probability
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Probability
     * Fact ID: fact.opportunitysnapshot.probability
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Probability
     * Fact ID: fact.opportunitysnapshot.probability
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Timeline (Date)
 * Fact ID: dt.timeline.timeline
 */
export declare const TimelineDate: {
    /**
     * Fact Title: Timeline (Date)
     * Fact ID: dt.timeline.timeline
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Timeline (Date)
     * Fact ID: dt.timeline.timeline
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Timeline (Date)
     * Fact ID: dt.timeline.timeline
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Timeline (Date)
     * Fact ID: dt.timeline.timeline
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Timeline (Date)
     * Fact ID: dt.timeline.timeline
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Timeline (Date)
     * Fact ID: dt.timeline.timeline
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Velocity
 * Fact ID: fact.stagehistory.velocity
 */
export declare const Velocity: {
    /**
     * Fact Title: Velocity
     * Fact ID: fact.stagehistory.velocity
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Velocity
     * Fact ID: fact.stagehistory.velocity
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Velocity
     * Fact ID: fact.stagehistory.velocity
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Velocity
     * Fact ID: fact.stagehistory.velocity
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Velocity
     * Fact ID: fact.stagehistory.velocity
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Velocity
     * Fact ID: fact.stagehistory.velocity
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/** Available Date Data Sets */
export declare const DateDatasets: {
    /**
     * Date Data Set Title: Date (Created)
     * Date Data Set ID: created.dataset.dt
     */
    Created: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Created)
         * Date Attribute ID: created.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Created)
             * Display Form ID: created.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Created)
         * Date Attribute ID: created.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Created)
             * Display Form ID: created.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Created)
         * Date Attribute ID: created.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Created)
             * Display Form ID: created.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Created)
             * Display Form ID: created.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Created)
             * Display Form ID: created.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Created)
             * Display Form ID: created.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Created)
             * Display Form ID: created.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Created)
             * Display Form ID: created.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Created)
         * Date Attribute ID: created.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Created)
             * Display Form ID: created.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Created)
         * Date Attribute ID: created.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Created)
             * Display Form ID: created.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Created)
         * Date Attribute ID: created.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Created)
             * Display Form ID: created.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Created)
             * Display Form ID: created.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Created)
             * Display Form ID: created.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Created)
         * Date Attribute ID: created.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Created)
             * Display Form ID: created.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Created)
         * Date Attribute ID: created.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Created)
             * Display Form ID: created.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Created)
         * Date Attribute ID: created.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Created)
             * Display Form ID: created.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Created)
             * Display Form ID: created.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Created)
             * Display Form ID: created.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Created)
             * Display Form ID: created.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Created)
         * Date Attribute ID: created.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Created)
             * Display Form ID: created.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Created)
         * Date Attribute ID: created.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Created)
             * Display Form ID: created.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Created)
         * Date Attribute ID: created.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Created)
             * Display Form ID: created.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Created)
             * Display Form ID: created.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Created)
             * Display Form ID: created.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Created)
         * Date Attribute ID: created.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Created)
             * Display Form ID: created.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Created)
             * Display Form ID: created.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Created)
             * Display Form ID: created.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Created)
         * Date Attribute ID: created.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Created)
             * Display Form ID: created.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Created)
         * Date Attribute ID: created.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Created)
             * Display Form ID: created.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Created)
         * Date Attribute ID: created.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Created)
             * Display Form ID: created.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Created)
         * Date Attribute ID: created.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Created)
             * Display Form ID: created.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Created)
             * Display Form ID: created.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Created)
             * Display Form ID: created.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Created)
         * Date Attribute ID: created.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Created)
             * Display Form ID: created.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Created)
             * Display Form ID: created.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Created)
             * Display Form ID: created.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Created)
             * Display Form ID: created.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Created)
             * Display Form ID: created.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Created)
             * Display Form ID: created.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Closed)
     * Date Data Set ID: closed.dataset.dt
     */ Closed: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Closed)
         * Date Attribute ID: closed.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Closed)
             * Display Form ID: closed.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Closed)
         * Date Attribute ID: closed.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Closed)
             * Display Form ID: closed.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Closed)
         * Date Attribute ID: closed.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Closed)
             * Display Form ID: closed.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Closed)
             * Display Form ID: closed.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Closed)
             * Display Form ID: closed.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Closed)
             * Display Form ID: closed.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Closed)
             * Display Form ID: closed.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Closed)
             * Display Form ID: closed.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Closed)
         * Date Attribute ID: closed.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Closed)
             * Display Form ID: closed.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Closed)
         * Date Attribute ID: closed.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Closed)
             * Display Form ID: closed.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Closed)
         * Date Attribute ID: closed.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Closed)
             * Display Form ID: closed.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Closed)
             * Display Form ID: closed.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Closed)
             * Display Form ID: closed.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Closed)
         * Date Attribute ID: closed.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Closed)
             * Display Form ID: closed.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Closed)
         * Date Attribute ID: closed.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Closed)
             * Display Form ID: closed.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Closed)
         * Date Attribute ID: closed.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Closed)
             * Display Form ID: closed.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Closed)
             * Display Form ID: closed.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Closed)
             * Display Form ID: closed.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Closed)
             * Display Form ID: closed.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Closed)
         * Date Attribute ID: closed.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Closed)
             * Display Form ID: closed.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Closed)
         * Date Attribute ID: closed.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Closed)
             * Display Form ID: closed.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Closed)
         * Date Attribute ID: closed.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Closed)
             * Display Form ID: closed.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Closed)
             * Display Form ID: closed.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Closed)
             * Display Form ID: closed.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Closed)
         * Date Attribute ID: closed.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Closed)
             * Display Form ID: closed.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Closed)
             * Display Form ID: closed.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Closed)
             * Display Form ID: closed.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Closed)
         * Date Attribute ID: closed.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Closed)
             * Display Form ID: closed.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Closed)
         * Date Attribute ID: closed.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Closed)
             * Display Form ID: closed.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Closed)
         * Date Attribute ID: closed.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Closed)
             * Display Form ID: closed.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Closed)
         * Date Attribute ID: closed.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Closed)
             * Display Form ID: closed.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Closed)
             * Display Form ID: closed.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Closed)
             * Display Form ID: closed.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Closed)
         * Date Attribute ID: closed.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Closed)
             * Display Form ID: closed.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Closed)
             * Display Form ID: closed.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Closed)
             * Display Form ID: closed.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Closed)
             * Display Form ID: closed.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Closed)
             * Display Form ID: closed.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Closed)
             * Display Form ID: closed.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Snapshot)
     * Date Data Set ID: snapshot.dataset.dt
     */ Snapshot: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Snapshot)
         * Date Attribute ID: snapshot.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Snapshot)
             * Display Form ID: snapshot.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Snapshot)
         * Date Attribute ID: snapshot.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Snapshot)
             * Display Form ID: snapshot.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Snapshot)
         * Date Attribute ID: snapshot.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Snapshot)
             * Display Form ID: snapshot.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Snapshot)
             * Display Form ID: snapshot.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Snapshot)
             * Display Form ID: snapshot.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Snapshot)
             * Display Form ID: snapshot.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Snapshot)
             * Display Form ID: snapshot.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Snapshot)
             * Display Form ID: snapshot.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Snapshot)
         * Date Attribute ID: snapshot.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Snapshot)
             * Display Form ID: snapshot.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Snapshot)
         * Date Attribute ID: snapshot.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Snapshot)
             * Display Form ID: snapshot.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Snapshot)
         * Date Attribute ID: snapshot.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Snapshot)
             * Display Form ID: snapshot.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Snapshot)
             * Display Form ID: snapshot.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Snapshot)
             * Display Form ID: snapshot.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Snapshot)
         * Date Attribute ID: snapshot.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Snapshot)
             * Display Form ID: snapshot.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Snapshot)
         * Date Attribute ID: snapshot.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Snapshot)
             * Display Form ID: snapshot.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Snapshot)
         * Date Attribute ID: snapshot.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Snapshot)
             * Display Form ID: snapshot.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Snapshot)
             * Display Form ID: snapshot.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Snapshot)
             * Display Form ID: snapshot.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Snapshot)
             * Display Form ID: snapshot.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Snapshot)
         * Date Attribute ID: snapshot.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Snapshot)
             * Display Form ID: snapshot.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Snapshot)
         * Date Attribute ID: snapshot.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Snapshot)
             * Display Form ID: snapshot.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Snapshot)
         * Date Attribute ID: snapshot.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Snapshot)
             * Display Form ID: snapshot.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Snapshot)
             * Display Form ID: snapshot.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Snapshot)
             * Display Form ID: snapshot.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Snapshot)
         * Date Attribute ID: snapshot.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Snapshot)
             * Display Form ID: snapshot.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Snapshot)
             * Display Form ID: snapshot.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Snapshot)
             * Display Form ID: snapshot.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Snapshot)
         * Date Attribute ID: snapshot.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Snapshot)
             * Display Form ID: snapshot.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Snapshot)
         * Date Attribute ID: snapshot.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Snapshot)
             * Display Form ID: snapshot.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Snapshot)
         * Date Attribute ID: snapshot.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Snapshot)
             * Display Form ID: snapshot.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Snapshot)
         * Date Attribute ID: snapshot.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Snapshot)
             * Display Form ID: snapshot.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Snapshot)
             * Display Form ID: snapshot.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Snapshot)
             * Display Form ID: snapshot.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Snapshot)
         * Date Attribute ID: snapshot.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Snapshot)
             * Display Form ID: snapshot.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Snapshot)
             * Display Form ID: snapshot.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Snapshot)
             * Display Form ID: snapshot.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Snapshot)
             * Display Form ID: snapshot.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Snapshot)
             * Display Form ID: snapshot.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Snapshot)
             * Display Form ID: snapshot.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Activity)
     * Date Data Set ID: activity.dataset.dt
     */ Activity: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Activity)
         * Date Attribute ID: activity.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Activity)
             * Display Form ID: activity.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Activity)
         * Date Attribute ID: activity.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Activity)
             * Display Form ID: activity.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Activity)
         * Date Attribute ID: activity.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Activity)
             * Display Form ID: activity.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Activity)
             * Display Form ID: activity.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Activity)
             * Display Form ID: activity.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Activity)
             * Display Form ID: activity.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Activity)
             * Display Form ID: activity.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Activity)
             * Display Form ID: activity.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Activity)
         * Date Attribute ID: activity.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Activity)
             * Display Form ID: activity.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Activity)
         * Date Attribute ID: activity.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Activity)
             * Display Form ID: activity.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Activity)
         * Date Attribute ID: activity.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Activity)
             * Display Form ID: activity.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Activity)
             * Display Form ID: activity.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Activity)
             * Display Form ID: activity.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Activity)
         * Date Attribute ID: activity.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Activity)
             * Display Form ID: activity.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Activity)
         * Date Attribute ID: activity.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Activity)
             * Display Form ID: activity.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Activity)
         * Date Attribute ID: activity.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Activity)
             * Display Form ID: activity.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Activity)
             * Display Form ID: activity.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Activity)
             * Display Form ID: activity.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Activity)
             * Display Form ID: activity.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Activity)
         * Date Attribute ID: activity.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Activity)
             * Display Form ID: activity.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Activity)
         * Date Attribute ID: activity.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Activity)
             * Display Form ID: activity.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Activity)
         * Date Attribute ID: activity.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Activity)
             * Display Form ID: activity.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Activity)
             * Display Form ID: activity.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Activity)
             * Display Form ID: activity.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Activity)
         * Date Attribute ID: activity.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Activity)
             * Display Form ID: activity.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Activity)
             * Display Form ID: activity.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Activity)
             * Display Form ID: activity.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Activity)
         * Date Attribute ID: activity.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Activity)
             * Display Form ID: activity.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Activity)
         * Date Attribute ID: activity.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Activity)
             * Display Form ID: activity.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Activity)
         * Date Attribute ID: activity.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Activity)
             * Display Form ID: activity.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Activity)
         * Date Attribute ID: activity.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Activity)
             * Display Form ID: activity.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Activity)
             * Display Form ID: activity.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Activity)
             * Display Form ID: activity.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Activity)
         * Date Attribute ID: activity.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Activity)
             * Display Form ID: activity.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Activity)
             * Display Form ID: activity.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Activity)
             * Display Form ID: activity.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Activity)
             * Display Form ID: activity.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Activity)
             * Display Form ID: activity.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Activity)
             * Display Form ID: activity.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Timeline)
     * Date Data Set ID: timeline.dataset.dt
     */ Timeline: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Timeline)
         * Date Attribute ID: timeline.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Timeline)
             * Display Form ID: timeline.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Timeline)
         * Date Attribute ID: timeline.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Timeline)
             * Display Form ID: timeline.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Timeline)
         * Date Attribute ID: timeline.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Timeline)
             * Display Form ID: timeline.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Timeline)
             * Display Form ID: timeline.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Timeline)
             * Display Form ID: timeline.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Timeline)
             * Display Form ID: timeline.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Timeline)
             * Display Form ID: timeline.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Timeline)
             * Display Form ID: timeline.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Timeline)
         * Date Attribute ID: timeline.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Timeline)
             * Display Form ID: timeline.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Timeline)
         * Date Attribute ID: timeline.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Timeline)
             * Display Form ID: timeline.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Timeline)
         * Date Attribute ID: timeline.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Timeline)
             * Display Form ID: timeline.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Timeline)
             * Display Form ID: timeline.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Timeline)
             * Display Form ID: timeline.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Timeline)
         * Date Attribute ID: timeline.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Timeline)
             * Display Form ID: timeline.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Timeline)
         * Date Attribute ID: timeline.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Timeline)
             * Display Form ID: timeline.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Timeline)
         * Date Attribute ID: timeline.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Timeline)
             * Display Form ID: timeline.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Timeline)
             * Display Form ID: timeline.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Timeline)
             * Display Form ID: timeline.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Timeline)
             * Display Form ID: timeline.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Timeline)
         * Date Attribute ID: timeline.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Timeline)
             * Display Form ID: timeline.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Timeline)
         * Date Attribute ID: timeline.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Timeline)
             * Display Form ID: timeline.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Timeline)
         * Date Attribute ID: timeline.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Timeline)
             * Display Form ID: timeline.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Timeline)
             * Display Form ID: timeline.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Timeline)
             * Display Form ID: timeline.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Timeline)
         * Date Attribute ID: timeline.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Timeline)
             * Display Form ID: timeline.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Timeline)
             * Display Form ID: timeline.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Timeline)
             * Display Form ID: timeline.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Timeline)
         * Date Attribute ID: timeline.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Timeline)
             * Display Form ID: timeline.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Timeline)
         * Date Attribute ID: timeline.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Timeline)
             * Display Form ID: timeline.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Timeline)
         * Date Attribute ID: timeline.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Timeline)
             * Display Form ID: timeline.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Timeline)
         * Date Attribute ID: timeline.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Timeline)
             * Display Form ID: timeline.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Timeline)
             * Display Form ID: timeline.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Timeline)
             * Display Form ID: timeline.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Timeline)
         * Date Attribute ID: timeline.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Timeline)
             * Display Form ID: timeline.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Timeline)
             * Display Form ID: timeline.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Timeline)
             * Display Form ID: timeline.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Timeline)
             * Display Form ID: timeline.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Timeline)
             * Display Form ID: timeline.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Timeline)
             * Display Form ID: timeline.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
};
export declare const Insights: {
    /**
     * Insight Title: Pivot table with native totals
     * Insight ID: aac5Bt1DibxY
     */
    PivotTableWithNativeTotals: string;
};
export declare const Dashboards: {
    /**
     * Dashboard Title: test dashboard
     * Dashboard ID: aabwgUx7rqUN
     */
    TestDashboard: string;
};
//# sourceMappingURL=full.d.ts.map