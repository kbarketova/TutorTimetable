import {IStudentItem} from '../../types';

type TActivity = Readonly<{
  theme: string;
  time: string;
  student: IStudentItem;
  address: string;
}>;

export type TOnAddActivity = (data: TActivity) => void;
