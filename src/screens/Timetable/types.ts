import {IActivity, IActivityRaw, IStudentItem} from '../../types';

export type TOnAddActivity = (
  data: IActivityRaw,
  student: IStudentItem | null,
) => void;

export type TOnManageActivity = (id: string) => void;

export type TOnEditActivity = (activity: IActivity) => void;
