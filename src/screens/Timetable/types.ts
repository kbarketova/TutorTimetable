import {IActivity, IStudentItem} from '../../types';

type TActivity = Readonly<{
  theme: string;
  time: string;
  student: IStudentItem;
  address: string;
}>;

export type TOnAddActivity = (data: TActivity) => void;

export type TOnOpenActivity = (id: string) => void;

export type TOnEditActivity = (activity: IActivity) => void;
