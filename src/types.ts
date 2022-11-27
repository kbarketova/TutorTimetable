export type TFlexDirection =
  | 'column'
  | 'row'
  | 'column-reverse'
  | 'row-reverse';

export type TJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type TFlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export type TSize = 'sm' | 'md' | 'lg';

export type TAlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'center'
  | 'space-between'
  | 'space-around';

export type TAlignItems =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline';

export type TAlignSelf =
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

export type TFontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type TPropsTxt = Readonly<{
  color?: string | null;
  size?: TSize | null;
  flex?: number | null;
  alignSelf?: TAlignSelf | null;
  fontWeight?: TFontWeight | null;
  padding?: number | string | null;
}>;

export interface IStudentItem {
  name: string;
  id: number;
  address?: string;
  phone?: string;
  secondaryPhone?: string;
  secondaryPhoneOwner?: string;
}

export interface IActivity {
  activityId: string;
  theme: string;
  date: string;
  time: string;
  student: IStudentItem;
  color: string;
  address?: string; // lessons can have their own address. If not defined, then use students address
}

export type TActivityList = Array<IActivity>;

export type TTimetable = Record<string, TActivityList>;

export type IStudentItemList = Array<IStudentItem>;
