export type TKeyboard =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'url';

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

export interface ICommonInfo {
  price: string;
  summary?: string;
  grade?: string;
}

export interface IParentInfo {
  name: string;
  lastName?: string;
  phone?: string;
}

export interface IStudentInfo {
  name: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  parent?: IParentInfo;
  commonInfo?: ICommonInfo;
}

export interface IStudentItem extends IStudentInfo {
  id: number;
  color: string;
}

export enum AddressOptions {
  Unknown = 0,
  Remote = 1,
  StudentPlace = 2,
  TeacherPlace = 3,
}

export interface IActivityRaw {
  theme: string;
  time: string;
  addressId: AddressOptions; // lessons can have their own address. If not defined, then use students address
  studentId: number;
  color: string;
}

export const AddressOptionsDesc: Readonly<Record<AddressOptions, string>> = {
  [AddressOptions.Unknown]: 'Не выбрано',
  [AddressOptions.Remote]: 'Удаленно',
  [AddressOptions.TeacherPlace]: 'По адресу учителя',
  [AddressOptions.StudentPlace]: 'По адресу ученика',
};

export interface IActivity extends IActivityRaw {
  activityId: string;
  date: string;
}

export type TActivityList = Array<IActivity>;

export type TTimetable = Record<string, TActivityList>;

export type IStudentItemList = Array<IStudentItem>;

export type TSelectItem = Readonly<{
  id: number;
  name: string;
}>;

export type TSelectItemList = ReadonlyArray<TSelectItem>;

export type DrawerParamList = {
  Timetable: undefined;
  StudentsList: undefined;
  Login: undefined;
};
