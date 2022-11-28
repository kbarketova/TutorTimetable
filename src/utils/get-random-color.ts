import {TimetableColorsList} from '../constants';

export const getRandomColor = (): string => {
  const maxVal = TimetableColorsList.length;
  const itemAt = Math.floor(Math.random() * maxVal);
  return TimetableColorsList[itemAt];
};
