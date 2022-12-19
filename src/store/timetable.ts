import {action, computed, makeObservable, observable} from 'mobx';
import {IActivity, TTimetable} from '../types';
import uniqWith from 'lodash/fp/uniqWith';

class Timetable {
  activities: TTimetable = {};
  constructor() {
    makeObservable(this, {
      activities: observable,
      addActivity: action,
      editActivity: action,
      removeActivity: action,
      getActivity: action,
      markedDates: computed,
    });
  }

  addActivity(activity: IActivity) {
    const list = [...(this.activities[activity.date] || []), activity];

    this.activities[activity.date] = uniqWith(function (a, b) {
      return a.activityId === b.activityId;
    }, list);
  }

  editActivity(activity: IActivity) {
    const {date, activityId} = activity;
    const acts = this.activities[date] || [];
    const itemAt = acts.findIndex(x => x.activityId === activityId);

    if (itemAt < 0) {
      return;
    }
    this.activities[date] = [
      ...acts.slice(0, itemAt),
      activity,
      ...acts.slice(itemAt + 1),
    ];
  }

  removeActivity(activityId: string) {
    const date = activityId.split('|')[0];
    this.activities[date] = this.activities[date].filter(
      x => x.activityId !== activityId,
    );
  }

  getActivity(activityId: string) {
    const date = activityId.split('|')[0];
    return this.activities[date].find(x => x.activityId === activityId);
  }

  get markedDates() {
    return Object.entries(this.activities).reduce((prev, curr) => {
      const [key, values] = curr;
      return {
        ...prev,
        [key]: {
          dots: values.map(x => ({key: x.activityId, color: x.color})),
        },
      };
    }, {});
  }
}

export default new Timetable();
