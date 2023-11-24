// (C) 2022 GoodData Corporation

// Keep in sync with test_new/reference_workspace/constant.js
import * as BearMDObjects from "../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_bear.js";
import * as TigerMDObjects from "../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_tiger.js";
import * as TigerChildMDObjects from "../../reference_workspace/workspace_objects/goodsales/current_child_reference_workspace_objects_tiger.js";

import { getBackend } from "./constants.js";

export const MDObjects = getBackend() === "TIGER" ? TigerMDObjects : BearMDObjects;
export const ChildMDObjects = TigerChildMDObjects;
