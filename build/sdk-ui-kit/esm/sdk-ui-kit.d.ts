/**
 * This package provides various UI components used to build GoodData applications (such as buttons, icons, and so on).
 *
 * @remarks
 * These components are all marked as internal, and we do not recommend using them directly outside of GoodData
 * because their API can change at any time.
 *
 * @packageDocumentation
 */

/// <reference types="lodash" />
/// <reference types="react" />

import { AccessGranularPermission } from '@gooddata/sdk-model';
import { ColorFormats } from 'tinycolor2';
import { Component } from 'react';
import { CSSProperties } from 'react';
import { DebouncedFunc } from 'lodash';
import { GoodDataSdkError } from '@gooddata/sdk-ui';
import { IAccessControlAware } from '@gooddata/sdk-model';
import { IAccessGrantee } from '@gooddata/sdk-model';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAuditableUsers } from '@gooddata/sdk-model';
import { IColorPalette } from '@gooddata/sdk-model';
import { IColorPaletteDefinition } from '@gooddata/sdk-model';
import { ILocale } from '@gooddata/sdk-ui';
import { IMeasureSortTarget } from '@gooddata/sdk-model';
import { IMetadataObjectBase } from '@gooddata/sdk-model';
import { IntlShape } from 'react-intl';
import { ISeparators } from '@gooddata/sdk-ui';
import { ISettings } from '@gooddata/sdk-model';
import { ISortItem } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { IThemeDefinition } from '@gooddata/sdk-model';
import { IUser } from '@gooddata/sdk-model';
import { IWorkspacePermissions } from '@gooddata/sdk-model';
import { LocalIdRef } from '@gooddata/sdk-model';
import { MessageDescriptor } from 'react-intl';
import { ObjRef } from '@gooddata/sdk-model';
import { OverlayController as OverlayController_2 } from './OverlayController.js';
import { PureComponent } from 'react';
import { default as React_2 } from 'react';
import { ReactNode } from 'react';
import { ShareStatus } from '@gooddata/sdk-model';
import { SortDirection } from '@gooddata/sdk-model';
import { WeekStart } from '@gooddata/sdk-model';
import { WithIntlProps } from 'react-intl';
import { WrappedComponentProps } from 'react-intl';

/**
 * @internal
 */
export declare type ActionType = "LinkButton" | "Button" | "Switcher";

/**
 * @internal
 */
export declare function activateHeaderMenuItems(items: IHeaderMenuItem[][], ids: Array<string>): IHeaderMenuItem[][];

/**
 * @internal
 */
export declare const AddGranteeBase: React_2.FC<IAddGranteeBaseProps>;

/**
 * @internal
 */
export declare type AddMessageType = (message: MessageDescriptor, options?: Pick<IMessageDefinition, "duration" | "intensive" | "values">) => string;

/**
 * @internal
 */
export declare type Alignment = {
    left: number;
    top: number;
    right: number;
    align: string;
};

/**
 * @internal
 */
export declare const AppHeader: React_2.ComponentType<Omit<WithIntlProps<IAppHeaderProps & WrappedComponentProps>, "theme" | "themeIsLoading">>;

/**
 * @internal
 */
export declare type ArrowDirections = Record<string, string>;

/**
 * @internal
 */
export declare type ArrowOffset = number[];

/**
 * @internal
 */
export declare type ArrowOffsets = Record<string, ArrowOffset>;

/**
 * @internal
 */
export declare function AsyncList<T>(props: IAsyncListProps<T>): JSX.Element;

/**
 * @internal
 */
export declare class AutoSize extends Component<IAutoSizeProps> {
    state: {
        width: number;
        height: number;
    };
    private updateSize;
    private throttledUpdateSize;
    private wrapperRef;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
}

/**
 * @internal
 */
export declare class Bubble extends React_2.Component<IBubbleProps, IBubbleState> {
    static defaultProps: {
        alignPoints: {
            align: string;
        }[];
        alignTo: string;
        arrowOffsets: {};
        arrowDirections: {};
        arrowStyle: {};
        className: string;
        closeOnOutsideClick: boolean;
        closeOnParentScroll: boolean;
        onClose: (...args: any[]) => void;
        onMouseEnter: (...args: any[]) => void;
        onMouseLeave: (...args: any[]) => void;
        overlayClassName: string;
    };
    static identifier: string;
    arrowOffsets: ArrowOffsets;
    arrowDirections: ArrowDirections;
    constructor(props: IBubbleProps);
    shouldComponentUpdate(nextProps: IBubbleProps, nextState: IBubbleState): boolean;
    onAlign: (alignment: IAlignPoint) => void;
    getClassnames(): string;
    getArrowsClassname(alignPoints: string): string;
    getArrowDirection(alignPoints: string): string;
    addOffsetToAlignPoints(alignPoints: IAlignPoint[]): IAlignPoint[];
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare class BubbleFocusTrigger extends BubbleTrigger<BubbleFocusTriggerProps> {
    static defaultProps: BubbleFocusTriggerProps;
    protected eventListeners(): any;
}

/**
 * @internal
 */
export declare type BubbleFocusTriggerProps = IBubbleTriggerProps;

/**
 * @internal
 */
export declare const BubbleHeaderSeparator: ({ title, message }: IBubbleHeaderSeparatorProps) => JSX.Element;

/**
 * @internal
 */
export declare class BubbleHoverTrigger extends BubbleTrigger<IBubbleHoverTriggerProps> {
    static defaultProps: IBubbleHoverTriggerProps;
    scheduleId: number;
    componentWillUnmount(): void;
    private cancelBubbleVisibilityChange;
    private scheduleBubbleVisibilityChange;
    protected eventListeners(): any;
}

/**
 * @internal
 */
export declare class BubbleTrigger<P extends IBubbleTriggerProps> extends React_2.PureComponent<P, IBubbleTriggerState> {
    static defaultProps: IBubbleTriggerProps;
    readonly state: Readonly<IBubbleTriggerState>;
    private onClose;
    protected eventListeners(): any;
    protected changeBubbleVisibility(active: boolean): void;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare class Button extends React_2.Component<IButtonProps> {
    static defaultProps: {
        className: string;
        disabled: boolean;
        onClick: (...args: any[]) => void;
        tabIndex: number;
        tagName: string;
        title: string;
        type: string;
        value: string;
        iconLeft: string;
        iconRight: string;
    };
    buttonNode: HTMLElement;
    render(): JSX.Element;
    private getClassnames;
    private _onClick;
    private renderIcon;
}

/**
 * @internal
 */
export declare const ChartSortingDialog: React_2.FC<ChartSortingOwnProps>;

/**
 * @internal
 */
export declare interface ChartSortingOwnProps {
    currentSort: ISortItem[];
    availableSorts: IAvailableSortsGroup[];
    bucketItems: IBucketItemDescriptors;
    onApply: (sortItems: ISortItem[]) => void;
    onCancel: () => void;
    buttonNode?: HTMLElement | string;
    locale?: string;
    enableRenamingMeasureToMetric?: boolean;
}

/**
 * @internal
 */
export declare type ChartSortingProps = ChartSortingOwnProps & WrappedComponentProps;

/**
 * @internal
 */
export declare const ChartSortingWithIntl: React_2.FC<WithIntlProps<ChartSortingProps>> & {
    WrappedComponent: React_2.ComponentType<ChartSortingProps>;
};

/**
 * @internal
 */
export declare class Checkbox extends React_2.PureComponent<CheckboxProps> {
    static defaultProps: {
        disabled: boolean;
        name: string;
        text: string;
        title: string;
        value: boolean;
        labelSize: string;
        onChange: (...args: any[]) => void;
    };
    onChange: (e: React_2.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare interface CheckboxProps {
    disabled: boolean;
    name: string;
    text: string;
    title: string;
    value: boolean;
    labelSize: LabelSize;
    onChange: (e: boolean) => void;
}

/**
 * @internal
 */
export declare const CodeArea: React_2.FC<ICodeAreaProps>;

/**
 * @internal
 */
export declare const CodeLanguageSelect: React_2.VFC<ICodeLanguageSelectProps>;

/**
 * @internal
 */
export declare type CodeLanguageType = "js" | "ts";

/**
 * @internal
 */
export declare const CodeOptions: React_2.VFC<ICodeOptionsProps>;

/**
 * Color in format supported by SVG
 * https://www.w3.org/TR/SVGColor12/#color
 *
 * @internal
 */
export declare type Color = string;

/**
 * @internal
 */
export declare const ColorPicker: React_2.FC<WithIntlProps<IColorPickerProps & WrappedComponentProps>> & {
    WrappedComponent: React_2.ComponentType<IColorPickerProps & WrappedComponentProps>;
};

/**
 * @internal
 */
export declare const ColorPickerPointer: React_2.FC;

/**
 * @internal
 */
export declare const ColorPreview: (props: IColorPreviewProps) => JSX.Element;

/**
 * @internal
 */
export declare const CommunityEditionDialog: React_2.FC<ICommunityEditionDialogProps>;

/**
 * @internal
 */
export declare const ComponentLabelsProvider: React_2.FC<IComponentLabelsProviderProps>;

/**
 * @internal
 */
export declare class ConfirmDialog extends PureComponent<IConfirmDialogBaseProps> {
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare class ConfirmDialogBase extends DialogBase<IConfirmDialogBaseProps> {
    static defaultProps: IConfirmDialogBaseProps;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare const ContentDivider: React_2.VFC;

/**
 * @internal
 */
export declare type CopyCodeOriginType = "keyboard" | "button";

/**
 * @internal
 */
export declare type CurrentUserPermissions = {
    [permission in "canEditLockedAffectedObject" | "canEditAffectedObject" | "canShareLockedAffectedObject" | "canShareAffectedObject" | "canViewAffectedObject"]: boolean;
};

/**
 * @internal
 */
export declare const CustomizableCheckmark: React_2.FC<ICustomizableCheckmarkProps>;

/**
 * @internal
 */
export declare const DateDatasetsListItem: React_2.FC<IDateDatasetsListItemProps>;

/**
 * @internal
 */
export declare class Datepicker extends React_2.PureComponent<IDatePickerOwnProps> {
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare const DEFAULT_ITEM_HEIGHT = 28;

/**
 * @internal
 */
export declare const DEFAULT_MOBILE_ITEM_HEIGHT = 40;

/**
 * Dummy theme metadata object which represents the default colors of GD.
 *
 * This object is used as default when rendering theme as a sequence of colored elements in styling
 * picker. It's properties are also used as defaults when some custom theme is missing a crucial
 * property for the same rendering purposes.
 *
 * @internal
 */
export declare const defaultColorPaletteMetadataObject: IColorPaletteDefinition;

/**
 * Dummy theme metadata object which represents the default colors of GD.
 *
 * This object is used as default when rendering theme as a sequence of colored elements in styling
 * picker. It's properties are also used as defaults when some custom theme is missing a crucial
 * property for the same rendering purposes.
 *
 * @internal
 */
export declare const defaultThemeMetadataObject: IThemeDefinition;

/**
 * @internal
 */
export declare const DESCRIPTION_PANEL_ALIGN_POINTS: {
    align: string;
}[];

/**
 * @internal
 */
export declare const DESCRIPTION_PANEL_ARROW_OFFSETS: {
    "br tr": number[];
    "bc tc": number[];
    "bl tl": number[];
    "tr br": number[];
    "tc bc": number[];
    "tl bl": number[];
    "tr tl": number[];
    "cr cl": number[];
    "br bl": number[];
    "tl tr": number[];
    "cl cr": number[];
    "bl br": number[];
};

/**
 * @internal
 */
export declare const DescriptionIcon: React_2.FC<IDescriptionTriggerProps>;

/**
 * @internal
 */
export declare const DescriptionPanel: React_2.FC<IDescriptionPanelProps>;

/**
 * @internal
 */
export declare const DescriptionPanelContent: React_2.FC<IDescriptionPanelProps>;

/**
 * @internal
 */
export declare class Dialog extends Component<IDialogBaseProps> {
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare class DialogBase<P extends IDialogBaseProps> extends PureComponent<P> {
    static defaultProps: Partial<IDialogBaseProps>;
    protected onKeyDown: (event: React_2.KeyboardEvent<HTMLDivElement>) => void | undefined;
    protected getDialogClasses(additionalClassName?: string): string;
    protected renderCloseButton(): JSX.Element;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare const DialogList: React_2.VFC<IDialogListProps>;

/**
 * @internal
 */
export declare const DialogListHeader: React_2.VFC<IDialogListHeaderProps>;

/**
 * @internal
 */
export declare const DialogListItemBasic: React_2.VFC<IDialogListItemComponentProps>;

/**
 * @internal
 */
export declare type DialogListItemComponent<T extends IDialogListItem = IDialogListItem> = React.FunctionComponent<IDialogListItemComponentProps<T>>;

/**
 * @internal
 */
export declare type DialogModeType = "ShareGrantee" | "AddGrantee";

/**
 * @internal
 */
export declare const DocumentHeader: React_2.FC<IDocumentHeaderProps>;

/**
 * @internal
 */
export declare const Dropdown: React_2.FC<IDropdownProps>;

/**
 * @internal
 */
export declare const DropdownButton: React_2.FC<IDropdownButtonProps>;

/**
 * @internal
 */
export declare function DropdownList<T>(props: IDropdownListProps<T>): JSX.Element;

/**
 * @internal
 */
export declare const DropdownTabs: React_2.FC<IDropdownTagsProps>;

/**
 * @internal
 */
export declare const EditableLabel: React_2.ForwardRefExoticComponent<IEditableLabelProps & React_2.RefAttributes<HTMLDivElement>>;

/**
 * @internal
 */
export declare class EditableLabelInner extends Component<IEditableLabelInnerProps, IEditableLabelState> {
    static defaultProps: {
        children: boolean;
        className: string;
        maxLength: number;
        maxRows: number;
        onCancel: {
            <T>(value: T): T;
            (): undefined;
        };
        onEditingStart: {
            <T>(value: T): T;
            (): undefined;
        };
        onChange: {
            <T>(value: T): T;
            (): undefined;
        };
        placeholder: string;
        scrollToEndOnEditingStart: boolean;
        textareaInOverlay: boolean;
        autofocus: boolean;
        isEditableLabelWidthBasedOnText: boolean;
    };
    private readonly root;
    private readonly textarea;
    private focusTimeout;
    constructor(props: IEditableLabelInnerProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(newProps: IEditableLabelProps): void;
    componentWillUnmount(): void;
    onDocumentClick: (e: MouseEvent) => void;
    onSelectStart(e: React_2.MouseEvent): void;
    onKeyDown: (e: React_2.KeyboardEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onChange: (e: React_2.ChangeEvent<HTMLTextAreaElement>) => void;
    edit: (_e?: React_2.MouseEvent<HTMLDivElement>) => void;
    isClickOutsideTextarea(clickedTarget: EventTarget): boolean;
    isMultiLine(): boolean;
    removeListeners(): void;
    measureRootDimensions(): void;
    selectAndFocus: () => void;
    renderTextAreaInOverlay(): ReactNode;
    renderTextarea(style?: {}): ReactNode;
    renderEditableLabelEdit(): ReactNode;
    render(): ReactNode;
}

/**
 * Multiline ellipsis does not exist natively, so this is a simple version of it.
 *
 * The component cuts the text at approximately 'maxLines' lines.
 * It renders button 'Show more'/'Show less'.
 * The new line character poses the most trouble to calculate the cut point,
 * so it will estimate how much character worth of space was taken by it.
 *
 * There is several constants: the width is taken as 190px, the font-size is
 * 13px. The text is wrapped by words, so 28 characters is an approximate count
 * per line. By these metrics it can find a point to shorten the text. It is not
 * precise value, but it works most of the time, sometimes rendering 9 or 11 lines,
 * which is acceptable for this component usage.
 *
 * @internal
 */
export declare const EllipsisText: React_2.FC<IEllipsisTextProps>;

/**
 * @internal
 */
export declare const EmbedInsightDialogBase: React_2.VFC<IEmbedInsightDialogBaseProps>;

/**
 * @internal
 */
export declare type EmbedOptionsType = IReactOptions | IWebComponentsOptions;

/**
 * @internal
 */
export declare type EmbedType = "react" | "webComponents";

/**
 * @internal
 */
export declare enum ENUM_KEY_CODE {
    KEY_CODE_ENTER = 13,
    KEY_CODE_ESCAPE = 27
}

/**
 * @internal
 */
export declare class ErrorOverlay extends React_2.PureComponent<IErrorOverlayProps> {
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare const ExportDialog: {
    (props: IExportDialogBaseProps): JSX.Element;
    defaultProps: IExportDialogBaseProps;
};

/**
 * @internal
 */
export declare class ExportDialogBase extends DialogBase<IExportDialogBaseProps> {
    static defaultProps: IExportDialogBaseProps;
    state: IExportDialogBaseState;
    render(): JSX.Element;
    private onFilterContextChange;
    private onMergeHeadersChange;
    private onSubmit;
}

/**
 * @internal
 */
export declare const FilterLabel: React_2.FC<WithIntlProps<IFilterLabelProps & WrappedComponentProps>> & {
    WrappedComponent: React_2.ComponentType<IFilterLabelProps & WrappedComponentProps>;
};

/**
 * @internal
 */
export declare class FlexDimensions extends Component<IFlexDimensionsProps, IFlexDimensionsState> {
    static defaultProps: {
        children: boolean;
        className: string;
        measureWidth: boolean;
        measureHeight: boolean;
    };
    private wrapperRef;
    private readonly throttledUpdateSize;
    constructor(props: IFlexDimensionsProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getChildrenDimensions(): Partial<IFlexDimensionsState>;
    updateSize: () => void;
    renderChildren(): ReactNode;
    render(): ReactNode;
}

/**
 * @internal
 */
export declare type FormatMessageParams = Parameters<IntlShape["formatMessage"]>;

/**
 * @internal
 */
export declare function formatTime(h: number, m: number, format?: string): string;

/**
 * @internal
 */
export declare class FullScreenOverlay extends Overlay<IOverlayState> {
    constructor(props: IOverlayProps<any>);
    UNSAFE_componentWillMount(): void;
    componentWillUnmount(): void;
    protected getOverlayStyles: () => React.CSSProperties;
}

/**
 * @internal
 */
export declare const GD_COLOR_HIGHLIGHT = "#14b2e2";

/**
 * @internal
 */
export declare const GD_COLOR_WHITE = "#fff";

/**
 * @internal
 */
export declare function generateHeaderAccountMenuItems(workspacePermissions: IWorkspacePermissions, // bootstrapResource.current.projectPermissions
uiSettings: IUiSettings, // bootstrapResource.settings
workspaceId?: string, // parsed from bootstrapResource.current.project.links.self
showOnlyLogoutItem?: boolean, featureFlags?: ISettings): IHeaderMenuItem[];

/**
 * @internal
 */
export declare function generateHeaderHelpMenuItems(documentationUrl?: string, supportForumUrl?: string, userEmail?: string, workspaceId?: string, sessionId?: string, supportEmail?: string, isBranded?: boolean, featureFlags?: ISettings): IHeaderMenuItem[];

/**
 * @internal
 */
export declare function generateHeaderMenuItemsGroups(featureFlags: ISettings, workspacePermissions: IWorkspacePermissions, hasAnalyticalDashboards?: boolean, workspaceId?: string, dashboardId?: string, tabId?: string, hasNoDataSet?: boolean, backendSupportsDataItem?: boolean, backendSupportsCsvUploader?: boolean, hasMeasures?: boolean, hasManage?: boolean): IHeaderMenuItem[][];

/**
 * @internal
 */
export declare function generateHeaderStaticHelpMenuItems(documentationUrl?: string, communityUrl?: string, universityUrl?: string, slackUrl?: string): IHeaderMenuItem[];

/**
 * @internal
 */
export declare function generateSupportUrl(projectId?: string, sessionId?: string, userEmail?: string, url?: string): string;

/**
 * This function transforms a color palette into an array of max ten colors which is used
 * to render the color palette in styling picker.
 *
 * @internal
 */
export declare const getColorsPreviewFromColorPalette: (colorPalette: IColorPalette) => string[];

/**
 * This function transforms a theme metadata object into an array of colors which is used
 * to render the theme in styling picker. When provided theme object is missing some properties,
 * defaults are taken from the {@link defaultThemeMetadataObject}.
 *
 * @internal
 */
export declare const getColorsPreviewFromTheme: (theme: ITheme) => string[];

/**
 * Build date time config for InsightListItemDate component.
 *
 * @param date - string ISO date
 * @param options - optional options object
 * @returns date time config
 *
 * @internal
 */
export declare function getDateTimeConfig(date: string, options?: IDateTimeConfigOptions): IInsightListItemDateConfig;

/**
 * @internal
 */
export declare const getDefaultEmbedTypeOptions: (embedType: EmbedType) => EmbedOptionsType;

/**
 * @internal
 */
export declare const getGranteeItemTestId: (grantee: GranteeItem, prefix?: "option") => string;

/**
 * @internal
 */
export declare const getHeightWithUnitsForEmbedCode: (codeOption: EmbedOptionsType) => string | number;

/**
 * @internal
 */
export declare type GetOptimalAlignment = {
    targetRegion: IRegion;
    selfRegion: IRegion;
    ignoreScrollOffsets?: boolean;
    alignPoints: IAlignPoint[];
    getViewportRegion?: (ignoreScrollOffsets: boolean) => void;
    getDocumentRegion?: () => void;
};

/**
 * @internal
 */
export declare type GetOptimalAlignmentForRegion = {
    boundaryRegion: any;
    targetRegion: any;
    selfRegion: any;
    alignPoints: IAlignPoint[];
};

/**
 * @internal
 */
export declare type GetPositionedSelfRegion = {
    targetRegion: IRegion;
    selfRegion: IRegion;
    bodyRegion: IRegion;
    alignPoint: IAlignPoint;
};

/**
 * @internal
 */
export declare function getRecommendedDateDataset<T extends IDateDataset>(items: T[]): T;

/**
 * @internal
 */
export declare type GranteeItem = IGranteeUser | IGranteeInactiveOwner | IGranteeGroup | IGranteeGroupAll | IGranularGranteeUser | IGranularGranteeGroup;

/**
 * @internal
 */
export declare const GranteeItemComponent: React_2.FC<IGranteeItemProps>;

/**
 * @internal
 */
export declare type GranteeStatus = "Inactive" | "Active";

/**
 * @internal
 */
export declare type GranteeType = "user" | "inactive_owner" | "group" | "groupAll" | "granularUser" | "granularGroup";

/**
 * Generate GUID for the object and set it as its '__infID' prop.
 *
 * @param obj - object to set guid to
 * @returns newly generated guid or already existing one on the object, '(Object)' for Object, '(Array)' for Array.
 *
 * @internal
 */
export declare function guidFor(obj: any): string;

/**
 * This is custom dom goodstrap event, it is used by Overlay to handle CloseOnParentDrag
 * This event is throttled by default
 * @internal
 */
export declare const handleOnGoodstrapDragEvent: DebouncedFunc<() => void>;

/**
 * @internal
 */
export declare const Header: React_2.FC<IHeaderProps>;

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_ANALYZE = "gs.header.analyze";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_DASHBOARDS = "gs.header.dashboards";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_DATA = "gs.header.data";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_KPIS = "gs.header.kpis";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_KPIS_NEW = "gs.header.kpis.new";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_LOAD = "gs.header.load";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_MANAGE = "gs.header.manage";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_METRICS = "gs.header.metrics";

/**
 * @internal
 */
export declare const HEADER_ITEM_ID_REPORTS = "gs.header.reports";

/**
 * @internal
 */
export declare const HeaderBadge: React_2.FC<IHeaderBadgeProps>;

/**
 * @internal
 */
export declare const HeaderBadgeWithModal: React_2.FC<IHeaderBadgeWithModalProps>;

/**
 * @internal
 */
export declare const HeaderDataMenu: React_2.FC<WithIntlProps<IHeaderDataMenuProps>> & {
    WrappedComponent: React_2.ComponentType<IHeaderDataMenuProps>;
};

/**
 * @internal
 */
export declare const HeaderWorkspacePicker: React_2.FC<WithIntlProps<IHeaderWorkspacePickerProps>> & {
    WrappedComponent: React_2.ComponentType<IHeaderWorkspacePickerProps>;
};

/**
 * @internal
 */
export declare type HelpMenuDropdownAlignPoints = "br tr" | "bl tl";

/**
 * @public
 */
export declare const HubspotConversionTouchPointDialog: React_2.FC<IHubspotConversionTouchPointDialogBaseProps>;

/**
 * This component was implemented to follow current design of links
 * with minimal necessary stylization.
 *
 * @internal
 */
export declare const Hyperlink: React_2.FC<IHyperlinkProps>;

/**
 * @internal
 */
export declare interface IAddGranteeBaseProps {
    isDirty: boolean;
    currentUser: IUser;
    addedGrantees: GranteeItem[];
    appliedGrantees: GranteeItem[];
    currentUserPermissions: CurrentUserPermissions;
    sharedObject: IAffectedSharedObject;
    onBackClick?: () => void;
    onDelete: (grantee: GranteeItem) => void;
    onAddUserOrGroups?: (grantee: GranteeItem) => void;
    onCancel: () => void;
    onSubmit: () => void;
    onGranularGranteeChange?: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export declare interface IAffectedSharedObject {
    ref: ObjRef;
    shareStatus: ShareStatus;
    owner: IGranteeUser | IGranteeInactiveOwner;
    isLocked: boolean;
    isUnderLenientControl: boolean;
    isLockingSupported: boolean;
    isLeniencyControlSupported: boolean;
    isMetadataObjectLockingSupported: boolean;
    areGranularPermissionsSupported?: boolean;
    canWorkspaceManagerSeeEverySharedObject?: boolean;
}

/**
 * @internal
 */
export declare interface IAlignPoint {
    align: string;
    offset?: IOffset;
}

/**
 * @internal
 */
export declare interface IAppHeaderProps {
    className?: string;
    onLogoClick?: (e: React_2.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    onMenuItemClick?: (menuItem: IHeaderMenuItem, e?: React_2.MouseEvent) => void;
    menuItemsGroups?: IHeaderMenuItem[][];
    accountMenuItems?: IHeaderMenuItem[];
    helpMenuItems?: IHeaderMenuItem[];
    badges?: React_2.ReactNode;
    logoUrl?: string;
    logoHref?: string;
    logoTitle?: string;
    documentationUrl?: string;
    workspacePicker: React_2.ReactNode;
    headerColor?: string;
    headerTextColor?: string;
    activeColor?: string;
    userName: string;
    expiredDate?: string;
    disableHelpDropdown?: boolean;
    onHelpClick?: (isOpen: boolean) => void;
    helpMenuDropdownAlignPoints?: HelpMenuDropdownAlignPoints;
    showStaticHelpMenu?: boolean;
    helpRedirectUrl?: string;
    theme?: ITheme;
    showUpsellButton?: boolean;
    onUpsellButtonClick?: (e: React_2.MouseEvent) => void;
    showInviteItem?: boolean;
    onInviteItemClick?: (e: React_2.MouseEvent) => void;
}

/**
 * @internal
 */
export declare interface IAppHeaderState {
    childrenWidth: number;
    guid: string;
    isOverlayMenuOpen: boolean;
    responsiveMode: boolean;
    isHelpMenuOpen: boolean;
}

/**
 * @internal
 */
export declare interface IAsyncListProps<T> {
    className?: string;
    width?: number;
    height?: number;
    items: T[];
    itemHeight?: number;
    renderItem: (props: IRenderListItemProps<T>) => JSX.Element;
    /**
     * Set to true to render the loading indicator instead of the list.
     * Usually, you want to use this property during initialization / loading first page of the items.
     */
    isLoading?: boolean;
    /**
     * Number of loading item placeholders to render at the end of the list.
     * When the user scrolls to the placeholders, the onLoadNextPage() callback will be called.
     * You should set this value to 0 when all items are loaded and there is no other page to load.
     */
    nextPageItemPlaceholdersCount?: number;
    /**
     * When true, onLoadNextPage callback will be disabled.
     */
    isLoadingNextPage?: boolean;
    /**
     * Callback that is called when the user scrolls to the loading item placeholders.
     * It won't be called, if isLoadingNextPage is set to true.
     */
    onLoadNextPage?: () => void;
}

/**
 * @internal
 */
export declare interface IAutoSizeChildren {
    width: number;
    height: number;
}

/**
 * @internal
 */
export declare interface IAutoSizeProps {
    children: ({ width, height }: IAutoSizeChildren) => React_2.ReactNode;
}

/**
 * For now it is completely the same as IAvailableSortsGroup in sdk-ui-ext
 *
 * @internal
 */
export declare interface IAvailableSortsGroup {
    itemId: LocalIdRef;
    /**
     * Attribute sorts related to the attribute bucket item referenced by itemId
     * Attribute sort suggestions can be created later in AD
     * This structure eliminates the risk, that in one group attributeSortSuggestions for multiple attribute items will be mixed together
     */
    attributeSort?: {
        normalSortEnabled: boolean;
        areaSortEnabled: boolean;
    };
    metricSorts?: MeasureSortSuggestion[];
    /**
     * Additional text to available sorts, eg.
     * when there is single available sort, this can contain explanation of the reason
     */
    explanation?: string;
}

/**
 * Breakpoints configuration.
 * Each breakpoint defines the maximum screen width in pixels according to which it is classified.
 *
 * @internal
 */
export declare type IBreakpointsConfig = {
    [s in ResponsiveScreenType]: number;
};

/**
 * @internal
 */
export declare interface IBubbleHeaderSeparatorProps {
    title?: string;
    message?: string;
}

/**
 * @internal
 */
export declare interface IBubbleHoverTriggerProps extends IBubbleTriggerProps {
    showDelay?: number;
    hideDelay?: number;
    hoverHideDelay?: number;
}

/**
 * @internal
 */
export declare interface IBubbleProps {
    alignPoints?: IAlignPoint[];
    alignTo?: string;
    arrowOffsets?: ArrowOffsets;
    arrowDirections?: ArrowDirections;
    arrowStyle?: React_2.CSSProperties;
    className?: string;
    closeOnOutsideClick?: boolean;
    closeOnParentScroll?: boolean;
    /**
     * Array of refs where user clicks should be ignored
     * and bubble should not be closed by clicking on them
     */
    ignoreClicksOn?: any[];
    ignoreClicksOnByClass?: string[];
    onClose?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onKeyDown?: () => void;
    overlayClassName?: string;
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IBubbleState {
    alignPoints: IAlignPoint[];
    optimalAlignPoints: string;
}

/**
 * @internal
 */
export declare interface IBubbleTriggerProps {
    className?: string;
    children?: React_2.ReactNode;
    eventsOnBubble?: boolean;
    tagName?: React_2.ElementType;
    onBubbleOpen?: () => void;
    onBubbleClose?: () => void;
}

/**
 * @internal
 */
export declare interface IBubbleTriggerState {
    bubbleId: string;
    isBubbleVisible: boolean;
}

/**
 * @internal
 */
export declare interface IBucketItemDescriptor {
    type: "attribute" | "chronologicalDate" | "genericDate" | "measure";
    name: string;
    sequenceNumber?: string;
}

/**
 * @internal
 */
export declare interface IBucketItemDescriptors {
    [localIdentifier: string]: IBucketItemDescriptor;
}

/**
 * @internal
 */
export declare interface IButtonProps {
    id?: string;
    className?: string;
    disabled?: boolean;
    tabIndex?: number;
    tagName?: string;
    title?: string;
    type?: string;
    value?: ReactNode;
    iconLeft?: string;
    iconRight?: string;
    onClick?(e: React.MouseEvent): void;
}

/**
 * @internal
 */
export declare interface ICodeAreaProps {
    code: string;
    onCopyCode: (code: string) => void;
}

/**
 * @internal
 */
export declare interface ICodeLanguageSelectProps {
    selectedLanguage: CodeLanguageType;
    onLanguageChanged: (language: CodeLanguageType) => void;
}

/**
 * @internal
 */
export declare interface ICodeOptionsProps {
    option: IReactOptions;
    onChange: (opt: IReactOptions) => void;
}

/**
 * @internal
 */
export declare interface IColorPickerProps {
    initialRgbColor: ColorFormats.RGB;
    onSubmit: (color: ColorFormats.RGB) => void;
    onCancel: () => void;
}

/**
 * @internal
 */
export declare interface IColorPickerState {
    draftHslColor: ColorFormats.HSL;
}

/**
 * @internal
 */
export declare interface IColorPreviewProps {
    colors: string[];
    className?: string;
}

/**
 * @internal
 */
export declare interface IColumnsIconProps extends IIconProps {
    colorPalette?: {
        normalColumn?: Color;
        totalColumn?: Color;
    };
}

/**
 * @internal
 */
export declare interface ICommunityEditionDialogProps {
    onClose: () => void;
    headerText: string;
    infoText: string;
    copyrightText: string;
    links: {
        text: string;
        uri: string;
    }[];
    closeButtonText: string;
}

/**
 * @internal
 */
export declare type IComponentLabelsProviderProps = {
    labels: IShareDialogLabels;
    children?: React.ReactNode;
};

/**
 * @internal
 */
export declare const Icon: Record<string, React.FC<IIconProps>>;

/**
 * @internal
 */
export declare interface IConfirmDialogBaseProps extends IDialogBaseProps {
    isSubmitDisabled?: boolean;
    isPositive?: boolean;
    headline?: string;
    cancelButtonText?: string;
    submitButtonText?: string;
    submitButtonTooltipText?: string;
    submitButtonTooltipAlignPoints?: IAlignPoint[];
    submitButtonTooltipArrowOffsets?: ArrowOffsets;
    warning?: string | React_2.ReactElement;
    showProgressIndicator?: boolean;
    headerLeftButtonRenderer?: () => JSX.Element;
    footerLeftRenderer?: () => JSX.Element;
    dialogHeaderClassName?: string;
    titleRightIconRenderer?: () => JSX.Element;
}

/**
 * @internal
 */
export declare interface ICustomizableCheckmarkProps {
    className?: string;
    width?: number;
    height?: number;
}

/**
 * @internal
 */
export declare interface IDateDataset {
    id: string;
    title: string;
    relevance?: number;
}

/**
 * @internal
 */
export declare interface IDateDatasetHeader {
    title: string;
    type: "header";
}

/**
 * @internal
 */
export declare interface IDateDatasetsListItemProps {
    id?: string;
    title?: string;
    isHeader?: boolean;
    isSelected?: boolean;
    isUnrelated?: boolean;
    onClick: (e: React_2.MouseEvent<HTMLDivElement>) => void;
}

/**
 * @internal
 */
export declare interface IDatePickerOwnProps {
    date?: Date;
    className?: string;
    placeholder?: string;
    onChange?: (selectedData: Date) => void;
    resetOnInvalidValue?: boolean;
    size?: string;
    tabIndex?: number;
    alignPoints?: IAlignPoint[];
    onAlign?: (align: string) => void;
    locale?: string;
    dateFormat?: string;
    weekStart?: WeekStart;
}

/**
 * @internal
 */
export declare interface IDateTimeConfigOptions {
    dateTimezone?: string;
    now?: Date;
}

/**
 * @internal
 */
export declare interface IDescriptionPanelProps {
    title?: string;
    description?: string;
    locale?: string;
    className?: string;
    onBubbleOpen?: () => void;
    arrowOffsets?: ArrowOffsets;
}

/**
 * @internal
 */
export declare interface IDescriptionTriggerProps {
    className?: string;
}

/**
 * @internal
 */
export declare interface IDialogBaseProps {
    children?: React_2.ReactNode;
    className?: string;
    displayCloseButton?: boolean;
    submitOnEnterKey?: boolean;
    onCancel?: (data?: any) => void;
    onClose?: (data?: any) => void;
    onSubmit?: (data?: any) => void;
    /**
     * These properties will be placed to the container, which wraps overlay background and dialog content elements
     */
    containerClassName?: string;
    onClick?: (e: React_2.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseOver?: (e: React_2.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseUp?: (e: React_2.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

/**
 * @internal
 */
export declare interface IDialogListHeaderProps {
    className?: string;
    gdIconName?: string;
    title?: string;
    buttonTitle?: string;
    buttonDisabled?: boolean;
    buttonTooltipText?: string;
    onButtonClick?: () => void;
}

/**
 * @internal
 */
export declare interface IDialogListItem extends IDialogListItemBase {
    subtitle?: string;
    icon?: JSX.Element;
    isDisabled?: boolean;
    isClickable?: boolean;
    isDeletable?: boolean;
    deleteTooltipText?: string;
}

/**
 * @internal
 */
export declare interface IDialogListItemBase {
    id: string;
    title: string;
}

/**
 * @internal
 */
export declare interface IDialogListItemComponentProps<T extends IDialogListItem = IDialogListItem> {
    item: T;
    className?: string;
    onClick?: (item: T) => void;
    onDelete?: (item: T) => void;
}

/**
 * @internal
 */
export declare interface IDialogListProps<T extends IDialogListItem = IDialogListItem> {
    items: Array<T>;
    isLoading?: boolean;
    className?: string;
    emptyMessageElement?: JSX.Element;
    itemComponent?: DialogListItemComponent<T>;
    itemClassName?: string;
    onItemClick?: (item: T) => void;
    onItemDelete?: (item: T) => void;
}

/**
 * @internal
 */
export declare interface IDocumentHeaderProps {
    pageTitle?: string;
    brandTitle?: string;
    appleTouchIconUrl?: string;
    faviconUrl?: string;
}

/**
 * @internal
 */
export declare interface IDomNative {
    focus: (options?: {
        preventScroll?: boolean;
    }) => void;
}

/**
 * @internal
 */
export declare interface IDomNativeProps {
    autofocus?: boolean;
}

/**
 * @internal
 */
export declare interface IDropdownBodyRenderProps {
    isMobile: boolean;
    closeDropdown: () => void;
}

/**
 * @internal
 */
export declare interface IDropdownButtonProps {
    id?: string;
    className?: string;
    value?: ReactNode;
    title?: string;
    disabled?: boolean;
    isOpen?: boolean;
    isSmall?: boolean;
    iconLeft?: string;
    onClick?: (e: React_2.MouseEvent) => void;
}

/**
 * @internal
 */
export declare interface IDropdownButtonRenderProps {
    isMobile: boolean;
    isOpen: boolean;
    openDropdown: () => void;
    closeDropdown: () => void;
    toggleDropdown: () => void;
}

/**
 * @internal
 */
export declare interface IDropdownListNoDataRenderProps {
    hasNoMatchingData: boolean;
}

/**
 * @internal
 */
export declare interface IDropdownListProps<T> extends IListProps<T> {
    className?: string;
    height?: number;
    width?: number;
    isLoading?: boolean;
    showSearch?: boolean;
    disableAutofocus?: boolean;
    searchFieldSize?: "small" | "normal";
    searchPlaceholder?: string;
    searchString?: string;
    onSearch?: (searchString: string) => void;
    showTabs?: boolean;
    tabs?: ITab[];
    selectedTabId?: string;
    onTabSelect?: (tab: ITab) => void;
    mobileItemHeight?: number;
    isMobile?: boolean;
    renderNoData?: (props: IDropdownListNoDataRenderProps) => React_2.ReactNode;
    footer?: React_2.ReactNode | ((closeDropdown: () => void) => React_2.ReactNode);
    closeDropdown?: () => void;
    scrollToItem?: T;
}

/**
 * @internal
 */
export declare interface IDropdownProps {
    renderBody: (props: IDropdownBodyRenderProps) => React_2.ReactNode;
    renderButton: (props: IDropdownButtonRenderProps) => React_2.ReactNode;
    openOnInit?: boolean;
    className?: string;
    alignPoints?: IAlignPoint[];
    closeOnMouseDrag?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnParentScroll?: boolean;
    ignoreClicksOnByClass?: string[];
    onOpenStateChanged?: (isOpen: boolean) => void;
    overlayPositionType?: OverlayPositionType;
    overlayZIndex?: number;
    /**
     * Should the dropdown body be fullscreen on smaller screens? Defaults to true.
     */
    fullscreenOnMobile?: boolean;
    enableEventPropagation?: boolean;
}

/**
 * @internal
 */
export declare interface IDropdownTagsProps {
    tabs?: ITab[];
    selectedTabId?: string;
    onTabSelect?: (tab: ITab) => void;
}

/**
 * @internal
 */
export declare interface IEditableLabelInnerProps extends IEditableLabelProps {
    innerRef: React_2.ForwardedRef<HTMLDivElement>;
}

/**
 * @internal
 */
export declare interface IEditableLabelProps {
    children?: React_2.ReactNode;
    className?: string;
    maxLength?: number;
    maxRows?: number;
    onCancel?: (value: string) => void;
    onEditingStart?: () => void;
    onChange?: (value: string) => void;
    onSubmit: (value: string) => void;
    placeholder?: string;
    scrollToEndOnEditingStart?: boolean;
    textareaInOverlay?: boolean;
    value: string;
    autofocus?: boolean;
    isEditableLabelWidthBasedOnText?: boolean;
}

/**
 * @internal
 */
export declare interface IEditableLabelState {
    value: string;
    isEditing: boolean;
    textareaWidth: number;
    textareaFontSize?: number;
}

/**
 * @internal
 */
export declare interface IEllipsisTextProps {
    text: string;
    maxLines?: number;
}

/**
 * @internal
 */
export declare type IEmbedInsightDialogBaseProps = {
    code: string;
    embedTab: EmbedType;
    embedTypeOptions: IReactOptions | IWebComponentsOptions;
    propertiesLink?: string;
    integrationDocLink?: string;
    showWebComponentsTab?: boolean;
    openSaveInsightDialog: () => void;
    onClose: () => void;
    onCopyCode: (code: string, type: CopyCodeOriginType, codeType: EmbedType) => void;
    onOptionsChange: (opt: IReactOptions | IWebComponentsOptions) => void;
    onTabChange: (selectedTab: EmbedType) => void;
};

/**
 * @internal
 */
export declare interface IErrorOverlayProps {
    showButton?: boolean;
    showIcon?: boolean;
    icon?: ReactNode;
    title?: ReactNode;
    text?: ReactNode;
    buttonTitle?: string;
    onButtonClick?: () => void;
    className?: string;
    locale?: string;
}

/**
 * @internal
 */
export declare interface IExportDialogBaseProps extends IDialogBaseProps {
    isSubmitDisabled?: boolean;
    isPositive?: boolean;
    headline?: string;
    cancelButtonText?: string;
    submitButtonText?: string;
    filterContextText?: string;
    filterContextTitle?: string;
    filterContextVisible?: boolean;
    includeFilterContext?: boolean;
    mergeHeaders?: boolean;
    mergeHeadersDisabled?: boolean;
    mergeHeadersText?: string;
    mergeHeadersTitle?: string;
}

/**
 * @internal
 */
export declare interface IExportDialogBaseState {
    includeFilterContext: boolean;
    mergeHeaders: boolean;
}

/**
 * @internal
 */
export declare interface IExportDialogData {
    includeFilterContext: boolean;
    mergeHeaders: boolean;
}

/**
 * @internal
 */
export declare interface IFilterLabelProps {
    isAllSelected?: boolean;
    isDate?: boolean;
    selection?: string;
    selectionSize?: number;
    title: string;
    noData?: boolean;
}

/**
 * @internal
 */
export declare interface IFilterLabelState {
    hasEllipsis: boolean;
}

/**
 * @internal
 */
export declare interface IFlexDimensionsProps {
    children?: React_2.ReactNode;
    className?: string;
    measureHeight?: boolean;
    measureWidth?: boolean;
}

/**
 * @internal
 */
export declare interface IFlexDimensionsState {
    width: number;
    height: number;
}

/**
 * @internal
 */
export declare interface IFormatPreset {
    name: string;
    localIdentifier: string;
    format: string | null;
    previewNumber: number | null;
    shortFormat?: string;
    type?: PresetType;
}

/**
 * @internal
 */
export declare interface IFormatTemplate {
    localIdentifier: string;
    format: string;
    name: string;
}

/**
 * @internal
 */
export declare interface IGranteeBase {
    type: GranteeType;
    id: ObjRef;
}

/**
 * @internal
 */
export declare interface IGranteeGroup extends IGranteeBase {
    type: "group";
    name: string;
    memberCount?: number;
}

/**
 * @internal
 */
export declare interface IGranteeGroupAll extends IGranteeBase {
    type: "groupAll";
    memberCount?: number;
}

/**
 * @internal
 */
export declare interface IGranteeInactiveOwner extends IGranteeBase {
    type: "inactive_owner";
}

/**
 * @internal
 */
export declare interface IGranteeItemProps {
    mode: DialogModeType;
    grantee: GranteeItem;
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    areGranularPermissionsSupported?: boolean;
    onDelete: (grantee: GranteeItem) => void;
    onChange?: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export declare interface IGranteeUser extends IGranteeBase {
    type: "user";
    name: string;
    isOwner: boolean;
    isCurrentUser: boolean;
    status: GranteeStatus;
    email?: string;
}

/**
 * @internal
 */
export declare interface IGranularGranteeGroup extends IGranteeBase {
    type: "granularGroup";
    name: string;
    permissions: AccessGranularPermission[];
    inheritedPermissions: AccessGranularPermission[];
}

/**
 * @internal
 */
export declare interface IGranularGranteeUser extends IGranteeBase {
    type: "granularUser";
    name: string;
    isOwner: boolean;
    isCurrentUser: boolean;
    status: GranteeStatus;
    email?: string;
    permissions: AccessGranularPermission[];
    inheritedPermissions: AccessGranularPermission[];
}

/**
 * @internal
 */
export declare interface IHeaderAccountProps {
    className?: string;
    items?: IHeaderMenuItem[];
    onMenuItemClick: (menuItem: IHeaderMenuItem, e?: React_2.MouseEvent) => void;
    userName?: string;
}

/**
 * @internal
 */
export declare interface IHeaderAccountState {
    isOpen: boolean;
}

/**
 * @internal
 */
export declare interface IHeaderBadgeProps {
    color?: string;
    backgroundColor?: string;
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IHeaderBadgeWithModalProps extends IHeaderBadgeProps {
    renderModalContent: (parameters: {
        closeModal: () => void;
    }) => React_2.ReactNode;
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IHeaderDataMenuItem extends IHeaderMenuItem {
    isDisable?: boolean;
    tooltipText?: string;
}

/**
 * @internal
 */
export declare interface IHeaderDataMenuProps {
    intl: IntlShape;
    className?: string;
    onMenuItemClick: (item: IHeaderDataMenuItem) => void;
    dataMenuItems: IHeaderDataMenuItem[];
}

/**
 * @internal
 */
export declare interface IHeaderInviteProps {
    textColor?: string;
    onInviteItemClick?: (e: React_2.MouseEvent) => void;
}

/**
 * @internal
 */
export declare interface IHeaderMenuItem {
    key: string;
    href?: string;
    isActive?: boolean;
    className?: string;
    target?: string;
    iconName?: string;
    onClick?: (obj: any) => void;
}

/**
 * @internal
 */
export declare interface IHeaderMenuProps {
    className?: string;
    onMenuItemClick?: (menuItem: IHeaderMenuItem, e?: React_2.MouseEvent) => void;
    sections?: IHeaderMenuItem[][];
}

/**
 * @internal
 */
export declare interface IHeaderProps {
    children: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IHeaderUpsellButtonProps {
    onUpsellButtonClick?: (e: React_2.MouseEvent) => void;
}

/**
 * @internal
 */
export declare interface IHeaderWorkspace {
    id: string;
    title: string;
    description: string;
    isDemo?: boolean;
}

/**
 * @internal
 */
export declare interface IHeaderWorkspacePickerProps {
    intl: IntlShape;
    className?: string;
    isLoading?: boolean;
    selectedWorkspace?: IHeaderWorkspace;
    workspaces?: IHeaderWorkspace[];
    totalWorkspacesCount?: number;
    searchString?: string;
    showSearch?: boolean;
    onOpen?: () => void;
    onSearch?: (searchString: string) => void;
    onSelect?: (item: IHeaderWorkspace) => void;
    onScrollEnd?: (visibleRowsStartIndex: number, visibleRowsEndIndex: number) => void;
    projectPickerFooter?: React_2.ReactNode;
    isRenamingProjectToWorkspaceEnabled?: boolean;
}

/**
 * @public
 */
export declare interface IHubspotConversionTouchPointDialogBaseProps {
    /**
     * Hubspot Portal Id
     */
    hubspotPortalId: string;
    /**
     * Hubspot Form Id
     */
    hubspotFormId: string;
    /**
     * Dialog Title
     */
    dialogTitle?: string;
    /**
     * The value for Cancel button
     */
    cancelButtonText?: string;
    /**
     * Show/Hide Cancel button
     */
    showCancelButton?: boolean;
    /**
     * Populate values for the Hubspot form
     */
    values?: IHubspotFormValue;
    /**
     * Mark the checkbox as checked in the Hubspot form base on this value.
     */
    selectedValue?: string;
    /**
     * The id for html element render the Hubspot form
     */
    targetId?: string;
    /**
     * The custom css class for submit button
     */
    submitButtonClass?: string;
    /**
     * Close dialog action
     */
    onClose: () => void;
    /**
     * Form submitted callback function
     */
    onFormSubmitted?: () => void;
}

/**
 * @public
 */
export declare interface IHubspotFormValue {
    [key: string]: string | number | boolean;
}

/**
 * @internal
 */
export declare interface IHyperlinkProps {
    href: string;
    text?: string;
    className?: string;
    iconClass?: string;
    onClick?: () => void;
}

/**
 * @internal
 */
export declare interface IIconProps {
    className?: string;
    width?: number;
    height?: number;
    color?: Color;
    colorPalette?: {
        [key: string]: Color | undefined;
    };
}

/**
 * @internal
 */
export declare interface IInsightIconProps {
    visualizationUrl?: string;
    iconProps?: IIconProps;
}

/**
 * @internal
 */
export declare interface IInsightListItemDateConfig {
    isCurrentYear: boolean;
    isToday: boolean;
    isYesterday: boolean;
    date: Date;
}

/**
 * @internal
 */
export declare interface IInsightListItemDateProps {
    config: IInsightListItemDateConfig;
}

/**
 * @internal
 */
export declare interface IInsightListItemProps {
    isLoading?: boolean;
    isLocked?: boolean;
    isSelected?: boolean;
    title?: string;
    description?: string;
    updated?: string;
    type?: string;
    width?: number;
    onClick?: () => void;
    onDelete?: () => void;
    onDescriptionPanelOpen?: () => void;
    showDescriptionPanel?: boolean;
    metadataTimeZone?: string;
}

/**
 * @internal
 */
export declare interface IInvertableSelectAllCheckboxProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    onToggle: () => void;
    isFiltered: boolean;
    totalItemsCount: number;
    isPartialSelection: boolean;
    isVisible: boolean;
}

/**
 * @internal
 */
export declare interface IInvertableSelectItem {
    title?: string;
    isSelected?: boolean;
    onMouseOut?: () => void;
    onMouseOver?: () => void;
    onOnly?: () => void;
    onClick?: () => void;
}

/**
 * @internal
 */
export declare interface IInvertableSelectLimitWarningProps {
    limit: number;
    selectedItemsCount: number;
}

/**
 * @internal
 */
export declare interface IInvertableSelectProps<T> {
    className?: string;
    width?: number;
    height?: number;
    adaptiveWidth?: boolean;
    adaptiveHeight?: boolean;
    isSingleSelect?: boolean;
    items: T[];
    totalItemsCount?: number;
    itemHeight?: number;
    getItemTitle: (item: T) => string;
    getItemKey: (item: T) => string;
    isInverted: boolean;
    selectedItems: T[];
    selectedItemsLimit?: number;
    onSelect?: (items: T[], isInverted: boolean) => void;
    searchString?: string;
    searchPlaceholder?: string;
    onSearch?: (search: string) => void;
    error?: any;
    isLoading?: boolean;
    nextPageItemPlaceholdersCount?: number;
    isLoadingNextPage?: boolean;
    onLoadNextPage?: () => void;
    renderError?: (props: IInvertableSelectRenderErrorProps) => JSX.Element;
    renderLoading?: (props: IInvertableSelectRenderLoadingProps) => JSX.Element;
    renderSearchBar?: (props: IInvertableSelectRenderSearchBarProps) => JSX.Element;
    renderNoData?: (props: IInvertableSelectRenderNoDataProps) => JSX.Element;
    renderItem?: (props: IInvertableSelectRenderItemProps<T>) => JSX.Element;
    renderStatusBar?: (props: IInvertableSelectRenderStatusBarProps<T>) => JSX.Element;
    renderActions?: (props: IInvertableSelectRenderActionsProps) => JSX.Element;
}

/**
 * @internal
 */
export declare interface IInvertableSelectRenderActionsProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    onToggle: () => void;
    totalItemsCount: number;
    isFiltered: boolean;
    isPartialSelection: boolean;
    isVisible: boolean;
}

/**
 * @internal
 */
export declare interface IInvertableSelectRenderErrorProps {
    error?: any;
    height?: number;
}

/**
 * Properties of List item component implementation
 *
 * @internal
 */
export declare interface IInvertableSelectRenderItemProps<T> {
    /**
     * Item of list
     */
    item: T;
    /**
     * Indicate that item is selected
     */
    isSelected: boolean;
    /**
     * Add item to selection callback
     */
    onSelect: () => void;
    /**
     * Remove item from selection
     */
    onDeselect: () => void;
    /**
     * Select item only
     */
    onSelectOnly: () => void;
}

/**
 * @internal
 */
export declare interface IInvertableSelectRenderLoadingProps {
    height?: number;
}

/**
 * @internal
 */
export declare interface IInvertableSelectRenderNoDataProps {
    error?: any;
    height?: number;
}

/**
 * @internal
 */
export declare interface IInvertableSelectRenderSearchBarProps {
    searchString?: string;
    searchPlaceholder?: string;
    onSearch: (searchString: string) => void;
}

/**
 * @internal
 */
export declare interface IInvertableSelectRenderStatusBarProps<T> {
    isInverted: boolean;
    getItemTitle: (item: T) => string;
    selectedItems: T[];
    selectedItemsLimit?: number;
}

/**
 * @internal
 */
export declare interface IInvertableSelectSearchBarProps {
    className?: string;
    isSmall?: boolean;
    searchString?: string;
    searchPlaceholder?: string;
    onSearch: (searchString: string) => void;
}

/**
 * @internal
 */
export declare interface IInvertableSelectStatusBarProps<T> {
    className?: string;
    isInverted: boolean;
    selectedItems: T[];
    getItemTitle: (item: T) => string;
    selectedItemsLimit: number;
}

/**
 * @internal
 */
export declare interface IItemProps {
    checked?: boolean;
    subMenu?: boolean;
    disabled?: boolean;
    children: React_2.ReactNode;
    className?: string;
    style?: React_2.CSSProperties;
    onClick?: (e: React_2.MouseEvent<HTMLDivElement>) => void;
}

/**
 * @internal
 */
export declare interface IItemsWrapperProps {
    smallItemsSpacing?: boolean;
    children: React_2.ReactNode;
    className?: string;
    style?: React_2.CSSProperties;
}

/**
 * @internal
 */
export declare interface ILegacyInvertableListProps<T> {
    className?: string;
    filteredItemsCount: number;
    getItemKey?: (item: T) => string;
    height: number;
    isInverted?: boolean;
    isLoading?: boolean;
    isLoadingClass?: React_2.ElementType;
    isMobile?: boolean;
    itemHeight: number;
    items: ReadonlyArray<T>;
    itemsCount: number;
    limitHitWarningClass?: React_2.ElementType;
    listItemClass?: React_2.ElementType;
    maxSelectionSize: number;
    noItemsFound?: boolean;
    noItemsFoundClass?: React_2.ElementType;
    onRangeChange?: (searchString: string, start: number, end: number) => void;
    onSearch: (searchString: string) => void;
    onSelect?: (selectedElements: Array<T>, isInverted: boolean) => void;
    searchPlaceholder?: string;
    searchString?: string;
    selection?: Array<T>;
    showSearchField?: boolean;
    smallSearch?: boolean;
    tagName?: string;
    width?: number;
    actionsAsCheckboxes?: boolean;
    selectAllCheckbox?: boolean;
    rowItem?: React_2.ReactElement;
}

/**
 * @internal
 */
export declare interface ILegacyListItemProps<T> {
    item?: T;
    listItemClass: React_2.ElementType;
}

/**
 * @internal
 */
export declare interface ILegacyListProps {
    className?: string;
    compensateBorder?: boolean;
    dataSource: any;
    height?: number;
    itemHeight: number;
    itemHeightGetter?: () => number;
    onScroll?: ScrollCallback;
    onScrollStart?: ScrollCallback;
    onSelect?: (item: any) => void;
    scrollToSelected?: boolean;
    rowItem: React_2.ReactElement;
    width?: number;
}

/**
 * @internal
 */
export declare interface ILegacyListState {
    selected: number;
}

/**
 * @internal
 */
export declare interface ILegacyMultiSelectListItemProps {
    intl: IntlShape;
    isLoading?: boolean;
    onMouseOut?: (source: any) => void;
    onMouseOver?: (source: any) => void;
    onOnly?: (source: any) => void;
    onSelect?: (source: any) => void;
    selected?: boolean;
    source?: any;
}

/**
 * @internal
 */
export declare interface ILegacyMultiSelectListProps<T> {
    filtered?: boolean;
    getItemKey?: (item: T) => string;
    height: number;
    isMobile?: boolean;
    isSelected?: (item: T) => boolean;
    isFiltered?: boolean;
    itemHeight: number;
    items: ReadonlyArray<T>;
    itemsCount: number;
    filteredItemsCount?: number;
    listItemClass?: React_2.ElementType;
    maxSelectionSize?: number;
    onItemMouseOut?: () => void;
    onItemMouseOver?: () => void;
    onRangeChange?: ScrollCallback;
    onSelect?: (item: T) => void;
    onSelectAll?: () => void;
    onSelectNone?: () => void;
    onSelectOnly?: (item: T) => void;
    rowItem?: React_2.ReactElement;
    width?: number;
    selectAllCheckbox?: boolean;
    selection?: T[];
    isInverted?: boolean;
    isSearching?: boolean;
    tagName?: string;
}

/**
 * @internal
 */
export declare interface ILegacySingleSelectListItemProps {
    source: any;
    selected: boolean;
    onSelect: (source: any) => void;
    onMouseOver?: (source: any) => void;
    onMouseOut?: (source: any) => void;
}

/**
 * @internal
 */
export declare interface ILegacySingleSelectListItemState {
    isOverflowed: boolean;
}

/**
 * @internal
 */
export declare interface ILegacySingleSelectListProps<T> {
    className?: string;
    getItemKey?: (item: T) => string;
    height: number;
    itemHeight: number;
    items?: T[];
    itemsCount?: number;
    listItemClass?: React_2.ElementType;
    onItemMouseOut?: () => void;
    onItemMouseOver?: () => void;
    onItemMouseEnter?: (id: string) => void;
    onItemMouseLeave?: () => void;
    onRangeChange?: () => void;
    onScrollStart?: () => void;
    onSelect?: (item: T) => void;
    scrollToSelected?: boolean;
    rowItem?: React_2.ReactElement;
    selection?: T;
    width: number;
}

/**
 * @internal
 */
export declare interface IListProps<T> {
    className?: string;
    compensateBorder?: boolean;
    height?: number;
    width?: number;
    items?: T[];
    itemsCount?: number;
    itemHeight?: number;
    maxVisibleItemsCount?: number;
    itemHeightGetter?: (index: number) => number;
    renderItem: (props: IRenderListItemProps<T>) => JSX.Element;
    scrollToItem?: T;
    onScrollStart?: ScrollCallback;
    onScrollEnd?: ScrollCallback;
}

/**
 * @internal
 */
export declare interface ILoadingDotsProps {
    className?: string;
}

/**
 * @internal
 */
export declare interface ILoadingMaskProps {
    className?: string;
    height?: CSSProperties["height"];
    width?: CSSProperties["width"];
    size?: SpinnerSize;
}

/**
 * @internal
 */
export declare interface ILoadingSpinner {
    className?: string;
    color?: string;
}

/**
 * @internal
 */
export declare interface ILocaleSettingProps {
    isChecked: boolean;
    selectedLocal: ILocale;
    onChecked: () => void;
    onLocaleSelected: (locale: ILocale) => void;
}

/**
 * @internal
 */
export declare interface IMeasureNumberFormatOwnProps {
    toggleButton: React_2.ComponentType<IToggleButtonProps>;
    presets: ReadonlyArray<IFormatPreset>;
    separators: ISeparators;
    selectedFormat: string | null;
    setFormat: (format: string | null) => void;
    anchorElementSelector?: string;
    presetsDropdownPositioning?: IPositioning[];
    customFormatDialogPositioning?: IPositioning[];
    defaultCustomFormat?: string;
    documentationLink?: string;
    templates?: ReadonlyArray<IFormatTemplate>;
    locale?: string;
    disabled?: boolean;
}

/**
 * Media query strings created according to configured breakpoints.
 *
 * @internal
 */
export declare interface IMediaQueries {
    /**
     * Is screen classified as smaller than 'sm'?
     */
    "<sm": string;
    /**
     * Is screen classified as 'sm' or larger?
     */
    ">=sm": string;
    /**
     * Is screen classified as 'sm'?
     */
    sm: string;
    /**
     * Is screen classified as 'md' or larger?
     */
    ">=md": string;
    /**
     * Is screen classified as 'md'?
     */
    md: string;
    /**
     * Is screen classified as 'lg' or larger?
     */
    ">=lg": string;
    /**
     * Is screen classified as 'lg'?
     */
    lg: string;
    /**
     * Is screen classified as 'xl' or larger?
     */
    ">=xl": string;
    /**
     * Is screen classified as 'xl'?
     */
    xl: string;
    /**
     * Is screen classified as 'xxl' or larger?
     */
    ">=xxl": string;
    /**
     * Is screen classified as 'xxl'?
     */
    xxl: string;
    /**
     * Is screen classified as a mobile device?
     */
    mobileDevice: string;
    /**
     * Is screen classified as other than mobile device?
     */
    "!mobileDevice": string;
    /**
     * Is screen classified as a desktop device?
     */
    desktop: string;
    /**
     * Is screen classified as smaller than desktop device?
     */
    "<desktop": string;
}

/**
 * @internal
 */
export declare interface IMenuPositionConfig {
    alignment: MenuAlignment;
    spacing: number;
    offset: number;
}

/**
 * @internal
 */
export declare interface IMenuProps extends ISubMenuProps {
    closeOnScroll?: boolean;
    portalTarget?: Element;
    togglerWrapperClassName?: string;
    children: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IMenuStateConfig {
    opened?: boolean;
    defaultOpened?: boolean;
    onOpenedChange?: OnOpenedChange;
}

/**
 * @internal
 */
export declare interface IMenuStateProps extends IMenuStateConfig {
    children: (props: {
        opened: boolean;
        onOpenedChange: OnOpenedChange;
    }) => React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IMessage extends IMessageDefinition {
    id: string;
}

/**
 * @internal
 */
export declare interface IMessageDefinition {
    component?: React.ComponentType;
    showMore?: string;
    showLess?: string;
    errorDetail?: string;
    contrast?: boolean;
    intensive?: boolean;
    values?: FormatMessageParams[1];
    text?: string;
    node?: React.ReactNode;
    type: MessageType;
    /**
     * After how long to automatically remove the message. If set to 0, message is shown until removed manually.
     * Defaults to 2500 ms.
     */
    duration?: number;
}

/**
 * @internal
 */
export declare interface IMessageProps {
    className?: string;
    onClose?(e: React.MouseEvent): void;
    type: MessageType;
    contrast?: boolean;
    intensive?: boolean;
    children?: React.ReactNode;
}

/**
 * @internal
 */
export declare interface IMessagesProps {
    messages: Array<IMessage>;
    onMessageClose?(id: string): void;
}

/**
 * @internal
 */
export declare interface IMessagesState {
    shouldShowMore: boolean;
}

/**
 * @internal
 */
export declare interface IMetadataListProps {
    title?: string;
    list?: IMetadataObjectBase[];
}

/**
 * @internal
 */
export declare interface IMultiSelectListItemProps {
    title?: string;
    isSelected?: boolean;
    onMouseOut?: () => void;
    onMouseOver?: () => void;
    onOnly?: () => void;
    onClick?: () => void;
}

/**
 * @internal
 */
export declare interface IMultiSelectListProps<T> {
    intl: IntlShape;
    height?: number;
    width?: number;
    itemHeight?: number;
    isInverted?: boolean;
    isSearching?: boolean;
    isMobile?: boolean;
    selectAllCheckbox?: boolean;
    selectedItems?: T[];
    items?: T[];
    itemsCount?: number;
    filteredItemsCount?: number;
    isSelected?: (item: T) => boolean;
    maxSelectionSize?: number;
    onScrollEnd?: (visibleRowsStartIndex: number, visibleRowsEndIndex: number) => void;
    onSelectAll?: () => void;
    onSelectNone?: () => void;
    renderItem: (props: IMultiSelectRenderItemProps<T>) => JSX.Element;
    tagName?: string;
    listClassNames?: string;
}

/**
 * @internal
 */
export declare interface IMultiSelectRenderItemProps<T> {
    item: T;
    isSelected: boolean;
}

/**
 * @internal
 */
export declare const INFO_TEXT_COLOR = "#909293";

/**
 * @internal
 */
export declare interface INoDataProps {
    className?: string;
    noDataLabel: string;
    notFoundLabel?: string;
    hasNoMatchingData?: boolean;
}

/**
 * @internal
 */
export declare class Input extends React_2.PureComponent<InputPureProps, InputState> {
    static defaultProps: {
        autofocus: boolean;
        className: string;
        clearOnEsc: boolean;
        disabled: boolean;
        hasError: boolean;
        hasWarning: boolean;
        isSearch: boolean;
        isSmall: boolean;
        maxlength: number;
        onChange: (...args: any[]) => void;
        onEscKeyPress: (...args: any[]) => void;
        onEnterKeyPress: (...args: any[]) => void;
        onBlur: (...args: any[]) => void;
        onFocus: (...args: any[]) => void;
        placeholder: string;
        prefix: string;
        readonly: boolean;
        suffix: string;
        label: string;
        labelPositionTop: boolean;
        value: string;
    };
    inputNodeRef: InputPure;
    constructor(props: InputPureProps);
    UNSAFE_componentWillReceiveProps(nextProps: InputPureProps): void;
    onChange: (value: string | number) => void;
    valueChanged(value: string | number): void;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare class InputPure extends React_2.PureComponent<InputPureProps> implements IDomNative {
    inputNodeRef: HTMLInputElement;
    private autofocusDispatcher;
    static defaultProps: {
        autofocus: boolean;
        className: string;
        clearOnEsc: boolean;
        disabled: boolean;
        hasError: boolean;
        hasWarning: boolean;
        isSearch: boolean;
        isSmall: boolean;
        maxlength: number;
        onChange: (...args: any[]) => void;
        onEscKeyPress: (...args: any[]) => void;
        onEnterKeyPress: (...args: any[]) => void;
        onBlur: (...args: any[]) => void;
        onFocus: (...args: any[]) => void;
        placeholder: string;
        prefix: string;
        readonly: boolean;
        suffix: string;
        label: string;
        labelPositionTop: boolean;
        value: string;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Readonly<InputPureProps>): void;
    onChange: (e: React_2.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React_2.KeyboardEvent) => void;
    onClear: (e?: React_2.ChangeEvent<HTMLInputElement>) => void;
    getLabelClassNames(className: string): string;
    getInputClassNames(): string;
    renderPrefix(prefix: string): React_2.ReactNode;
    renderSuffix(suffix: string): React_2.ReactNode;
    renderLabel(label: string): React_2.ReactNode;
    renderSearch(isSearch: boolean): React_2.ReactNode;
    renderClearIcon(clearOnEsc: boolean): React_2.ReactNode;
    render(): JSX.Element;
    focus(options?: {
        preventScroll?: boolean;
    }): void;
}

/**
 * @internal
 */
export declare interface InputPureProps extends IDomNativeProps {
    className: string;
    clearOnEsc: boolean;
    disabled: boolean;
    hasError: boolean;
    hasWarning: boolean;
    isSearch: boolean;
    isSmall: boolean;
    maxlength: number;
    onChange: (value: string | number, e?: React_2.ChangeEvent<HTMLInputElement>) => void;
    onEscKeyPress: () => void;
    onEnterKeyPress: () => void;
    onBlur: (e: React_2.FocusEvent<HTMLInputElement>) => void;
    onFocus: (e: React_2.FocusEvent<HTMLInputElement>) => void;
    placeholder: string;
    prefix: string;
    readonly: boolean;
    suffix: string;
    label: string;
    labelPositionTop: boolean;
    value: string | number;
}

/**
 * @internal
 */
export declare interface InputState {
    value: string | number;
}

/**
 * @internal
 */
export declare class InputWithNumberFormat extends React_2.PureComponent<InputWithNumberFormatProps, InputWithNumberFormatState> {
    private input;
    static defaultProps: {
        separators: {
            thousand: string;
            decimal: string;
        };
        autofocus: boolean;
        className: string;
        clearOnEsc: boolean;
        disabled: boolean;
        hasError: boolean;
        hasWarning: boolean;
        isSearch: boolean;
        isSmall: boolean;
        maxlength: number;
        onChange: (...args: any[]) => void;
        onEscKeyPress: (...args: any[]) => void;
        onEnterKeyPress: (...args: any[]) => void;
        onBlur: (...args: any[]) => void;
        onFocus: (...args: any[]) => void;
        placeholder: string;
        prefix: string;
        readonly: boolean;
        suffix: string;
        label: string;
        labelPositionTop: boolean;
        value: string;
    };
    constructor(props: InputWithNumberFormatProps);
    UNSAFE_componentWillReceiveProps({ value: newValue }: InputWithNumberFormatProps): void;
    onChange: (value: number, e: React_2.ChangeEvent<HTMLInputElement>) => void;
    onFocus: (e: React_2.FocusEvent<HTMLInputElement>) => void;
    onBlur: (e: React_2.FocusEvent<HTMLInputElement>) => void;
    handleCaretShift(e: React_2.ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare interface InputWithNumberFormatOwnProps {
    separators: Separators;
}

/**
 * @internal
 */
export declare type InputWithNumberFormatProps = InputWithNumberFormatOwnProps & InputPureProps;

/**
 * @internal
 */
export declare interface InputWithNumberFormatState {
    value: number;
    isFocused: boolean;
}

/**
 * @internal
 */
export declare type InsightCodeType = "definition" | "reference";

/**
 * @internal
 */
export declare const InsightIcon: React_2.FC<IInsightIconProps>;

/**
 * @internal
 */
export declare const InsightListItem: React_2.FC<WithIntlProps<IInsightListItemProps & WrappedComponentProps>> & {
    WrappedComponent: React_2.ComponentType<IInsightListItemProps & WrappedComponentProps>;
};

/**
 * @internal
 */
export declare const InsightListItemDate: React_2.FC<IInsightListItemDateProps>;

/**
 * @internal
 */
export declare interface INumericInputProps {
    value: string;
    onValueChanged: (height: string) => void;
}

/**
 * @internal
 */
export declare function InvertableSelect<T>(props: IInvertableSelectProps<T>): JSX.Element;

/**
 * @internal
 */
export declare function InvertableSelectAllCheckbox(props: IInvertableSelectAllCheckboxProps): JSX.Element;

/**
 * @internal
 */
export declare function InvertableSelectItem(props: IInvertableSelectItem): JSX.Element;

/**
 * @internal
 */
export declare function InvertableSelectLimitWarning(props: IInvertableSelectLimitWarningProps): JSX.Element;

/**
 * @internal
 */
export declare function InvertableSelectSearchBar(props: IInvertableSelectSearchBarProps): JSX.Element;

/**
 * @internal
 */
export declare function InvertableSelectStatusBar<T>(props: IInvertableSelectStatusBarProps<T>): JSX.Element;

/**
 * @internal
 */
export declare interface IOffset {
    x?: number;
    y?: number;
}

/**
 * @internal
 */
export declare interface IOnOpenedChangeParams {
    opened: boolean;
    source: "TOGGLER_BUTTON_CLICK" | "OUTSIDE_CLICK" | "SCROLL" | "CLOSE_MENU_RENDER_PROP" | "HOVER_TIMEOUT";
}

/**
 * @internal
 */
export declare interface IOptimalAlignment {
    alignment: Alignment;
    visiblePart?: number;
}

/**
 * Properties for {@link OverlayControllerProvider} component.
 *
 * @internal
 */
export declare interface IOverlayControllerProviderProps {
    /**
     * Overlay controller singleton class for z-index handling.
     */
    overlayController: OverlayController;
    /**
     * React children
     */
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IOverlayProps<T> {
    alignPoints?: IAlignPoint[];
    alignTo?: string | HTMLElement;
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    closeOnMouseDrag?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnParentScroll?: boolean;
    closeOnEscape?: boolean;
    /**
     * Array of refs where user clicks should be ignored
     * and overlay should not be closed by clicking on them
     */
    ignoreClicksOn?: T[];
    ignoreClicksOnByClass?: string[];
    isModal?: boolean;
    onAlign?: (optimalAlign: Alignment) => void;
    onClose?: () => void;
    /**
     * positionType: sameAsTarget
     * Overlay's position is calculated based on the target's position type
     * If target's position is fixed,
     *  - the overlay will also be in fixed position (position: fixed)
     *  - the overlay's offsets (top, left) will be calculated based on
     *    target's offsets (top, left), without scroll offsets
     */
    positionType?: OverlayPositionType;
    shouldCloseOnClick?: (e: Event) => boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    zIndex?: number | undefined;
}

/**
 * @internal
 */
export declare interface IOverlayState {
    alignment: {
        left: number;
        top: number;
        right: number;
        align: string;
    };
    overflow?: string;
    scrollTop?: number;
}

/**
 * @internal
 */
export declare interface IPositioning {
    snapPoints: ISnapPoints;
    offset?: IOffset;
}

/**
 * @internal
 */
export declare interface IReactOptions {
    type: "react";
    componentType: InsightCodeType;
    codeType: CodeLanguageType;
    displayConfiguration: boolean;
    customHeight: boolean;
    height?: string;
    unit?: UnitsType;
}

/**
 * @internal
 */
export declare interface IRegion {
    bottom?: number;
    height: number;
    left: number;
    right?: number;
    top: number;
    width: number;
}

/**
 * @internal
 */
export declare interface IRenderListItemProps<T> {
    rowIndex: number;
    item: T;
    width: number;
    height: number;
    isFirst: boolean;
    isLast: boolean;
}

/**
 * The responsive configuration serves to configure breakpoints and other constants
 * that affect the visual appearance of components by the size of the window or element.
 *
 * @internal
 */
export declare interface IResponsiveConfig {
    breakpoints: IBreakpointsConfig;
}

/**
 * @internal
 */
export declare interface IResponsiveTextProps {
    tagName?: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "dt";
    tagClassName?: string;
    windowResizeRefreshDelay?: number;
    title?: string;
    window?: {
        addEventListener: Window["addEventListener"];
        getComputedStyle: Window["getComputedStyle"];
        removeEventListener: Window["removeEventListener"];
    };
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IRowsIconProps extends IIconProps {
    colorPalette?: {
        normalRow?: Color;
        totalRow?: Color;
    };
}

/**
 * @internal
 */
export declare interface IScrollableItemProps {
    scrollIntoView: boolean;
    className?: string;
    bottomMargin?: number;
    isElementInvisibleCheck?: isElementInvisibleType;
    tagName?: React_2.ElementType;
    onItemScrolled?: () => void;
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface IScrollablePanelProps extends React_2.HTMLAttributes<HTMLDivElement> {
    scrollToVisible?: (element: HTMLElement, container: HTMLElement, bottomMargin: number) => void;
    tagName?: React_2.ElementType;
}

/**
 * @internal
 */
export declare interface IScrollGradientProps {
    size?: number;
    onScroll?: (event: React_2.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    contentClassName?: string;
    backgroundColor?: string;
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare const isDateDatasetHeader: (obj: unknown) => obj is IDateDatasetHeader;

/**
 * @internal
 */
export declare type isElementInvisibleType = (element: HTMLElement, container: HTMLElement) => boolean;

/**
 * @internal
 */
export declare interface ISettingItem {
    className?: string;
    title: string;
    titleTooltipText?: string;
    alignPointTitleTooltip?: {
        align: string;
    }[];
    value: string | ReactNode;
    actionType: ActionType;
    actionValue: string | boolean;
    actionTooltipText?: string;
    alignPointActionTooltip?: {
        align: string;
    }[];
    isLoading?: boolean;
    isDisableAction?: boolean;
    hasDivider?: boolean;
    onAction?: () => void;
}

/**
 * @internal
 */
export declare function isFreemiumEdition(platformEdition: string | undefined): boolean;

/**
 * @internal
 */
export declare const isGranteeGroup: (obj: unknown) => obj is IGranteeGroup;

/**
 * @internal
 */
export declare const isGranteeUser: (obj: unknown) => obj is IGranteeUser;

/**
 * @internal
 */
export declare const isGranularGranteeGroup: (obj: unknown) => obj is IGranularGranteeGroup;

/**
 * @internal
 */
export declare const isGranularGranteeUser: (obj: unknown) => obj is IGranularGranteeUser;

/**
 * @internal
 */
export declare interface IShareDialogBaseProps {
    sharedObject: IAffectedSharedObject;
    currentUser: IUser;
    currentUserPermissions: CurrentUserPermissions;
    isCurrentUserWorkspaceManager: boolean;
    onCancel: () => void;
    onSubmit: (grantees: GranteeItem[], granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[], isUnderLenientControl: boolean, isLocked: boolean) => void;
    onError: (err: Error) => void;
}

/**
 * @internal
 */
export declare interface IShareDialogInteractionData extends ShareDialogInteractionGranteeData {
    type: ShareDialogInteractionType;
    flowId: string;
    currentUserPermission: AccessGranularPermission;
    isCurrentUserWorkspaceManager: boolean;
    isSharedObjectLocked: boolean;
    sharedObjectStatus: ShareStatus;
}

/**
 * @internal
 */
export declare interface IShareDialogLabels {
    accessTypeLabel: string;
    accessRegimeLabel: string;
    removeAccessGranteeTooltip: string;
    removeAccessCreatorTooltip: string;
}

/**
 * @internal
 */
export declare interface IShareDialogProps {
    backend: IAnalyticalBackend;
    workspace: string;
    sharedObject: ISharedObject;
    currentUser: IUser;
    locale?: string;
    onApply: (payload: ISharingApplyPayload) => void;
    onCancel: () => void;
    onError?: (error: GoodDataSdkError) => void;
    onInteraction?: (data: IShareDialogInteractionData) => void;
    isLockingSupported: boolean;
    isCurrentUserWorkspaceManager: boolean;
    labels: IShareDialogLabels;
    currentUserPermissions: CurrentUserPermissions;
}

/**
 * @internal
 */
export declare interface ISharedObject extends IAccessControlAware, IAuditableUsers {
    ref: ObjRef;
}

/**
 * @internal
 */
export declare interface IShareGranteeBaseProps {
    currentUser: IUser;
    isDirty: boolean;
    isLoading: boolean;
    isLockedNow: boolean;
    isUnderLenientControlNow: boolean;
    sharedObject: IAffectedSharedObject;
    grantees: GranteeItem[];
    isCurrentUserWorkspaceManager: boolean;
    currentUserPermissions: CurrentUserPermissions;
    onAddGranteeButtonClick: () => void;
    onGranteeDelete: (grantee: GranteeItem) => void;
    onCancel: () => void;
    onSubmit: () => void;
    onLockChange: (locked: boolean) => void;
    onUnderLenientControlChange: (isUnderLenientControl: boolean) => void;
    onGranularGranteeChange?: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export declare interface IShareGranteeContentProps {
    isLoading: boolean;
    grantees: GranteeItem[];
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    areGranularPermissionsSupported?: boolean;
    onAddGrantee: () => void;
    onDelete: (grantee: GranteeItem) => void;
    onChange?: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export declare interface ISharingApplyPayload {
    shareStatus: ShareStatus;
    isUnderStrictControl: boolean;
    isLocked: boolean;
    granteesToAdd: IAccessGrantee[];
    granteesToDelete: IAccessGrantee[];
}

/**
 * @internal
 */
export declare interface IShortenedTextProps {
    children: string;
    className?: string;
    tagName?: React_2.ElementType;
    tooltipAlignPoints?: IAlignPoint[];
    tooltipVisibleOnMouseOver?: boolean;
    getElement?: (context: any) => Pick<HTMLElement, "scrollWidth" | "getBoundingClientRect">;
    displayTooltip?: boolean;
}

/**
 * @internal
 */
export declare interface IShortenedTextState {
    title: string;
    customTitle: boolean;
}

/**
 * @internal
 */
export declare interface ISimpleSettingWidgetProps {
    title: string;
    currentSettingStatus: string;
    titleTooltip: string;
    helpLinkText?: string;
    helpLinkUrl?: string;
    actionButtonText: string;
    isLoading: boolean;
    onSubmit: () => void;
    onHelpLinkClick?: () => void;
}

/**
 * @internal
 */
export declare interface ISingleSelectListItemProps {
    title?: string;
    icon?: string;
    type?: SingleSelectListItemType;
    className?: string;
    info?: string;
    isSelected?: boolean;
    onClick?: (e: React_2.MouseEvent<HTMLElement>) => void;
    onMouseOver?: (e: React_2.MouseEvent<HTMLElement>) => void;
    onMouseOut?: (e: React_2.MouseEvent<HTMLElement>) => void;
}

/**
 * @internal
 */
export declare interface ISingleSelectListItemState {
    isOverflowed: boolean;
}

/**
 * @internal
 */
export declare interface ISnapPoints {
    parent: SnapPoint;
    child: SnapPoint;
}

/**
 * @internal
 */
export declare interface ISortTypeItem {
    id: SORT_TARGET_TYPE;
    title: string;
    sortDirection: SortDirection;
    type: "alphabetical" | "date" | "default" | "numerical";
    localIdentifier: string;
}

/**
 * @internal
 */
export declare interface ISpinnerProps {
    className?: string;
}

/**
 * @internal
 */
export declare interface IStylingEditorDialogFooterProps extends IDialogBaseProps {
    link: {
        text: string;
        url: string;
    };
    disableSubmit?: boolean;
    showProgressIndicator?: boolean;
    errorMessage?: string;
    onHelpClick?: () => void;
}

/**
 * @internal
 */
export declare interface IStylingEditorDialogProps<T extends StylingPickerItemContent> extends IStylingEditorDialogFooterProps {
    title: string;
    tooltip?: string;
    stylingItem?: IStylingPickerItem<T>;
    examples?: IStylingPickerItem<T>[];
    exampleToColorPreview?: (example: T) => string[];
    locale?: string;
    onExit?: (name: string, definition: string) => void;
    onInvalidDefinition?: (ref: ObjRef) => void;
    showBackButton?: boolean;
}

/**
 * @internal
 */
export declare interface IStylingExampleProps {
    name: string;
    colors: string[];
    onClick: () => void;
}

/**
 * @internal
 */
export declare interface IStylingPickerItem<T extends StylingPickerItemContent> {
    name?: string;
    ref?: ObjRef;
    content: T;
}

/**
 * @internal
 */
export declare interface IStylingSettingWidgetProps<T extends StylingPickerItemContent> {
    title: string;
    defaultItem: IStylingPickerItem<T>;
    customItems: IStylingPickerItem<T>[];
    itemToColorPreview: (itemContent: T) => string[];
    emptyMessage: () => JSX.Element;
    selectedItemRef?: ObjRef;
    isLoading?: boolean;
    titleTooltip?: string;
    footerHelpLink?: string;
    footerHelpTitle?: string;
    footerMobileMessage?: string;
    className?: string;
    shouldDisableCancelButton?: boolean;
    shouldDisableApplyButton?: boolean;
    onApply?: (ref: ObjRef) => void;
    onCancel?: () => void;
    onListActionClick?: () => void;
    onItemEdit?: (modifiedItem: IStylingPickerItem<T>) => void;
    onItemDelete?: (ref: ObjRef) => void;
    locale?: string;
    onHelpClick?: () => void;
    onItemMenuToggle?: (ref: ObjRef) => void;
    onItemSelect?: (ref: ObjRef) => void;
}

/**
 * @internal
 */
export declare interface ISubMenuProps extends IMenuStateConfig, Partial<IMenuPositionConfig> {
    openAction?: OpenAction;
    toggler: React_2.ReactNode;
    children: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface ISyntaxHighlightingInputProps {
    value: string;
    onChange: (value: string) => void;
    onCursor?: (from: number, to: number) => void;
    formatting?: any;
    customOptions?: any;
    className?: string;
}

/**
 * @internal
 */
export declare interface ITab {
    id: string;
}

/**
 * @internal
 */
export declare interface ITabsProps {
    className?: string;
    onTabSelect?: (tab: ITab) => void;
    selectedTabId?: string;
    tabs?: Array<ITab>;
}

/**
 * @internal
 */
export declare interface ITabsState {
    selectedTabId: string;
}

/**
 * @internal
 */
export declare const Item: React_2.FC<IItemProps>;

/**
 * @internal
 */
export declare const ItemsWrapper: React_2.FC<IItemsWrapperProps>;

/**
 * @internal
 */
export declare interface ITextAreaWithSubmitProps {
    className?: string;
    maxLength?: number;
    rows?: number;
    onCancel?: (value: string) => void;
    onEditingStart?: () => void;
    onChange?: (value: string) => void;
    onSubmit: (value: string) => void;
    placeholder?: string;
    scrollToEndOnEditingStart?: boolean;
    defaultValue: string;
    autofocus?: boolean;
    disabled?: boolean;
}

/**
 * @internal
 */
export declare interface ITextAreaWithSubmitState {
    value: string;
    isEditing: boolean;
}

/**
 * @internal
 */
export declare interface ITimepickerOwnProps {
    time: Date;
    className?: string;
    maxVisibleItemsCount?: number;
    onChange?: (selectedTime: Date) => void;
    overlayPositionType?: OverlayPositionType;
    overlayZIndex?: number;
    locale?: string;
    skipNormalizeTime?: boolean;
}

/**
 * @internal
 */
export declare interface IToggleButtonProps {
    text: string;
    isOpened: boolean;
    toggleDropdown: (e: React_2.SyntheticEvent) => void;
    selectedPreset: IFormatPreset;
    disabled?: boolean;
}

/**
 * @internal
 */
export declare interface ITypographyProps {
    tagName: "h1" | "h2" | "h3" | "p";
    children: React_2.ReactNode;
    className?: string;
    onClick?: (e: React_2.MouseEvent) => void;
    title?: string;
}

/**
 * @internal
 */
export declare interface IUiSettings {
    displayAccountPage: boolean;
}

/**
 * @internal
 */
export declare interface IWebComponentsOptions {
    type: "webComponents";
    displayTitle: boolean;
    customTitle: boolean;
    allowLocale: boolean;
    locale?: ILocale;
    customHeight: boolean;
    height?: string;
    unit?: UnitsType;
}

/**
 * @internal
 */
export declare interface IWithBubbleProps {
    showBubble?: boolean;
    alignPoints?: IAlignPoint[];
    bubbleTextId?: string;
    triggerClassName?: string;
}

/**
 * @internal
 */
export declare interface IWorkspacePickerHomeFooterProps {
    href?: string;
    onClick?: (e: React_2.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    className?: string;
    theme?: ITheme;
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare type LabelSize = "small" | "normal";

/**
 * @internal
 * @deprecated This component is deprecated use InvertableList instead
 */
export declare const LegacyInvertableList: <T>(props: ILegacyInvertableListProps<T>) => any;

/**
 * @deprecated  This component is deprecated use List instead
 * @internal
 */
export declare class LegacyList extends Component<ILegacyListProps, ILegacyListState> {
    static defaultProps: Pick<ILegacyListProps, "className" | "onScroll" | "onScrollStart" | "onSelect" | "width" | "height" | "itemHeight" | "itemHeightGetter" | "compensateBorder" | "scrollToSelected">;
    constructor(props: ILegacyListProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onSelect;
    private onScroll;
    private onScrollStart;
    private onScrollEnd;
    private getClassNames;
    private disablePageScrolling;
    private enablePageScrolling;
    private renderCell;
    render(): JSX.Element;
}

/**
 * @internal
 * @deprecated This component is deprecated use ListItem instead
 */
export declare class LegacyListItem<T> extends Component<ILegacyListItemProps<T>> {
    static defaultProps: {
        item: {};
    };
    render(): JSX.Element;
}

/**
 * @internal
 * @deprecated This component is deprecated use MultiSelectList instead
 */
export declare const LegacyMultiSelectList: <T>(props: ILegacyMultiSelectListProps<T>) => any;

/**
 * @internal
 * @deprecated This component is deprecated use MultiSelectListItem instead
 */
export declare class LegacyMultiSelectListItem extends PureComponent<ILegacyMultiSelectListItemProps> {
    static defaultProps: {
        isLoading: boolean;
        onMouseOver: (...args: any[]) => void;
        onMouseOut: (...args: any[]) => void;
        onOnly: (...args: any[]) => void;
        onSelect: (...args: any[]) => void;
        selected: boolean;
        source: {};
    };
    constructor(props: ILegacyMultiSelectListItemProps);
    protected getClassNames(): string;
    protected handleSelect: () => void;
    protected handleMouseOver: () => void;
    protected handleMouseOut: () => void;
    private handleOnly;
    protected renderOnly(): JSX.Element;
    render(): JSX.Element;
}

/**
 * @internal
 * @deprecated This component is deprecated use SingleSelectList instead
 */
export declare class LegacySingleSelectList<T> extends Component<ILegacySingleSelectListProps<T>> {
    static defaultProps: {
        className: string;
        getItemKey: typeof guidFor;
        items: any[];
        itemsCount: number;
        listItemClass: typeof LegacySingleSelectListItem;
        onItemMouseOut: (...args: any[]) => void;
        onItemMouseOver: (...args: any[]) => void;
        onItemMouseEnter: (...args: any[]) => void;
        onItemMouseLeave: (...args: any[]) => void;
        onRangeChange: (...args: any[]) => void;
        onScrollStart: (...args: any[]) => void;
        onSelect: (...args: any[]) => void;
        rowItem: React_2.ReactElement<any, string | React_2.JSXElementConstructor<any>>;
        scrollToSelected: boolean;
        selection: {};
    };
    private getSelectableItems;
    private getClassNames;
    private getRowItem;
    private getDataSource;
    render(): JSX.Element;
}

/**
 * @internal
 * @deprecated This component is deprecated use SingleSelectListItem instead
 */
export declare class LegacySingleSelectListItem extends Component<ILegacySingleSelectListItemProps, ILegacySingleSelectListItemState> {
    static defaultProps: {
        onMouseOver: (...args: any[]) => void;
        onMouseOut: (...args: any[]) => void;
    };
    readonly state: {
        isOverflowed: boolean;
    };
    node: HTMLSpanElement;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private getClassNames;
    private checkOverflow;
    private handleSelect;
    private handleMouseOver;
    private handleMouseOut;
    private renderTitle;
    private renderIcon;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare function List<T>(props: IListProps<T>): JSX.Element;

/**
 * @internal
 */
export declare const LOADING_HEIGHT = 100;

/**
 * @internal
 */
export declare const LoadingDots: React_2.FC<ILoadingDotsProps>;

/**
 * @internal
 */
export declare const LoadingMask: React_2.FC<ILoadingMaskProps>;

/**
 * @internal
 */
export declare const LoadingSpinner: React_2.FC<ILoadingSpinner>;

/**
 * @internal
 */
export declare const LocaleSetting: React_2.VFC<ILocaleSettingProps>;

/**
 * @internal
 */
export declare class MeasureNumberFormat extends React_2.PureComponent<IMeasureNumberFormatOwnProps> {
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare type MeasureSortSuggestion = {
    type: "measureSort";
} & IMeasureSortTarget;

/**
 * @internal
 */
export declare const Menu: React_2.FC<IMenuProps>;

/**
 * @internal
 */
export declare type MenuAlignment = ["bottom", "right"] | ["bottom", "left"] | ["top", "right"] | ["top", "left"] | ["right", "top"] | ["right", "bottom"] | ["left", "top"] | ["left", "bottom"];

/**
 * @internal
 */
export declare const Message: React_2.FC<IMessageProps>;

/**
 * @internal
 */
export declare const Messages: React_2.FC<IMessagesProps>;

/**
 * @internal
 */
export declare type MessageType = "success" | "progress" | "error" | "warning";

/**
 * @internal
 */
export declare const MetadataList: React_2.FC<IMetadataListProps>;

/**
 * @internal
 */
export declare const MultiSelectList: React_2.FC<WithIntlProps<IMultiSelectListProps<unknown>>> & {
    WrappedComponent: React_2.ComponentType<IMultiSelectListProps<unknown>>;
};

/**
 * @internal
 */
export declare class MultiSelectListItem extends PureComponent<IMultiSelectListItemProps> {
    render(): JSX.Element;
    private getClassNames;
    private renderOnly;
}

/**
 * @internal
 */
export declare const NoData: React_2.FC<INoDataProps>;

/**
 * @internal
 * export normalizeTime function for use outside this component
 * return 7:30 if time is 7:25
 * return 8:00 if time is 7:35
 * return 0:00 if time is 23:45
 */
export declare function normalizeTime(time: Date): Date;

/**
 * @internal
 */
export declare const NumericInput: React_2.FC<INumericInputProps>;

/**
 * @internal
 */
export declare type OnOpenedChange = (params: IOnOpenedChangeParams) => void;

/**
 * @internal
 */
export declare type OpenAction = "click" | "hover";

/**
 * @internal
 */
export declare const otherHeader: IDateDatasetHeader;

/**
 * @internal
 */
export declare class Overlay<T = HTMLElement> extends React_2.Component<IOverlayProps<T>, IOverlayState> {
    static defaultProps: Partial<IOverlayProps<any>>;
    private overlayRef;
    private containerRef;
    private resizeHandler;
    private portalNode;
    private isComponentMounted;
    private clickedInside;
    private id;
    private alignmentTimeoutId;
    static contextType: React_2.Context<OverlayController_2>;
    context: React_2.ContextType<typeof OverlayContext>;
    constructor(props: IOverlayProps<T>);
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IOverlayProps<T>): void;
    shouldComponentUpdate(nextProps: IOverlayProps<T>, nextState: IOverlayState): boolean;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    align: () => void;
    private clearAlignmentTimeout;
    private alignWithTimeout;
    private onMaskClick;
    protected getZIndex(): number | undefined;
    protected getOverlayStyles: () => React_2.CSSProperties;
    private getOverlayClasses;
    /**
     * Add CSS classes to overlay wrapper, so they can be used
     * for position of arrows and stuff
     */
    private getAlignClasses;
    private createPortalNode;
    private removePortalNodeAfterAllTreeUnmount;
    private isSameAsTargetPosition;
    private isEventOnParent;
    private shouldCloseOnClick;
    private hasClickedOnIgnoredNode;
    private isAligned;
    private isElementInChildOverlay;
    onDocumentMouseDown(e: React_2.MouseEvent): void;
    closeOnParentScroll(e: React_2.MouseEvent): void;
    closeOnMouseDrag: () => void;
    closeOnOutsideClick(e: Event): void;
    closeOnEscape(e: React_2.KeyboardEvent): void;
    private updateListeners;
    private addListeners;
    private removeListeners;
    private renderMask;
}

/**
 * @internal
 */
export declare const OverlayContext: React_2.Context<OverlayController>;

/**
 * Overlay stacking controller.
 *
 * @internal
 */
export declare class OverlayController {
    private initialZIndex;
    private overlays;
    private constructor();
    static getInstance(initialZIndex?: number): OverlayController;
    /**
     * Adds the overlay record to the map.
     *
     * @param uuid - given overlay uuid.
     */
    addOverlay(uuid: string): void;
    /**
     * Get maximum z-Index from current opened overlays
     * @returns
     */
    private getMaxZIndex;
    /**
     * Getter for z-index of the given overlay.
     *
     * @remarks
     * If the entry in the overlays map is not available, the initial z-index is used.
     *
     * @param uuid - unique identifier of the overlay.
     * @returns
     */
    getZIndex(uuid: string): number;
    /**
     * Removes given overlay from the overlays map.
     *
     * @param uuid - unique identifier of the overlay
     */
    removeOverlay(uuid: string): void;
}

/**
 * Component for injecting {@link OverlayController} into all components in the application.
 *
 * @internal
 */
export declare const OverlayControllerProvider: React_2.FC<IOverlayControllerProviderProps>;

/**
 * @internal
 */
export declare type OverlayPositionType = "absolute" | "fixed" | SameAsTargetPosition;

/**
 * @internal
 */
export declare function preselectDateDataset<T extends IDateDataset>(dateDatasets: T[], recommendedDate: T): Array<T | IDateDatasetHeader>;

/**
 * @internal
 */
export declare enum PresetType {
    CUSTOM_FORMAT = "customFormat"
}

/**
 * @internal
 */
export declare const recommendedHeader: IDateDatasetHeader;

/**
 * @internal
 */
export declare const relatedHeader: IDateDatasetHeader;

/**
 * @internal
 */
export declare const ResponsiveContextProvider: React_2.Provider<IResponsiveConfig>;

/**
 * Classification of the screen size according to its size with respect to the set breakpoints.
 *
 * @internal
 */
export declare type ResponsiveScreenType = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

/**
 * @internal
 */
export declare const ResponsiveText: React_2.FC<IResponsiveTextProps>;

/**
 * @internal
 */
export declare type SameAsTargetPosition = "sameAsTarget";

/**
 * @internal
 */
export declare const ScrollableItem: React_2.FC<IScrollableItemProps>;

/**
 * @internal
 */
export declare const ScrollablePanel: React_2.ForwardRefExoticComponent<IScrollablePanelProps & React_2.RefAttributes<HTMLDivElement>>;

/**
 * @internal
 */
export declare type ScrollCallback = (visibleRowsStartIndex: number, visibleRowsEndIndex: number) => void;

/**
 * @internal
 */
export declare const scrollContextDefault: {
    scrollIntoView: (_element: HTMLElement, _bottomMargin?: number, _isElementInvisibleCheck?: isElementInvisibleType) => void;
};

/**
 * @internal
 */
export declare const ScrollGradient: React_2.FC<IScrollGradientProps>;

/**
 * @internal
 */
export declare type SelectedTime = {
    h: number;
    m: number;
};

/**
 * @internal
 */
export declare const Separator: React_2.FC;

/**
 * @internal
 */
export declare type Separators = {
    thousand: string;
    decimal: string;
};

/**
 * @internal
 */
export declare const SettingItem: React_2.FC<ISettingItem>;

/**
 * @internal
 */
export declare const ShareDialog: React_2.FC<IShareDialogProps>;

/**
 * @internal
 */
export declare const ShareDialogBase: React_2.FC<IShareDialogBaseProps>;

/**
 * @internal
 */
export declare type ShareDialogInteractionGranteeData = {
    isCurrentUserSelfUpdating?: boolean;
    isExistingGrantee?: boolean;
    granteeType?: "user" | "group";
    granteeEffectivePermission?: AccessGranularPermission;
    granteeUpdatedPermission?: AccessGranularPermission;
    numberOfAvailableGrantees?: number;
};

/**
 * @internal
 */
export declare type ShareDialogInteractionType = "SHARE_DIALOG_OPENED" | "SHARE_DIALOG_CLOSED" | "SHARE_DIALOG_SAVED" | "SHARE_DIALOG_PERMISSIONS_DROPDOWN_OPENED" | "SHARE_DIALOG_PERMISSIONS_CHANGED" | "SHARE_DIALOG_GRANTEE_REMOVED" | "SHARE_DIALOG_GRANTEE_ADDED" | "SHARE_DIALOG_AVAILABLE_GRANTEE_LIST_OPENED";

/**
 * @internal
 */
export declare const ShareGranteeBase: React_2.FC<IShareGranteeBaseProps>;

/**
 * To make this component work, parent container needs this:
 *      max-width: Xpx;
 *      white-space: nowrap;
 *
 * and the component itself needs:
 *      display: inline-block;
 *      width: 100%;
 *      white-space: nowrap;
 */
/**
 * @internal
 */
export declare class ShortenedText extends PureComponent<IShortenedTextProps, IShortenedTextState> {
    static defaultProps: Pick<IShortenedTextProps, "className" | "tagName" | "tooltipAlignPoints" | "tooltipVisibleOnMouseOver" | "getElement" | "displayTooltip">;
    textRef: React_2.RefObject<HTMLElement>;
    constructor(props: IShortenedTextProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IShortenedTextProps): void;
    componentDidUpdate(): void;
    checkTitle(): void;
    recomputeShortening(): void;
    renderTextWithBubble(): React_2.ReactNode;
    renderText(): React_2.ReactNode;
    render(): React_2.ReactNode;
}

/**
 * @internal
 */
export declare function shouldEnableNewNavigation(featureFlags: ISettings): boolean;

/**
 * @internal
 */
export declare function shouldHidePPExperience(featureFlags: ISettings): boolean;

/**
 * This widget toggles one setting on/off.
 *
 * @internal
 */
export declare const SimpleSettingWidget: React_2.FC<ISimpleSettingWidgetProps>;

/**
 * @internal
 */
export declare class SingleSelectListItem extends Component<ISingleSelectListItemProps, ISingleSelectListItemState> {
    private titleRef;
    constructor(props: ISingleSelectListItemProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    private checkOverflow;
    private getClassNames;
    render(): JSX.Element;
    private renderTitle;
    private renderIcon;
    private renderSeparatorItem;
    private renderHeaderItem;
    private renderInfo;
}

/**
 * @internal
 */
export declare type SingleSelectListItemType = "header" | "separator";

/**
 * @internal
 */
export declare enum SnapPoint {
    TopLeft = "tl",
    TopCenter = "tc",
    TopRight = "tr",
    CenterLeft = "cl",
    CenterCenter = "cc",
    CenterRight = "cr",
    BottomLeft = "bl",
    BottomCenter = "bc",
    BottomRight = "br"
}

/**
 * @internal
 */
export declare enum SORT_TARGET_TYPE {
    ALPHABETICAL_ASC = "alphabetical-asc",
    ALPHABETICAL_DESC = "alphabetical-desc",
    DATE_ASC = "date-asc",
    DATE_DESC = "date-desc",
    DEFAULT = "default",
    NUMERICAL_ASC = "numerical-asc",
    NUMERICAL_DESC = "numerical-desc"
}

/**
 * @internal
 */
export declare function sortDateDatasets<T extends IDateDataset>(dateDatasets: T[], recommendedDate?: T, unrelatedDate?: T): Array<T | IDateDatasetHeader>;

/**
 * @internal
 */
export declare class Spinner extends PureComponent<ISpinnerProps> {
    static defaultProps: {
        className: string;
    };
    generateSpinnerTicks(): ReactNode[];
    render(): ReactNode;
}

/**
 * @internal
 */
export declare type SpinnerSize = "large" | "small";

/**
 * @internal
 */
export declare const StylingEditorDialog: <T extends StylingPickerItemContent>(props: IStylingEditorDialogProps<T>) => JSX.Element;

/**
 * @internal
 */
export declare const StylingEditorDialogFooter: (props: IStylingEditorDialogFooterProps) => JSX.Element;

/**
 * @internal
 */
export declare const StylingExample: (props: IStylingExampleProps) => JSX.Element;

/**
 * @internal
 */
export declare type StylingPickerItemContent = ITheme | IColorPalette;

/**
 * @internal
 */
export declare const StylingSettingWidget: <T extends StylingPickerItemContent>(props: IStylingSettingWidgetProps<T>) => JSX.Element;

/**
 * @internal
 */
export declare const SubMenu: React_2.FC<ISubMenuProps>;

/**
 * @internal
 */
export declare const SyntaxHighlightingInput: React_2.FC<ISyntaxHighlightingInputProps>;

/**
 * @internal
 */
export declare class Tabs extends Component<ITabsProps, ITabsState> {
    static defaultProps: {
        className: string;
        onTabSelect: (...args: any[]) => void;
        selectedTabId: string;
        tabs: ITab[];
    };
    constructor(props: ITabsProps);
    private selectTab;
    private renderTab;
    private renderTabs;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare class TextAreaWithSubmit extends Component<ITextAreaWithSubmitProps, ITextAreaWithSubmitState> {
    static defaultProps: {
        className: string;
        maxLength: number;
        rows: number;
        onCancel: {
            <T>(value: T): T;
            (): undefined;
        };
        onEditingStart: {
            <T>(value: T): T;
            (): undefined;
        };
        onChange: {
            <T>(value: T): T;
            (): undefined;
        };
        placeholder: string;
        scrollToEndOnEditingStart: boolean;
        autofocus: boolean;
        disabled: boolean;
    };
    private readonly root;
    private readonly textarea;
    private focusTimeout;
    constructor(props: ITextAreaWithSubmitProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(newProps: ITextAreaWithSubmitProps): void;
    componentWillUnmount(): void;
    onDocumentClick: (e: MouseEvent) => void;
    onSelectStart(e: React_2.MouseEvent): void;
    onKeyDown: (e: React_2.KeyboardEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onChange: (e: React_2.ChangeEvent<HTMLTextAreaElement>) => void;
    edit: (_e?: React_2.MouseEvent<HTMLDivElement>) => void;
    isClickOutsideTextarea(clickedTarget: EventTarget): boolean;
    isMultiLine(): boolean;
    removeListeners(): void;
    selectAndFocus: () => void;
    renderTextarea(style?: {}): ReactNode;
    renderTextAreaWithSubmitEdit(): ReactNode;
    render(): ReactNode;
}

/**
 * @internal
 */
export declare class Timepicker extends React_2.PureComponent<ITimepickerOwnProps> {
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare const ToastMessageContext: React_2.Context<ToastMessageContextType>;

/**
 * @internal
 */
export declare const ToastMessageContextProvider: React_2.FC<{
    children?: React_2.ReactNode;
}>;

/**
 * @internal
 */
export declare interface ToastMessageContextType {
    messages: IMessage[];
    removeMessage: (id: string) => void;
    removeAllMessages: () => void;
    addMessage: (message: IMessageDefinition) => string;
}

/**
 * @internal
 */
export declare const ToastMessages: React_2.FC;

/**
 * @internal
 */
export declare function transform2Dropdown<T extends IDateDataset>(dateDatasets: T[]): Array<T | IDateDatasetHeader>;

/**
 * @internal
 */
export declare type TUTMContent = "main_menu_help_documentation" | "main_menu_help_university" | "main_menu_help_community" | "main_menu_help_support" | "main_menu_help_ticket" | "main_menu_help_slack";

/**
 * @internal
 */
export declare const Typography: React_2.FC<ITypographyProps>;

/**
 * @internal
 */
export declare type UnitsType = "px" | "%" | "rem" | "em";

/**
 * @internal
 */
export declare const unrelatedHeader: IDateDatasetHeader;

/**
 * Hook, testing whether screen width matches provided media query.
 *
 * @internal
 * @param mediaQueryName - media query name to test
 * @returns boolean
 */
export declare const useMediaQuery: (mediaQueryName: keyof IMediaQueries) => boolean;

/**
 * Hook to get current instance of the {@link OverlayController}
 *
 * @returns an instance of the {@link OverlayController}
 *
 * @internal
 */
export declare const useOverlayController: () => OverlayController;

/**
 * Hook to get the css `z-index` property for given overlay.
 *
 * @param uuid - uuid of the overlay.
 *
 * @returns - `z-index` for given overlay.
 *
 * @internal
 */
export declare const useOverlayZIndex: (uuid: string) => number;

/**
 * Hook to consume responsive context.
 *
 * @internal
 */
export declare const useResponsiveContext: () => IResponsiveConfig;

/**
 * @internal
 */
export declare const useScrollContext: () => {
    scrollIntoView: (_element: HTMLElement, _bottomMargin?: number, _isElementInvisibleCheck?: isElementInvisibleType) => void;
};

/**
 * @internal
 */
export declare const useToastMessage: () => UseToastMessageType;

/**
 * @internal
 */
export declare interface UseToastMessageType {
    addSuccess: AddMessageType;
    addProgress: AddMessageType;
    addWarning: AddMessageType;
    addError: AddMessageType;
    removeMessage: (id: string) => void;
    removeAllMessages: () => void;
}

/**
 * @internal
 */
export declare function withBubble<T>(WrappedComponent: React_2.ComponentType<T>): React_2.FC<T & IWithBubbleProps>;

/**
 * @internal
 */
export declare const WorkspacePickerHomeFooter: React_2.ComponentType<Omit<IWorkspacePickerHomeFooterProps, "theme" | "themeIsLoading">>;

export { }
