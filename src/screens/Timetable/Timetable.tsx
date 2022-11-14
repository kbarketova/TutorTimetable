import React from 'react';
import {FlatList, TouchableOpacity, ViewStyle} from 'react-native';

import {observer} from 'mobx-react';
import {Calendar} from 'react-native-calendars';
import {DateData} from 'react-native-calendars/src/types';
import {Screen} from '../../components/Screen';
import timetable from '../../store/timetable';
import moment from 'moment';
import {Activity} from './Activity';
import {Flex} from '../../components/Flex';
import {Txt} from '../../components/Txt';
import {getSortedByTime} from './get-sorted-by-time';
import {TActivityList} from '../../types';
import {useFlag} from '../../hooks/use-flag';
import {AddActivity} from './AddActivity';

const style: ViewStyle = {
  borderBottomWidth: 2,
  borderBottomColor: 'rgba(180,180,180,0.4)',
};

const buttonStyle: ViewStyle = {
  position: 'absolute',
  backgroundColor: 'deepskyblue',
  width: 50,
  height: 50,
  borderRadius: 50 / 2,
  bottom: 50,
  right: 20,
  alignItems: 'center',
  justifyContent: 'center',
};

type TPressDate = (day: DateData) => void;

const Timetable_: React.FC<{}> = observer(() => {
  const markedDates = timetable.markedDates;

  const [isAddVisible, openAdd, closeAdd] = useFlag();
  const [date, setDate] = React.useState<string>(moment().format('YYYY-MM-DD'));

  const sorted: TActivityList = timetable.activities[date]
    ? getSortedByTime(timetable.activities[date].slice())
    : [];

  const pressDay = React.useCallback<TPressDate>(day => {
    setDate(day.dateString);
  }, []);

  const addActivityForDate = React.useCallback(() => {
    timetable.addActivity({
      activityId: '18:10|10', // <time>|<studentId>`
      theme: 'Органическая химия. Новейшие разделы.',
      date,
      time: '18:10',
      student: {
        name: 'Маргарита Иванова',
        id: 10,
      },
      color: '#4b0082',
      address: 'ул. Караимская 32, кв 8',
    });
  }, [date]);

  return (
    <Screen padding={0}>
      <Calendar
        markingType={'multi-dot'}
        initialDate={date ?? undefined}
        onDayPress={pressDay}
        style={style}
        markedDates={markedDates}
      />
      <Flex padding={15} color="white">
        <FlatList
          data={sorted}
          renderItem={({item}) => <Activity {...item} />}
        />
      </Flex>
      <TouchableOpacity
        style={buttonStyle}
        activeOpacity={0.6}
        onPress={openAdd}>
        <Txt color="white" size="xlg">
          +
        </Txt>
      </TouchableOpacity>
      {isAddVisible && (
        <AddActivity onAddActivity={addActivityForDate} onClose={closeAdd} />
      )}
    </Screen>
  );
});

export const Timetable = React.memo(Timetable_);
