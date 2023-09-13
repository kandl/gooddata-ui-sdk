import { XhrModule } from "./xhr.js";
import { UserModule } from "./user.js";
import { MetadataModule } from "./metadata.js";
import { MetadataModuleExt } from "./metadataExt.js";
import { ExecutionModule } from "./execution.js";
import { ProjectModule } from "./project.js";
import { ReportModule } from "./report/report.js";
import { DashboardModule } from "./dashboard/dashboard.js";
import { IConfigStorage, ConfigModule } from "./config.js";
import { CatalogueModule } from "./catalogue.js";
import { LdmModule } from "./ldm.js";
import { OrganizationModule } from "./organization.js";
/**
 * This package provides low-level functions for communication with the GoodData platform.
 *
 * @remarks
 * The package is used by `@gooddata/sdk-backend-bear`, which you should use instead of directly using `@gooddata/api-client-bear` whenever possible.
 *
 * For the similar package for GoodData Cloud and GoodData.CN, see `@gooddata/api-client-tiger`.
 *
 * @packageDocumentation
 */
/**
 * # JS SDK
 * Here is a set of functions that mostly are a thin wrapper over the [GoodData API](https://developer.gooddata.com/api).
 * Before calling any of those functions, you need to authenticate with a valid GoodData
 * user credentials. After that, every subsequent call in the current session is authenticated.
 * You can find more about the GD authentication mechanism here.
 *
 * ## GD Authentication Mechanism
 * In this JS SDK library we provide you with a simple `login(username, passwd)` function
 * that does the magic for you.
 * To fully understand the authentication mechanism, please read
 * [Authentication via API article](http://developer.gooddata.com/article/authentication-via-api)
 * on [GoodData Developer Portal](http://developer.gooddata.com/)
 *
 */
export declare class SDK {
    private fetchMethod;
    config: ConfigModule;
    xhr: XhrModule;
    user: UserModule;
    md: MetadataModule;
    mdExt: MetadataModuleExt;
    execution: ExecutionModule;
    project: ProjectModule;
    report: ReportModule;
    dashboard: DashboardModule;
    catalogue: CatalogueModule;
    ldm: LdmModule;
    configStorage: IConfigStorage;
    organization: OrganizationModule;
    utils: {
        loadAttributesMap: any;
        getAttributesDisplayForms: any;
    };
    constructor(fetchMethod: typeof fetch, config?: {});
    clone(): SDK;
}
/**
 * # Factory for creating SDK instances
 *
 * @param config - object to be passed to SDK constructor
 */
export declare const factory: (fetchMethod: typeof fetch) => (config?: any) => SDK;
//# sourceMappingURL=gooddata.d.ts.map