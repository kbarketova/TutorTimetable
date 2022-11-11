import moment from 'moment';
import {IActivity, TActivityList} from '../../types';

function compareFn(a: IActivity, b: IActivity) {
  const dateA = moment(`${a.date} ${a.time}`);
  const dateB = moment(`${b.date} ${b.time}`);

  if (dateA.isBefore(dateB)) {
    return -1;
  }
  if (dateA.isAfter(dateB)) {
    return 1;
  }
  return 0;
}

export const getSortedByTime = (list: TActivityList): TActivityList => {
  return list.sort(compareFn);
};
