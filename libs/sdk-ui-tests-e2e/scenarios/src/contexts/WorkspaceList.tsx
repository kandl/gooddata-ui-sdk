// (C) 2020-2022 GoodData Corporation
import React, { createContext, useState, useContext, useEffect } from "react";
import last from "lodash/last.js";
import isEmpty from "lodash/isEmpty.js";
import { IWorkspaceDescriptor, IAnalyticalWorkspace, IPagedResource } from "@gooddata/sdk-backend-spi";

import { defaultSourceState, IWorkspaceSourceState } from "../utils.js";
import { workspaceFilter } from "../constants.js";

import { useBackend, useAuth } from "./Auth/index.js";
import { AuthStatus } from "./Auth/state.js";

export interface IWorkspaceListContext extends IWorkspaceSourceState {
    firstWorkspace?: string;
}

const WorkspaceListContext = createContext<IWorkspaceListContext>({
    ...defaultSourceState,
});

const filterWorkspaces = (workspaces: IWorkspaceDescriptor[], filter?: RegExp) => {
    if (filter) {
        return workspaces.filter((workspace) => workspace.title.match(filter));
    }
    return workspaces;
};

const getFirstWorkspace = (workspaces: IWorkspaceDescriptor[]) => {
    if (workspaces.length) {
        return last(workspaces[0].id.split("/"));
    }
    return undefined;
};

export const WorkspaceListProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { authStatus } = useAuth();
    const backend = useBackend();
    const [workspaceListState, setWorkspaceListState] = useState<IWorkspaceSourceState>({
        ...defaultSourceState,
    });
    const [firstWorkspace, setFirstWorkspace] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getWorkspaces = async () => {
            setWorkspaceListState({ isLoading: true });

            try {
                const workspaces: IWorkspaceDescriptor[] = [];
                let page: IPagedResource<IAnalyticalWorkspace> = await backend
                    .workspaces()
                    .forCurrentUser()
                    .query();

                while (!isEmpty(page.items)) {
                    const allDescriptors = await Promise.all(
                        page.items.map((workspace) => workspace.getDescriptor()),
                    );

                    workspaces.push(...allDescriptors);
                    page = await page.next();
                }

                const filteredWorkspaces = filterWorkspaces(workspaces, workspaceFilter);
                setWorkspaceListState({
                    isLoading: false,
                    data: filteredWorkspaces,
                });
                setFirstWorkspace(getFirstWorkspace(filteredWorkspaces));
            } catch (error: any) {
                setWorkspaceListState({ isLoading: false, error });
            }
        };

        setWorkspaceListState({ isLoading: false });

        if (authStatus === AuthStatus.AUTHORIZED) {
            getWorkspaces().catch(console.error);
        }
    }, [authStatus, backend]);

    return (
        <WorkspaceListContext.Provider value={{ ...workspaceListState, firstWorkspace }}>
            {children}
        </WorkspaceListContext.Provider>
    );
};

export const useWorkspaceList = () => useContext(WorkspaceListContext);
