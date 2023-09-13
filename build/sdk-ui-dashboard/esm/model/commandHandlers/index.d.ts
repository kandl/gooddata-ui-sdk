import { DashboardCommands } from "../commands/index.js";
import { SagaIterator } from "redux-saga";
export declare const DefaultCommandHandlers: {
    [cmd in DashboardCommands["type"]]?: (...args: any[]) => SagaIterator<any> | any;
};
