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

export type TFontSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';

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
