import { IAttribute, IMeasure, IMeasureDefinition } from "@gooddata/sdk-model";
/**
 * Attribute Title: City
 * Attribute ID: attr.uscities.city
 */
export declare const City: {
    /**
     * Display Form Title: city
     * Display Form ID: label.uscities.city
     */
    Default: IAttribute;
    /**
     * Display Form Title: location
     * Display Form ID: label.uscities.city.location
     */ Location: IAttribute;
};
/**
 * Attribute Title: Computed Attribute
 * Attribute ID: attr.comp.MUkNnlZ
 */
export declare const ComputedAttribute: IAttribute;
/**
 * Attribute Title: Cost Type
 * Attribute ID: attr.restaurantcostsfact.costtype
 */
export declare const CostType: IAttribute;
/**
 * Attribute Title: Employee Id
 * Attribute ID: attr.employee.employeeid
 */
export declare const EmployeeId: IAttribute;
/**
 * Attribute Title: Employee Name
 * Attribute ID: attr.employee.employeename
 */
export declare const EmployeeName: {
    /**
     * Display Form Title: Employee Name
     * Display Form ID: label.employee.employeename
     */
    Default: IAttribute;
    /**
     * Display Form Title: Employee URL
     * Display Form ID: label.employee.employeename.employeeurl
     */ EmployeeURL: IAttribute;
};
/**
 * Attribute Title: Is Kids Item?
 * Attribute ID: attr.menuitem.iskidsitem
 */
export declare const IsKidsItem: IAttribute;
/**
 * Attribute Title: Line Item Id
 * Attribute ID: attr.salesdetailfact.lineitemid
 */
export declare const LineItemId: IAttribute;
/**
 * Attribute Title: Location City
 * Attribute ID: attr.restaurantlocation.locationcity
 */
export declare const LocationCity: IAttribute;
/**
 * Attribute Title: Location Country
 * Attribute ID: attr.restaurantlocation.locationcountry
 */
export declare const LocationCountry: IAttribute;
/**
 * Attribute Title: Location Id
 * Attribute ID: attr.restaurantlocation.locationid
 */
export declare const LocationId: IAttribute;
/**
 * Attribute Title: Location Name
 * Attribute ID: attr.restaurantlocation.locationname
 */
export declare const LocationName: {
    /**
     * Display Form Title: Location Name
     * Display Form ID: label.restaurantlocation.locationname
     */
    Default: IAttribute;
    /**
     * Display Form Title: Location URL
     * Display Form ID: label.restaurantlocation.locationname.locationurl
     */ LocationURL: IAttribute;
};
/**
 * Attribute Title: Location Ownership
 * Attribute ID: attr.restaurantlocation.locationownership
 */
export declare const LocationOwnership: IAttribute;
/**
 * Attribute Title: Location Resort
 * Attribute ID: attr.restaurantlocation.locationresort
 */
export declare const LocationResort: IAttribute;
/**
 * Attribute Title: Location State
 * Attribute ID: attr.restaurantlocation.locationstate
 */
export declare const LocationState: IAttribute;
/**
 * Attribute Title: Menu Category
 * Attribute ID: attr.menuitem.menucategory
 */
export declare const MenuCategory: IAttribute;
/**
 * Attribute Title: Menu Item Id
 * Attribute ID: attr.menuitem.menuitemid
 */
export declare const MenuItemId: IAttribute;
/**
 * Attribute Title: Menu Item Name
 * Attribute ID: attr.menuitem.menuitemname
 */
export declare const MenuItemName: IAttribute;
/**
 * Attribute Title: Restaurant Category
 * Attribute ID: attr.restaurantprofile.restaurantcategory
 */
export declare const RestaurantCategory: IAttribute;
/**
 * Attribute Title: State Name
 * Attribute ID: attr.uscities.state_name
 */
export declare const StateName: IAttribute;
/**
 * Attribute Title: Time Zone
 * Attribute ID: attr.uscities.timezone
 */
export declare const TimeZone: IAttribute;
/**
 * Attribute Title: Transaction Id
 * Attribute ID: attr.salesdetailfact.transactionid
 */
export declare const TransactionId: IAttribute;
/**
 * Metric Title: _Filter Last 4 Quarter
 * Metric ID: aaIHiWZjfWNA
 * Metric Type: MAQL Metric
 */
export declare const FilterLast4Quarter: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: _Filter Quarter
 * Metric ID: aaiF4bffe4yn
 * Metric Type: MAQL Metric
 */
export declare const FilterQuarter: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: _TIMELINE Q
 * Metric ID: aaJF1ktqc10F
 * Metric Type: MAQL Metric
 */
export declare const TIMELINEQ: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: [AVG] Same Store Sales Growth MoM
 * Metric ID: aasApLbucFp0
 * Metric Type: MAQL Metric
 */
export declare const AVGSameStoreSalesGrowthMoM: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Checks
 * Metric ID: aeOt50ngicOD
 * Metric Type: MAQL Metric
 */
export declare const NrChecks: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Employees
 * Metric ID: aaTJSTfSaRBg
 * Metric Type: MAQL Metric
 */
export declare const NrEmployees: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Franchise Locations
 * Metric ID: ackJFayteCFG
 * Metric Type: MAQL Metric
 */
export declare const NrFranchiseLocations: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Items on Check
 * Metric ID: adFurWGrd2H8
 * Metric Type: MAQL Metric
 */
export declare const NrItemsOnCheck: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Location City
 * Metric ID: aafmUcxXd17M
 * Metric Type: MAQL Metric
 */
export declare const NrLocationCity: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Owned Locations
 * Metric ID: aaBJGIyWbxfO
 * Metric Type: MAQL Metric
 */
export declare const NrOwnedLocations: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: # Restaurants
 * Metric ID: aawAq8YqhM3o
 * Metric Type: MAQL Metric
 */
export declare const NrRestaurants: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: % Change $ Avg Total Sales
 * Metric ID: afxBqOrPc5Zh
 * Metric Type: MAQL Metric
 */
export declare const PercentChange$AvgTotalSales: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: % Change $ Avg Total Sales by Server
 * Metric ID: acMCYQZbbwJg
 * Metric Type: MAQL Metric
 */
export declare const PercentChange$AvgTotalSalesByServer: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: % of Entree on Total Check Size
 * Metric ID: aagurTlZd1Ul
 * Metric Type: MAQL Metric
 */
export declare const PercentOfEntreeOnTotalCheckSize: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Avg Check Size
 * Metric ID: agGujhRmcjQD
 * Metric Type: MAQL Metric
 */
export declare const $AvgCheckSize: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Avg Daily Total Sales
 * Metric ID: aagJGHg1bxap
 * Metric Type: MAQL Metric
 */
export declare const $AvgDailyTotalSales: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Avg Daily Total Sales by Server
 * Metric ID: aaAwXH5UfVBx
 * Metric Type: MAQL Metric
 */
export declare const $AvgDailyTotalSalesByServer: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Avg Daily Total Sales by Server - For Previous
 * Metric ID: aeiCXq43bzcl
 * Metric Type: MAQL Metric
 */
export declare const $AvgDailyTotalSalesByServerForPrevious: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Avg Restaurant Daily Total Sales
 * Metric ID: acEvQdUMiEAd
 * Metric Type: MAQL Metric
 */
export declare const $AvgRestaurantDailyTotalSales: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Avg Restaurant Daily Total Sales - For Previous
 * Metric ID: agbBoXF6haIe
 * Metric Type: MAQL Metric
 */
export declare const $AvgRestaurantDailyTotalSalesForPrevious: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Avg Total Sales by Restaurant
 * Metric ID: aaAHkMhRgp7S
 * Metric Type: MAQL Metric
 */
export declare const $AvgTotalSalesByRestaurant: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Entree of Total Check Size
 * Metric ID: aavuqQNNaDdc
 * Metric Type: MAQL Metric
 */
export declare const $EntreeOfTotalCheckSize: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Franchise Fees
 * Metric ID: aaEGaXAEgB7U
 * Metric Type: MAQL Metric
 */
export declare const $FranchiseFees: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Franchise Fees (Ad Royalty)
 * Metric ID: aabHeqImaK0d
 * Metric Type: MAQL Metric
 */
export declare const $FranchiseFeesAdRoyalty: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Franchise Fees (Initial Fee) Last Quarter Timeline
 * Metric ID: aayHf60BfkfS
 * Metric Type: MAQL Metric
 */
export declare const $FranchiseFeesInitialFeeLastQuarterTimeline: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Franchise Fees (Initial Franchise Fee)
 * Metric ID: aaDHcv6wevkl
 * Metric Type: MAQL Metric
 */
export declare const $FranchiseFeesInitialFranchiseFee: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Franchise Fees (Ongoing Royalty)
 * Metric ID: aaWGcgnsfxIg
 * Metric Type: MAQL Metric
 */
export declare const $FranchiseFeesOngoingRoyalty: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Franchise Fees (Ongoing Royalty) Last Quarter Timeline
 * Metric ID: aaeHf3Mofjir
 * Metric Type: MAQL Metric
 */
export declare const $FranchiseFeesOngoingRoyaltyLastQuarterTimeline: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Franchised Sales
 * Metric ID: aclF4oDIe5hP
 * Metric Type: MAQL Metric
 */
export declare const $FranchisedSales: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Gross Profit
 * Metric ID: aa5JBkFDa7sJ
 * Metric Type: MAQL Metric
 */
export declare const $GrossProfit: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Owned Sales
 * Metric ID: aaMF7AZGbALB
 * Metric Type: MAQL Metric
 */
export declare const $OwnedSales: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Owned Sales Last Quarter Timeline
 * Metric ID: abHF4LCfdNdt
 * Metric Type: MAQL Metric
 */
export declare const $OwnedSalesLastQuarterTimeline: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Scheduled Costs
 * Metric ID: aclJxvAlhCp0
 * Metric Type: MAQL Metric
 */
export declare const $ScheduledCosts: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Scheduled Labor Costs
 * Metric ID: aaGJzwrDdbfQ
 * Metric Type: MAQL Metric
 */
export declare const $ScheduledLaborCosts: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Check Value
 * Metric ID: aattxAMVg2YU
 * Metric Type: MAQL Metric
 */
export declare const $TotalCheckValue: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Costs
 * Metric ID: aaQHncjzfrtR
 * Metric Type: MAQL Metric
 */
export declare const $TotalCosts: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Costs - COGs
 * Metric ID: aafHpxx0f3gL
 * Metric Type: MAQL Metric
 */
export declare const $TotalCostsCOGs: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Costs - Labor
 * Metric ID: aamHpELXdotY
 * Metric Type: MAQL Metric
 */
export declare const $TotalCostsLabor: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Costs - Occupany
 * Metric ID: aagHqrJ6iAhD
 * Metric Type: MAQL Metric
 */
export declare const $TotalCostsOccupany: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Costs - Operating
 * Metric ID: aaeHqv2qhEE1
 * Metric Type: MAQL Metric
 */
export declare const $TotalCostsOperating: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Sales
 * Metric ID: aa7ulGyKhIE5
 * Metric Type: MAQL Metric
 */
export declare const $TotalSales: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: $ Total Sales Last Quarter Timeline
 * Metric ID: aajFRfDPaJrB
 * Metric Type: MAQL Metric
 */
export declare const $TotalSalesLastQuarterTimeline: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg # Checks
 * Metric ID: aakujkP2g68f
 * Metric Type: MAQL Metric
 */
export declare const AvgNrChecks: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg # Employees - Franchised
 * Metric ID: aciJJMmDfGYG
 * Metric Type: MAQL Metric
 */
export declare const AvgNrEmployeesFranchised: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg # Employees - Owned
 * Metric ID: abQJKPrmcvPv
 * Metric Type: MAQL Metric
 */
export declare const AvgNrEmployeesOwned: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg # Items on Check
 * Metric ID: adFurSoPaUaF
 * Metric Type: MAQL Metric
 */
export declare const AvgNrItemsOnCheck: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg # Items on Check By Server
 * Metric ID: aaKwQwBIg1WY
 * Metric Type: MAQL Metric
 */
export declare const AvgNrItemsOnCheckByServer: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg % of Entree on Total Check size
 * Metric ID: adQvRqlFawrq
 * Metric Type: MAQL Metric
 */
export declare const AvgPercentOfEntreeOnTotalCheckSize: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg Check Size by Restaurant
 * Metric ID: abmxly1WgN0A
 * Metric Type: MAQL Metric
 */
export declare const AvgCheckSizeByRestaurant: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg Check Size by Server
 * Metric ID: afewRzGAersh
 * Metric Type: MAQL Metric
 */
export declare const AvgCheckSizeByServer: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg Daily # Checks by Restaurant
 * Metric ID: aaKvTDSga0Qc
 * Metric Type: MAQL Metric
 */
export declare const AvgDailyNrChecksByRestaurant: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg Daily # of Check by Server
 * Metric ID: afgwRbw8ekwA
 * Metric Type: MAQL Metric
 */
export declare const AvgDailyNrOfCheckByServer: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg Entree % By Restaurant
 * Metric ID: afQHUg8AfYdl
 * Metric Type: MAQL Metric
 */
export declare const AvgEntreePercentByRestaurant: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Avg Entree % By Server
 * Metric ID: aexwEtn0eHwB
 * Metric Type: MAQL Metric
 */
export declare const AvgEntreePercentByServer: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Franchise Fee (Initial Fee) % Change
 * Metric ID: aabHgIqabggQ
 * Metric Type: MAQL Metric
 */
export declare const FranchiseFeeInitialFeePercentChange: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Franchise Fee (Ongoing Royalty) % Change
 * Metric ID: aacHgvmIfZOX
 * Metric Type: MAQL Metric
 */
export declare const FranchiseFeeOngoingRoyaltyPercentChange: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Gross Profit %
 * Metric ID: abBJBoqTe5IH
 * Metric Type: MAQL Metric
 */
export declare const GrossProfitPercent: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Owned Sales % Change
 * Metric ID: aacF8F2Me67e
 * Metric Type: MAQL Metric
 */
export declare const OwnedSalesPercentChange: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Same Store Sales
 * Metric ID: aaXAnw7hcbFY
 * Metric Type: MAQL Metric
 */
export declare const SameStoreSales: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Same Store Sales MoM Growth
 * Metric ID: aciAmeQCfGmo
 * Metric Type: MAQL Metric
 */
export declare const SameStoreSalesMoMGrowth: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Same Store Sales Previous Month
 * Metric ID: aagAoGqjcuCZ
 * Metric Type: MAQL Metric
 */
export declare const SameStoreSalesPreviousMonth: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Total # Franchised Employees
 * Metric ID: afrJGKajgogi
 * Metric Type: MAQL Metric
 */
export declare const TotalNrFranchisedEmployees: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Total # Owned Employees
 * Metric ID: aazJLFHCdCBh
 * Metric Type: MAQL Metric
 */
export declare const TotalNrOwnedEmployees: IMeasure<IMeasureDefinition>;
/**
 * Metric Title: Total Sales % Change
 * Metric ID: abhFQRhibZKx
 * Metric Type: MAQL Metric
 */
export declare const TotalSalesPercentChange: IMeasure<IMeasureDefinition>;
/**
 * Fact Title: $ Menu Item Sales
 * Fact ID: fact.salesdetailfact.menuitemsales
 */
export declare const $MenuItemSales: {
    /**
     * Fact Title: $ Menu Item Sales
     * Fact ID: fact.salesdetailfact.menuitemsales
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: $ Menu Item Sales
     * Fact ID: fact.salesdetailfact.menuitemsales
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: $ Menu Item Sales
     * Fact ID: fact.salesdetailfact.menuitemsales
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: $ Menu Item Sales
     * Fact ID: fact.salesdetailfact.menuitemsales
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: $ Menu Item Sales
     * Fact ID: fact.salesdetailfact.menuitemsales
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: $ Menu Item Sales
     * Fact ID: fact.salesdetailfact.menuitemsales
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Cost
 * Fact ID: fact.restaurantcostsfact.cost
 */
export declare const Cost: {
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Density
 * Fact ID: fact.uscities.density
 */
export declare const Density: {
    /**
     * Fact Title: Density
     * Fact ID: fact.uscities.density
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Density
     * Fact ID: fact.uscities.density
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Density
     * Fact ID: fact.uscities.density
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Density
     * Fact ID: fact.uscities.density
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Density
     * Fact ID: fact.uscities.density
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Density
     * Fact ID: fact.uscities.density
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Menu Item Quantity
 * Fact ID: fact.salesdetailfact.menuitemquantity
 */
export declare const MenuItemQuantity: {
    /**
     * Fact Title: Menu Item Quantity
     * Fact ID: fact.salesdetailfact.menuitemquantity
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Menu Item Quantity
     * Fact ID: fact.salesdetailfact.menuitemquantity
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Menu Item Quantity
     * Fact ID: fact.salesdetailfact.menuitemquantity
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Menu Item Quantity
     * Fact ID: fact.salesdetailfact.menuitemquantity
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Menu Item Quantity
     * Fact ID: fact.salesdetailfact.menuitemquantity
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Menu Item Quantity
     * Fact ID: fact.salesdetailfact.menuitemquantity
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Population
 * Fact ID: fact.uscities.population
 */
export declare const Population: {
    /**
     * Fact Title: Population
     * Fact ID: fact.uscities.population
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Population
     * Fact ID: fact.uscities.population
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Population
     * Fact ID: fact.uscities.population
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Population
     * Fact ID: fact.uscities.population
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Population
     * Fact ID: fact.uscities.population
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Population
     * Fact ID: fact.uscities.population
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/**
 * Fact Title: Scheduled Cost
 * Fact ID: fact.restaurantcostsfact.scheduledcost
 */
export declare const ScheduledCost: {
    /**
     * Fact Title: Scheduled Cost
     * Fact ID: fact.restaurantcostsfact.scheduledcost
     * Fact Aggregation: sum
     */
    Sum: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Scheduled Cost
     * Fact ID: fact.restaurantcostsfact.scheduledcost
     * Fact Aggregation: avg
     */ Avg: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Scheduled Cost
     * Fact ID: fact.restaurantcostsfact.scheduledcost
     * Fact Aggregation: min
     */ Min: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Scheduled Cost
     * Fact ID: fact.restaurantcostsfact.scheduledcost
     * Fact Aggregation: max
     */ Max: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Scheduled Cost
     * Fact ID: fact.restaurantcostsfact.scheduledcost
     * Fact Aggregation: median
     */ Median: IMeasure<IMeasureDefinition>;
    /**
     * Fact Title: Scheduled Cost
     * Fact ID: fact.restaurantcostsfact.scheduledcost
     * Fact Aggregation: runsum
     */ Runsum: IMeasure<IMeasureDefinition>;
};
/** Available Date Data Sets */
export declare const DateDatasets: {
    /**
     * Date Data Set Title: Date (Date)
     * Date Data Set ID: date.dataset.dt
     */
    Date: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Date)
         * Date Attribute ID: date.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Date)
             * Display Form ID: date.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Date)
         * Date Attribute ID: date.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date)
             * Display Form ID: date.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Date)
         * Date Attribute ID: date.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date)
             * Display Form ID: date.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date)
             * Display Form ID: date.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date)
             * Display Form ID: date.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Date)
             * Display Form ID: date.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Date)
             * Display Form ID: date.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Date)
             * Display Form ID: date.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Date)
         * Date Attribute ID: date.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date)
             * Display Form ID: date.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Date)
         * Date Attribute ID: date.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date)
             * Display Form ID: date.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Date)
         * Date Attribute ID: date.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date)
             * Display Form ID: date.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date)
             * Display Form ID: date.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date)
             * Display Form ID: date.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Date)
         * Date Attribute ID: date.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date)
             * Display Form ID: date.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Date)
         * Date Attribute ID: date.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date)
             * Display Form ID: date.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Date)
         * Date Attribute ID: date.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Date)
             * Display Form ID: date.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Date)
             * Display Form ID: date.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Date)
             * Display Form ID: date.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Date)
             * Display Form ID: date.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Date)
         * Date Attribute ID: date.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Date)
             * Display Form ID: date.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Date)
         * Date Attribute ID: date.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date)
             * Display Form ID: date.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Date)
         * Date Attribute ID: date.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Date)
             * Display Form ID: date.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Date)
             * Display Form ID: date.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Date)
             * Display Form ID: date.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Date)
         * Date Attribute ID: date.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Date)
             * Display Form ID: date.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Date)
             * Display Form ID: date.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Date)
             * Display Form ID: date.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Date)
         * Date Attribute ID: date.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date)
             * Display Form ID: date.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Date)
         * Date Attribute ID: date.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date)
             * Display Form ID: date.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Date)
         * Date Attribute ID: date.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Date)
             * Display Form ID: date.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Date)
         * Date Attribute ID: date.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Date)
             * Display Form ID: date.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Date)
             * Display Form ID: date.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Date)
             * Display Form ID: date.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Date)
         * Date Attribute ID: date.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Date)
             * Display Form ID: date.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Date)
             * Display Form ID: date.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Date)
             * Display Form ID: date.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Date)
             * Display Form ID: date.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Date)
             * Display Form ID: date.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Date)
             * Display Form ID: date.date.eddmmyyyy
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
    /**
     * Date Data Set Title: Date (Fiscal Date)
     * Date Data Set ID: fiscaldate.fiscaljun1_dataset.dt
     */ FiscalDate: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Fiscal Date)
         * Date Attribute ID: fiscaldate.fiscaljun1_date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Fiscal Date)
             * Display Form ID: fiscaldate.fiscaljun1_date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Date 1)
     * Date Data Set ID: date_1.dataset.dt
     */ Date1: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Date 1)
         * Date Attribute ID: date_1.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Date 1)
             * Display Form ID: date_1.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Date 1)
         * Date Attribute ID: date_1.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 1)
             * Display Form ID: date_1.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Date 1)
         * Date Attribute ID: date_1.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 1)
             * Display Form ID: date_1.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 1)
             * Display Form ID: date_1.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 1)
             * Display Form ID: date_1.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Date 1)
             * Display Form ID: date_1.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Date 1)
             * Display Form ID: date_1.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Date 1)
             * Display Form ID: date_1.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Date 1)
         * Date Attribute ID: date_1.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 1)
             * Display Form ID: date_1.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Date 1)
         * Date Attribute ID: date_1.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 1)
             * Display Form ID: date_1.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Date 1)
         * Date Attribute ID: date_1.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 1)
             * Display Form ID: date_1.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 1)
             * Display Form ID: date_1.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 1)
             * Display Form ID: date_1.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Date 1)
         * Date Attribute ID: date_1.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 1)
             * Display Form ID: date_1.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Date 1)
         * Date Attribute ID: date_1.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 1)
             * Display Form ID: date_1.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Date 1)
         * Date Attribute ID: date_1.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Date 1)
             * Display Form ID: date_1.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Date 1)
             * Display Form ID: date_1.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Date 1)
             * Display Form ID: date_1.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Date 1)
             * Display Form ID: date_1.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Date 1)
         * Date Attribute ID: date_1.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Date 1)
             * Display Form ID: date_1.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Date 1)
         * Date Attribute ID: date_1.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 1)
             * Display Form ID: date_1.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Date 1)
         * Date Attribute ID: date_1.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Date 1)
             * Display Form ID: date_1.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Date 1)
             * Display Form ID: date_1.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Date 1)
             * Display Form ID: date_1.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Date 1)
         * Date Attribute ID: date_1.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Date 1)
             * Display Form ID: date_1.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Date 1)
             * Display Form ID: date_1.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Date 1)
             * Display Form ID: date_1.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Date 1)
         * Date Attribute ID: date_1.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 1)
             * Display Form ID: date_1.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Date 1)
         * Date Attribute ID: date_1.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 1)
             * Display Form ID: date_1.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Date 1)
         * Date Attribute ID: date_1.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Date 1)
             * Display Form ID: date_1.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Date 1)
         * Date Attribute ID: date_1.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Date 1)
             * Display Form ID: date_1.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Date 1)
             * Display Form ID: date_1.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Date 1)
             * Display Form ID: date_1.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Date 1)
         * Date Attribute ID: date_1.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Date 1)
             * Display Form ID: date_1.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Date 1)
             * Display Form ID: date_1.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Date 1)
             * Display Form ID: date_1.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Date 1)
             * Display Form ID: date_1.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Date 1)
             * Display Form ID: date_1.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Date 1)
             * Display Form ID: date_1.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Date 2)
     * Date Data Set ID: date_2.dataset.dt
     */ Date2: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Date 2)
         * Date Attribute ID: date_2.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Date 2)
             * Display Form ID: date_2.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Date 2)
         * Date Attribute ID: date_2.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 2)
             * Display Form ID: date_2.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Date 2)
         * Date Attribute ID: date_2.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 2)
             * Display Form ID: date_2.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 2)
             * Display Form ID: date_2.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 2)
             * Display Form ID: date_2.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Date 2)
             * Display Form ID: date_2.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Date 2)
             * Display Form ID: date_2.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Date 2)
             * Display Form ID: date_2.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Date 2)
         * Date Attribute ID: date_2.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 2)
             * Display Form ID: date_2.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Date 2)
         * Date Attribute ID: date_2.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 2)
             * Display Form ID: date_2.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Date 2)
         * Date Attribute ID: date_2.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 2)
             * Display Form ID: date_2.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 2)
             * Display Form ID: date_2.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 2)
             * Display Form ID: date_2.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Date 2)
         * Date Attribute ID: date_2.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 2)
             * Display Form ID: date_2.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Date 2)
         * Date Attribute ID: date_2.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 2)
             * Display Form ID: date_2.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Date 2)
         * Date Attribute ID: date_2.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Date 2)
             * Display Form ID: date_2.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Date 2)
             * Display Form ID: date_2.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Date 2)
             * Display Form ID: date_2.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Date 2)
             * Display Form ID: date_2.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Date 2)
         * Date Attribute ID: date_2.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Date 2)
             * Display Form ID: date_2.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Date 2)
         * Date Attribute ID: date_2.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 2)
             * Display Form ID: date_2.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Date 2)
         * Date Attribute ID: date_2.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Date 2)
             * Display Form ID: date_2.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Date 2)
             * Display Form ID: date_2.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Date 2)
             * Display Form ID: date_2.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Date 2)
         * Date Attribute ID: date_2.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Date 2)
             * Display Form ID: date_2.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Date 2)
             * Display Form ID: date_2.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Date 2)
             * Display Form ID: date_2.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Date 2)
         * Date Attribute ID: date_2.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 2)
             * Display Form ID: date_2.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Date 2)
         * Date Attribute ID: date_2.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 2)
             * Display Form ID: date_2.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Date 2)
         * Date Attribute ID: date_2.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Date 2)
             * Display Form ID: date_2.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Date 2)
         * Date Attribute ID: date_2.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Date 2)
             * Display Form ID: date_2.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Date 2)
             * Display Form ID: date_2.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Date 2)
             * Display Form ID: date_2.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Date 2)
         * Date Attribute ID: date_2.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Date 2)
             * Display Form ID: date_2.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Date 2)
             * Display Form ID: date_2.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Date 2)
             * Display Form ID: date_2.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Date 2)
             * Display Form ID: date_2.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Date 2)
             * Display Form ID: date_2.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Date 2)
             * Display Form ID: date_2.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Date 3)
     * Date Data Set ID: date_3.dataset.dt
     */ Date3: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Date 3)
         * Date Attribute ID: date_3.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Date 3)
             * Display Form ID: date_3.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Date 3)
         * Date Attribute ID: date_3.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 3)
             * Display Form ID: date_3.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Date 3)
         * Date Attribute ID: date_3.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 3)
             * Display Form ID: date_3.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 3)
             * Display Form ID: date_3.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 3)
             * Display Form ID: date_3.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Date 3)
             * Display Form ID: date_3.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Date 3)
             * Display Form ID: date_3.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Date 3)
             * Display Form ID: date_3.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Date 3)
         * Date Attribute ID: date_3.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 3)
             * Display Form ID: date_3.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Date 3)
         * Date Attribute ID: date_3.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 3)
             * Display Form ID: date_3.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Date 3)
         * Date Attribute ID: date_3.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 3)
             * Display Form ID: date_3.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 3)
             * Display Form ID: date_3.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 3)
             * Display Form ID: date_3.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Date 3)
         * Date Attribute ID: date_3.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 3)
             * Display Form ID: date_3.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Date 3)
         * Date Attribute ID: date_3.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 3)
             * Display Form ID: date_3.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Date 3)
         * Date Attribute ID: date_3.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Date 3)
             * Display Form ID: date_3.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Date 3)
             * Display Form ID: date_3.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Date 3)
             * Display Form ID: date_3.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Date 3)
             * Display Form ID: date_3.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Date 3)
         * Date Attribute ID: date_3.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Date 3)
             * Display Form ID: date_3.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Date 3)
         * Date Attribute ID: date_3.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 3)
             * Display Form ID: date_3.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Date 3)
         * Date Attribute ID: date_3.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Date 3)
             * Display Form ID: date_3.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Date 3)
             * Display Form ID: date_3.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Date 3)
             * Display Form ID: date_3.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Date 3)
         * Date Attribute ID: date_3.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Date 3)
             * Display Form ID: date_3.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Date 3)
             * Display Form ID: date_3.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Date 3)
             * Display Form ID: date_3.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Date 3)
         * Date Attribute ID: date_3.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 3)
             * Display Form ID: date_3.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Date 3)
         * Date Attribute ID: date_3.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 3)
             * Display Form ID: date_3.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Date 3)
         * Date Attribute ID: date_3.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Date 3)
             * Display Form ID: date_3.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Date 3)
         * Date Attribute ID: date_3.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Date 3)
             * Display Form ID: date_3.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Date 3)
             * Display Form ID: date_3.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Date 3)
             * Display Form ID: date_3.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Date 3)
         * Date Attribute ID: date_3.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Date 3)
             * Display Form ID: date_3.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Date 3)
             * Display Form ID: date_3.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Date 3)
             * Display Form ID: date_3.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Date 3)
             * Display Form ID: date_3.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Date 3)
             * Display Form ID: date_3.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Date 3)
             * Display Form ID: date_3.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
    /**
     * Date Data Set Title: Date (Date 4)
     * Date Data Set ID: date_4.dataset.dt
     */ Date4: {
        ref: import("@gooddata/sdk-model").IdentifierRef;
        identifier: string;
        /**
         * Date Attribute: Year (Date 4)
         * Date Attribute ID: date_4.year
         */ Year: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Year (Date 4)
             * Display Form ID: date_4.aag81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter (Date 4)
         * Date Attribute ID: date_4.quarter.in.year
         */ Quarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 4)
             * Display Form ID: date_4.aam81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat)/Year (Date 4)
         * Date Attribute ID: date_4.week
         */ WeekSunSatYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 4)
             * Display Form ID: date_4.aaA81lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 4)
             * Display Form ID: date_4.aaw81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 4)
             * Display Form ID: date_4.aau81lMifn6q
             */ FromTo: IAttribute;
            /**
             * Display Form Title: Week #/Year (Cont.) (Date 4)
             * Display Form ID: date_4.aay81lMifn6q
             */ WeekNrYear_1: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Cont.) (Date 4)
             * Display Form ID: date_4.aaC81lMifn6q
             */ WkQtrYear: IAttribute;
            /**
             * Display Form Title: Wk/Qtr/Year (Date 4)
             * Display Form ID: date_4.aas81lMifn6q
             */ WkQtrYear_1: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) (Date 4)
         * Date Attribute ID: date_4.week.in.year
         */ WeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 4)
             * Display Form ID: date_4.aaI81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Sun-Sat) of Qtr (Date 4)
         * Date Attribute ID: date_4.week.in.quarter
         */ WeekSunSatOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number US (Date 4)
             * Display Form ID: date_4.aaO81lMifn6q
             */ NumberUS: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun)/Year (Date 4)
         * Date Attribute ID: date_4.euweek
         */ WeekMonSunYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Week #/Year (W1/2010) (Date 4)
             * Display Form ID: date_4.aa281lMifn6q
             */ WeekNrYear: IAttribute;
            /**
             * Display Form Title: Week Starting (Date 4)
             * Display Form ID: date_4.aaY81lMifn6q
             */ WeekStarting: IAttribute;
            /**
             * Display Form Title: From - To (Date 4)
             * Display Form ID: date_4.aaW81lMifn6q
             */ FromTo: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) (Date 4)
         * Date Attribute ID: date_4.euweek.in.year
         */ WeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 4)
             * Display Form ID: date_4.aba81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Week (Mon-Sun) of Qtr (Date 4)
         * Date Attribute ID: date_4.euweek.in.quarter
         */ WeekMonSunOfQtr: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number EU (Date 4)
             * Display Form ID: date_4.abg81lMifn6q
             */ NumberEU: IAttribute;
        };
        /**
         * Date Attribute: Month (Date 4)
         * Date Attribute ID: date_4.month.in.year
         */ Month: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan) (Date 4)
             * Display Form ID: date_4.abm81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January) (Date 4)
             * Display Form ID: date_4.abs81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (M1) (Date 4)
             * Display Form ID: date_4.abq81lMifn6q
             */ Number: IAttribute;
            /**
             * Display Form Title: M/Q (M1/Q1) (Date 4)
             * Display Form ID: date_4.abo81lMifn6q
             */ MQ: IAttribute;
        };
        /**
         * Date Attribute: Month of Quarter (Date 4)
         * Date Attribute ID: date_4.month.in.quarter
         */ MonthOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Number (Date 4)
             * Display Form ID: date_4.aby81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Year (Date 4)
         * Date Attribute ID: date_4.day.in.year
         */ DayOfYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 4)
             * Display Form ID: date_4.abE81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Sun-Sat) (Date 4)
         * Date Attribute ID: date_4.day.in.week
         */ DayOfWeekSunSat: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Sun) (Date 4)
             * Display Form ID: date_4.abK81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Sunday) (Date 4)
             * Display Form ID: date_4.abO81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Sunday) (Date 4)
             * Display Form ID: date_4.abM81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Week (Mon-Sun) (Date 4)
         * Date Attribute ID: date_4.day.in.euweek
         */ DayOfWeekMonSun: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Mon) (Date 4)
             * Display Form ID: date_4.abU81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (Monday) (Date 4)
             * Display Form ID: date_4.abY81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1=Monday) (Date 4)
             * Display Form ID: date_4.abW81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Day of Quarter (Date 4)
         * Date Attribute ID: date_4.day.in.quarter
         */ DayOfQuarter: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 4)
             * Display Form ID: date_4.ab481lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Day of Month (Date 4)
         * Date Attribute ID: date_4.day.in.month
         */ DayOfMonth: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: default (Date 4)
             * Display Form ID: date_4.aca81lMifn6q
             */ Default: IAttribute;
        };
        /**
         * Date Attribute: Quarter/Year (Date 4)
         * Date Attribute ID: date_4.quarter
         */ QuarterYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: US Short (Date 4)
             * Display Form ID: date_4.aci81lMifn6q
             */ USShort: IAttribute;
        };
        /**
         * Date Attribute: Month/Year (Date 4)
         * Date Attribute ID: date_4.month
         */ MonthYear: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: Short (Jan 2010) (Date 4)
             * Display Form ID: date_4.act81lMifn6q
             */ Short: IAttribute;
            /**
             * Display Form Title: Long (January 2010) (Date 4)
             * Display Form ID: date_4.acx81lMifn6q
             */ Long: IAttribute;
            /**
             * Display Form Title: Number (1/2010) (Date 4)
             * Display Form ID: date_4.acv81lMifn6q
             */ Number: IAttribute;
        };
        /**
         * Date Attribute: Date (Date 4)
         * Date Attribute ID: date_4.date
         */ Date: {
            ref: import("@gooddata/sdk-model").IdentifierRef;
            identifier: string;
            /**
             * Display Form Title: mm/dd/yyyy (Date 4)
             * Display Form ID: date_4.date.mmddyyyy
             */ MmDdYyyy: IAttribute;
            /**
             * Display Form Title: yyyy-mm-dd (Date 4)
             * Display Form ID: date_4.date.yyyymmdd
             */ YyyyMmDd: IAttribute;
            /**
             * Display Form Title: m/d/yy (no leading zeroes) (Date 4)
             * Display Form ID: date_4.date.mdyy
             */ MDYy: IAttribute;
            /**
             * Display Form Title: Long (Mon, Jan 1, 2010) (Date 4)
             * Display Form ID: date_4.date.long
             */ Long: IAttribute;
            /**
             * Display Form Title: dd/mm/yyyy (Date 4)
             * Display Form ID: date_4.date.ddmmyyyy
             */ DdMmYyyy: IAttribute;
            /**
             * Display Form Title: dd-mm-yyyy (Date 4)
             * Display Form ID: date_4.date.eddmmyyyy
             */ DdMmYyyy_1: IAttribute;
        };
    };
};
export declare const Insights: {
    /**
     * Insight Title: Avg Entree %
     * Insight ID: abHVSjwFgk4i
     */
    AvgEntreePercent: string;
    /**
     * Insight Title: Total Sales by City
     * Insight ID: acPWDTL2bJeX
     */ TotalSalesByCity: string;
    /**
     * Insight Title: Total Sales by Location Last Quarter
     * Insight ID: abmeiDsUhTNW
     */ TotalSalesByLocationLastQuarter: string;
    /**
     * Insight Title: Total Sales by Week
     * Insight ID: aeSCEMsTfoj8
     */ TotalSalesByWeek: string;
    /**
     * Insight Title: $ Check Value by Trx
     * Insight ID: aa7N3HExdhKw
     */ $CheckValueByTrx: string;
    /**
     * Insight Title: $ Total Sales by Location
     * Insight ID: aaBN5UG3dXu4
     */ $TotalSalesByLocation: string;
    /**
     * Insight Title: Sales over Time
     * Insight ID: acFJltTsifSQ
     */ SalesOverTime: string;
    /**
     * Insight Title: Costs over Time
     * Insight ID: abHJmzD1fZrW
     */ CostsOverTime: string;
    /**
     * Insight Title: Labor Costs vs Scheduled Costs
     * Insight ID: abhJpedgcfU2
     */ LaborCostsVsScheduledCosts: string;
    /**
     * Insight Title: Gross profit % (date filters)
     * Insight ID: acOfuc2QiDZK
     */ GrossProfitPercentDateFilters: string;
    /**
     * Insight Title: Table report Labor Costs Vs Scheduled Costs
     * Insight ID: aatFRvXBdilm
     */ TableReportLaborCostsVsScheduledCosts: string;
    /**
     * Insight Title: Franchise Fees
     * Insight ID: aahnVeLugyFj
     */ FranchiseFees: string;
    /**
     * Insight Title: Franchise Fees 2017
     * Insight ID: aaZWa46oh9cJ
     */ FranchiseFees2017: string;
    /**
     * Insight Title: Too many datapoints
     * Insight ID: afgeutl8hfOe
     */ TooManyDatapoints: string;
    /**
     * Insight Title: Test
     * Insight ID: ab6KtJ2LfmCV
     */ Test: string;
    /**
     * Insight Title: 123
     * Insight ID: ab3KtvTggKY5
     */ _123: string;
    /**
     * Insight Title: asdf
     * Insight ID: aepRx0i8haM7
     */ Asdf: string;
    /**
     * Insight Title: too many data points
     * Insight ID: adzkfjmWiajP
     */ TooManyDataPoints: string;
    /**
     * Insight Title: test-pzb
     * Insight ID: aa0wmZDugnUX
     */ TestPzb: string;
    /**
     * Insight Title: # Checks Viewed By City Stacked By Location
     * Insight ID: aby6oS6DbpFX
     */ NrChecksViewedByCityStackedByLocation: string;
    /**
     * Insight Title: Kyle's Insight
     * Insight ID: aazlme4wcy3O
     */ KyleSInsight: string;
    /**
     * Insight Title: Gross Profit by location
     * Insight ID: ad4lhli5dn5v
     */ GrossProfitByLocation: string;
    /**
     * Insight Title: ui-example-1
     * Insight ID: aasloSSGgcAs
     */ UiExample1: string;
    /**
     * Insight Title: DanielsFirstKPI
     * Insight ID: aaHloqmuf0Ea
     */ DanielsFirstKPI: string;
    /**
     * Insight Title: states
     * Insight ID: aayloZPWhziV
     */ States: string;
    /**
     * Insight Title: Jakub's visualisation
     * Insight ID: abNloeB7iy4S
     */ JakubSVisualisation: string;
    /**
     * Insight Title: sdf_restrant_per_city
     * Insight ID: aamlpUW9d6gc
     */ SdfRestrantPerCity: string;
    /**
     * Insight Title: fargo
     * Insight ID: acyllEgrhybI
     */ Fargo: string;
    /**
     * Insight Title: new_test
     * Insight ID: aeHmbn7Ciok6
     */ NewTest: string;
    /**
     * Insight Title: Zajícův insight 2
     * Insight ID: abgprmHgf3uq
     */ ZajicuvInsight2: string;
    /**
     * Insight Title: previousPeriod
     * Insight ID: aaMNtrdagrFW
     */ PreviousPeriod: string;
    /**
     * Insight Title: Table to Pivot
     * Insight ID: aaYPSrp3bqyQ
     */ TableToPivot: string;
    /**
     * Insight Title: Table to Pivot #2
     * Insight ID: aaRUKANgdCex
     */ TableToPivotNr2: string;
    /**
     * Insight Title: Table to Pivot #3
     * Insight ID: abdUSeYRfG4P
     */ TableToPivotNr3: string;
    /**
     * Insight Title: Bubble Chart
     * Insight ID: aa6D2HhshWHB
     */ BubbleChart: string;
    /**
     * Insight Title: hackathon
     * Insight ID: abxJEfZhfOk9
     */ Hackathon: string;
    /**
     * Insight Title: pie2
     * Insight ID: abcJGKsFhpp5
     */ Pie2: string;
    /**
     * Insight Title: Column Chart
     * Insight ID: acKLst3Faran
     */ ColumnChart: string;
    /**
     * Insight Title: Dummy chart
     * Insight ID: abw8Uco2cT1B
     */ DummyChart: string;
    /**
     * Insight Title: test insight 1
     * Insight ID: ab68UlSRcNcP
     */ TestInsight1: string;
    /**
     * Insight Title: Pivot test
     * Insight ID: abIFNtySe2mv
     */ PivotTest: string;
    /**
     * Insight Title: Table Without Measure
     * Insight ID: act2Khypdnz6
     */ TableWithoutMeasure: string;
    /**
     * Insight Title: asdfasdf
     * Insight ID: ab7CymgRcuDx
     */ Asdfasdf: string;
    /**
     * Insight Title: PivotTable sort over column attribute TEST
     * Insight ID: ackXHPqtheSt
     */ PivotTableSortOverColumnAttributeTEST: string;
    /**
     * Insight Title: Table Totals test
     * Insight ID: abS3P51kcXLN
     */ TableTotalsTest: string;
    /**
     * Insight Title: scatter example x
     * Insight ID: aaIfYMhViEjv
     */ ScatterExampleX: string;
    /**
     * Insight Title: xxx
     * Insight ID: abtwQrxcfOvC
     */ Xxx: string;
    /**
     * Insight Title: Line Chart
     * Insight ID: aaAaDFt4c1yC
     */ LineChart: string;
    /**
     * Insight Title: Scatter Chart
     * Insight ID: ab4aHg6lej5e
     */ ScatterChart: string;
    /**
     * Insight Title: Area Chart
     * Insight ID: acCaGDIrc1iU
     */ AreaChart: string;
    /**
     * Insight Title: Headline Chart
     * Insight ID: aaiaOcMqbyMj
     */ HeadlineChart: string;
    /**
     * Insight Title: Bubble Chart
     * Insight ID: abNaJG2Aed2M
     */ BubbleChart_1: string;
    /**
     * Insight Title: Pie Chart
     * Insight ID: aaraOcrmdjZd
     */ PieChart: string;
    /**
     * Insight Title: Donut Chart
     * Insight ID: absaJEALgcdO
     */ DonutChart: string;
    /**
     * Insight Title: Treemap Chart
     * Insight ID: aajaObFleXdD
     */ TreemapChart: string;
    /**
     * Insight Title: Heatmap Chart
     * Insight ID: abkaJfMYiiCU
     */ HeatmapChart: string;
    /**
     * Insight Title: Bar Chart
     * Insight ID: aaKaMZUJeyGo
     */ BarChart: string;
    /**
     * Insight Title: yxcv
     * Insight ID: acGEkojJhJdr
     */ Yxcv: string;
    /**
     * Insight Title: ColumnsChart
     * Insight ID: aabOspdLbbvs
     */ ColumnsChart: string;
    /**
     * Insight Title: # Checks by Quarter, State
     * Insight ID: aaW7hwvlfq8Q
     */ NrChecksByQuarterState: string;
    /**
     * Insight Title: e
     * Insight ID: ab3sK1TAhDEl
     */ E: string;
    /**
     * Insight Title: TOTVS Table
     * Insight ID: aesum6Klg3Pg
     */ TOTVSTable: string;
    /**
     * Insight Title: tesst date year
     * Insight ID: aa37yWEJaZgJ
     */ TesstDateYear: string;
    /**
     * Insight Title: pivotka
     * Insight ID: abOGucCbbjYU
     */ Pivotka: string;
    /**
     * Insight Title: PivotTable with no filters
     * Insight ID: abEGARwMcKcp
     */ PivotTableWithNoFilters: string;
    /**
     * Insight Title: TOTVS Table #2
     * Insight ID: aattqR1TePqz
     */ TOTVSTableNr2: string;
    /**
     * Insight Title: tetsssss1
     * Insight ID: abr6SUUDg4J3
     */ Tetsssss1: string;
    /**
     * Insight Title: coreui-react
     * Insight ID: aaSMTErxgsQZ
     */ CoreuiReact: string;
    /**
     * Insight Title: JZA Treemap
     * Insight ID: aaGJHukYh43y
     */ JZATreemap: string;
    /**
     * Insight Title: JZA Combo
     * Insight ID: aaTJJW6adsaj
     */ JZACombo: string;
    /**
     * Insight Title: JZA Pivot Example
     * Insight ID: aaVk0eDhiiyr
     */ JZAPivotExample: string;
    /**
     * Insight Title: Dual Axis Bar Chart
     * Insight ID: acSoPx4Mc7Rr
     */ DualAxisBarChart: string;
    /**
     * Insight Title: Checks by year
     * Insight ID: accyE4bMhKhb
     */ ChecksByYear: string;
    /**
     * Insight Title: Checks by State
     * Insight ID: ad0CPFd0eIAV
     */ ChecksByState: string;
    /**
     * Insight Title: DEL
     * Insight ID: aaXC6TWlfQTa
     */ DEL: string;
    /**
     * Insight Title: DEL
     * Insight ID: aagDshJTagXX
     */ DEL_1: string;
    /**
     * Insight Title: Long Table
     * Insight ID: aaDKNE91d2wl
     */ LongTable: string;
    /**
     * Insight Title: test
     * Insight ID: abg7q7o6dYNx
     */ Test_1: string;
    /**
     * Insight Title: DHO-test
     * Insight ID: abtZxLkZfrFD
     */ DHOTest: string;
    /**
     * Insight Title: KPI
     * Insight ID: aa5gPlRleK93
     */ KPI: string;
    /**
     * Insight Title: PVA
     * Insight ID: abCiWPjZbXVS
     */ PVA: string;
    /**
     * Insight Title: PVA 2
     * Insight ID: aaCi3GfNaV6Y
     */ PVA2: string;
    /**
     * Insight Title: Table
     * Insight ID: aaimzjiVfWkM
     */ Table: string;
    /**
     * Insight Title: Test Chart #1
     * Insight ID: aa4ESTLYiu6X
     */ TestChartNr1: string;
    /**
     * Insight Title: Table
     * Insight ID: acN7DuCPiDoh
     */ Table_1: string;
    /**
     * Insight Title: Chart #1
     * Insight ID: admoLzGrddbk
     */ ChartNr1: string;
    /**
     * Insight Title: geoPushpinChart
     * Insight ID: acebcI3fhaRI
     */ GeoPushpinChart: string;
    /**
     * Insight Title: bullet
     * Insight ID: aaQxY4PLbBsQ
     */ Bullet: string;
    /**
     * Insight Title: Measure Value Filter Column Chart
     * Insight ID: aapcLmQzeIAz
     */ MeasureValueFilterColumnChart: string;
    /**
     * Insight Title: Measure Value Filter treat null values as 0
     * Insight ID: ab8GBmYngtMa
     */ MeasureValueFilterTreatNullValuesAs0: string;
    /**
     * Insight Title: VisualBI #1
     * Insight ID: aazG5vCZbY25
     */ VisualBINr1: string;
    /**
     * Insight Title: Pivot insight
     * Insight ID: ab1Kx7lUaHvU
     */ PivotInsight: string;
    /**
     * Insight Title: yxcv
     * Insight ID: abSTN5NZh4xW
     */ Yxcv_1: string;
    /**
     * Insight Title: Dual
     * Insight ID: aaiiYGtUims2
     */ Dual: string;
    /**
     * Insight Title: Test #1
     * Insight ID: aasWddUAawmK
     */ TestNr1: string;
    /**
     * Insight Title: Tets #111
     * Insight ID: ablreDhFdKwH
     */ TetsNr111: string;
    /**
     * Insight Title: BulletChart
     * Insight ID: aatkydZzat7h
     */ BulletChart: string;
    /**
     * Insight Title: Table report Labor Costs Vs Scheduled Costs test
     * Insight ID: aaqx9Ak0g28v
     */ TableReportLaborCostsVsScheduledCostsTest: string;
    /**
     * Insight Title: # Checks viewed by City stacked by Location - Table
     * Insight ID: aaJlFFkiaChA
     */ NrChecksViewedByCityStackedByLocationTable: string;
    /**
     * Insight Title: DashboardEmbedding Insight
     * Insight ID: abcolHjKeIB4
     */ DashboardEmbeddingInsight: string;
    /**
     * Insight Title: Table applied measure format
     * Insight ID: aajIe1OvcX5N
     */ TableAppliedMeasureFormat: string;
    /**
     * Insight Title: Column has measure format
     * Insight ID: aafIHIqgireP
     */ ColumnHasMeasureFormat: string;
    /**
     * Insight Title: Example for Zach
     * Insight ID: adLqfV3peeRI
     */ ExampleForZach: string;
    /**
     * Insight Title: Seznam Příklad #1
     * Insight ID: adotZaCGaEeP
     */ SeznamPrikladNr1: string;
    /**
     * Insight Title: sdfg
     * Insight ID: ajhtO3DggLVY
     */ Sdfg: string;
    /**
     * Insight Title: Example #1
     * Insight ID: adRuvTAwaTcq
     */ ExampleNr1: string;
    /**
     * Insight Title: New Table report Labor Costs Vs Scheduled Costs test
     * Insight ID: abg18hRDbYS9
     */ NewTableReportLaborCostsVsScheduledCostsTest: string;
    /**
     * Insight Title: My Insight
     * Insight ID: afStbARxcOjh
     */ MyInsight: string;
    /**
     * Insight Title: Arrivalist Column Chart
     * Insight ID: adFGlyj8vFrI
     */ ArrivalistColumnChart: string;
    /**
     * Insight Title: # Checks sliced by Location
     * Insight ID: abUJGRByN7u8
     */ NrChecksSlicedByLocation: string;
    /**
     * Insight Title: Example Insight
     * Insight ID: aaeMxtDkxs2K
     */ ExampleInsight: string;
    /**
     * Insight Title: Metric Value Filter
     * Insight ID: abON9zJWALQG
     */ MetricValueFilter: string;
    /**
     * Insight Title: Sales vs Franchised Sales by State
     * Insight ID: acZMwDqGmsIs
     */ SalesVsFranchisedSalesByState: string;
    /**
     * Insight Title: # of Employees by City
     * Insight ID: af7lFCjVIivU
     */ NrOfEmployeesByCity: string;
    /**
     * Insight Title: Donut Chart
     * Insight ID: ab6mukiE2XFK
     */ DonutChart_1: string;
    /**
     * Insight Title: Total Sales by Week
     * Insight ID: aa8wjLYiQd5q
     */ TotalSalesByWeek_1: string;
    /**
     * Insight Title: Total Sales by Week (KPI)
     * Insight ID: abXwnTqLRElq
     */ TotalSalesByWeekKPI: string;
    /**
     * Insight Title: #Employees by Location
     * Insight ID: aaWv2eI8lMfp
     */ NrEmployeesByLocation: string;
};
export declare const Dashboards: {
    /**
     * Dashboard Title: KPIs
     * Dashboard ID: afMA17GSbk31
     */
    KPIs: string;
    /**
     * Dashboard Title: Store management KPIs
     * Dashboard ID: abBJlnxrfEWH
     */ StoreManagementKPIs: string;
    /**
     * Dashboard Title: KPIs Drill
     * Dashboard ID: aby7cMBNeo0Y
     */ KPIsDrill: string;
    /**
     * Dashboard Title: KPIs Embedded in React Native App
     * Dashboard ID: abKH4eEFdBWS
     */ KPIsEmbeddedInReactNativeApp: string;
    /**
     * Dashboard Title: KPIs Underlined
     * Dashboard ID: abTIt0ngdlUH
     */ KPIsUnderlined: string;
    /**
     * Dashboard Title: KPIs Drill #2 - From
     * Dashboard ID: abVweo3WfQgQ
     */ KPIsDrillNr2From: string;
    /**
     * Dashboard Title: KPIs Drill #2 - To
     * Dashboard ID: aeRv67kib7Cg
     */ KPIsDrillNr2To: string;
    /**
     * Dashboard Title: Filter
     * Dashboard ID: aaZ5WGrqfHsr
     */ Filter: string;
    /**
     * Dashboard Title: Dependent Filters
     * Dashboard ID: aaBLkHnSfrBI
     */ DependentFilters: string;
    /**
     * Dashboard Title: 1. My Main Dashboard
     * Dashboard ID: abHCFBGphqKh
     */ _1MyMainDashboard: string;
    /**
     * Dashboard Title: DashboardEmbedding
     * Dashboard ID: aeO5PVgShc0T
     */ DashboardEmbedding: string;
    /**
     * Dashboard Title: DashboardEmbedding-geo
     * Dashboard ID: adsENtJ9e8ov
     */ DashboardEmbeddingGeo: string;
    /**
     * Dashboard Title: Copy of 1. My Main Dashboard
     * Dashboard ID: ac7ElmSrw5y6
     */ CopyOf1MyMainDashboard: string;
    /**
     * Dashboard Title: Copy of 1. My Main Dashboard
     * Dashboard ID: abSEx8gn3RYa
     */ CopyOf1MyMainDashboard_1: string;
    /**
     * Dashboard Title: Recharts Piechart
     * Dashboard ID: aaMmJx3CqXqq
     */ RechartsPiechart: string;
    /**
     * Dashboard Title: Drill to Dashboard A
     * Dashboard ID: abwvXygRN7cv
     */ DrillToDashboardA: string;
    /**
     * Dashboard Title: Drill to Dashboard B
     * Dashboard ID: abTv3xuAp5e4
     */ DrillToDashboardB: string;
};
//# sourceMappingURL=full.d.ts.map