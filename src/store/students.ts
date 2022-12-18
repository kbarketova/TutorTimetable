import {action, makeObservable, observable} from 'mobx';
import {IStudentItemList, IStudentItem, IStudentInfo} from '../types';
import {getRandomColor} from '../utils/get-random-color';
import {getRandomId} from '../utils/get-random-id';

class Students {
  list: IStudentItemList = [];
  constructor() {
    makeObservable(this, {
      list: observable,
      addStudent: action,
      addFullStudent: action,
      removeStudent: action,
      editStudent: action,
      isUniqueId: action,
    });
  }
  addStudent(info: IStudentInfo) {
    const id = getRandomId();
    const itemAt = this.list.findIndex(x => {
      return x.id === id;
    });
    if (itemAt < 0) {
      const color = getRandomColor();
      this.list = [...this.list, {...info, id, color}];
    }
  }
  addFullStudent(student: IStudentItem) {
    const itemAt = this.list.findIndex(x => {
      return x.id === student.id;
    });
    if (itemAt < 0) {
      this.list = [...this.list, student];
    }
  }
  removeStudent(id: number) {
    if (!this.list) {
      return;
    }
    this.list = this.list.filter(x => x.id !== id);
  }
  editStudent(student: IStudentItem) {
    const itemAt = this.list.findIndex(x => x.id === student.id);
    if (itemAt < 0) {
      return;
    }
    this.list = [
      ...this.list.slice(0, itemAt),
      student,
      ...this.list.slice(itemAt + 1),
    ];
  }
  isUniqueId(id: number) {
    const ids = this.list.map(x => x.id);
    return !ids.includes(id);
  }
}

export default new Students();
