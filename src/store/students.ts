import uniqWith from 'lodash/fp/uniqWith';
import {action, makeObservable, observable} from 'mobx';
import {IStudentItemList, IStudentItem} from '../types';

class Students {
  list: IStudentItemList = [];
  constructor() {
    makeObservable(this, {
      list: observable,
      addStudent: action,
      isUniqueId: action,
    });
  }
  addStudent(student: IStudentItem) {
    const listUpdated = [...this.list, student];
    this.list = uniqWith(function (a, b) {
      return a.id === b.id;
    }, listUpdated);
  }

  isUniqueId(id: number) {
    const ids = this.list.map(x => x.id);
    return !ids.includes(id);
  }
}

export default new Students();
