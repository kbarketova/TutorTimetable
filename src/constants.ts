export const Colors = {
  sky: 'deepskyblue',
  skyDark: 'steelblue',
  // grayLight: '#b3b1b5',
  grayLight: 'gainsboro',
  grayDark: '#767577',
  grayGhost: '#f4f3f4',
  seaGreen: 'darkseagreen',
  green: 'forestgreen',
  greenLight: 'mediumturquoise',
  orangeDark: 'peru',
  pink: 'plum',
  darkBlue: 'royalblue',
};

export const TimetableColorsList: ReadonlyArray<string> = [
  Colors.seaGreen,
  Colors.green,
  Colors.greenLight,
  Colors.orangeDark,
  Colors.pink,
  Colors.darkBlue,
];

export const BlueThemeInput = {
  backgroundColor: 'white',
  borderColorDisabled: Colors.grayLight,
  borderColorEnabled: Colors.grayLight,
  textColorDisabled: Colors.grayLight,
  textColorEnabled: '#000000',
  focused: Colors.sky,
};

export const BlueThemeSwither = {
  trackColorEnabled: Colors.grayLight,
  trackColorDisabled: Colors.grayDark,
  thumbColorEnabled: Colors.sky,
  thumbColorDisabled: Colors.grayGhost,
};

export type TLesson = Readonly<{
  theme: string;
  date: string; // 2022-11-16
}>;

export type TStudentItem = Readonly<{
  name: string;
  nextLesson: TLesson;
  address: string;
  phone: string;
  secondaryPhone: string;
  secondaryPhoneOwner: string;
}>;

export type TStudentItemList = ReadonlyArray<TStudentItem>;

export const student1: TStudentItem = {
  name: 'Маргарита Иванова',
  nextLesson: {
    theme: 'Opганическая химия',
    date: '2022-11-10',
  },
  address: 'ул. Караимская 32, кв 8',
  phone: '+76244568906',
  secondaryPhone: '',
  secondaryPhoneOwner: '',
};

export const student2: TStudentItem = {
  name: '',
  nextLesson: {
    theme: 'Новейшая химия',
    date: '2022-11-02',
  },
  address: 'ул. Рабочая 51/45, кв 7',
  phone: '',
  secondaryPhone: '+76788568951',
  secondaryPhoneOwner: 'Зульфия Махмедова',
};

export const student3: TStudentItem = {
  name: '',
  nextLesson: {
    theme: 'Алхимия и математика',
    date: '2022-11-18',
  },
  address: 'ул. Лесная 51/45, кв 40',
  phone: '+76900568978',
  secondaryPhone: '',
  secondaryPhoneOwner: '',
};

export const student4: TStudentItem = {
  name: '',
  nextLesson: {
    theme: 'Алхимия и математика',
    date: '2022-11-18',
  },
  address: 'ул. Морская 125, кв 10',
  phone: '+76900568978',
  secondaryPhone: '+78000878999',
  secondaryPhoneOwner: '',
};

export const studentsList: TStudentItemList = [
  student1,
  student2,
  student3,
  student4,
];
