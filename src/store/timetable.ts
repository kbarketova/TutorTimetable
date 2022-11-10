import {action, computed, makeObservable, observable} from 'mobx';
import {IActivity, TTimetable} from '../types';
import uniqWith from 'lodash/fp/uniqWith';

class Timetable {
  activities: TTimetable = {};
  constructor() {
    makeObservable(this, {
      activities: observable,
      addActivity: action,
      removeActivity: action,
      markedDates: computed,
    });
  }

  addActivity(activity: IActivity) {
    const list = [activity, ...(this.activities[activity.date] || [])];

    this.activities[activity.date] = uniqWith(function (a, b) {
      return a.activityId === b.activityId;
    }, list);
  }

  removeActivity(date: string, activityId: string) {
    this.activities[date] = this.activities[date].filter(
      x => x.activityId !== activityId,
    );
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
