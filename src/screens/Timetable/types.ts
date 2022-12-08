import {IActivity, IStudentItem} from '../../types';

export type TActivity = Readonly<{
  theme: string;
  time: string;
  student: IStudentItem;
  address: string;
}>;

export type TOnAddActivity = (saveStudent: boolean, data: TActivity) => void;

export type TOnManageActivity = (id: string) => void;

export type TOnEditActivity = (activity: IActivity) => void;
