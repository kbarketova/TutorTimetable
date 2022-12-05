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
import {IActivity, TActivityList} from '../../types';
import {useFlag} from '../../hooks/use-flag';
import {AddActivity} from './AddActivity';
import {TOnAddActivity, TOnEditActivity, TOnManageActivity} from './types';
import {getRandomColor} from '../../utils/get-random-color';

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

  const [activity, setActivity] = React.useState<IActivity | null>(null);
  const [date, setDate] = React.useState<string>(moment().format('YYYY-MM-DD'));

  const sorted: TActivityList = timetable.activities[date]
    ? getSortedByTime(timetable.activities[date].slice())
    : [];

  const closeActivityModal = React.useCallback(() => {
    closeAdd();
    setActivity(null);
  }, [closeAdd]);

  const pressDay = React.useCallback<TPressDate>(day => {
    setDate(day.dateString);
  }, []);

  const editActivity = React.useCallback<TOnEditActivity>(data => {
    timetable.editActivity(data);
  }, []);

  const addActivityForDate = React.useCallback<TOnAddActivity>(
    data => {
      timetable.addActivity({
        ...data,
        activityId: `${date}|${data.student.id}`,
        date,
        color: getRandomColor(),
      });
    },
    [date],
  );

  const openActivity = React.useCallback<TOnManageActivity>(
    id => {
      const actv = timetable.getActivity(id);
      if (!actv) {
        console.log('cannot open activity');
        return;
      }
      setActivity(actv);
      openAdd();
    },
    [openAdd],
  );

  const removeActivity = React.useCallback<TOnManageActivity>(id => {
    timetable.removeActivity(id);
  }, []);

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
          keyExtractor={item => item.activityId}
          renderItem={({item}) => (
            <Activity
              item={item}
              onEdit={openActivity}
              onRemove={removeActivity}
            />
          )}
        />
      </Flex>
      <TouchableOpacity
        style={buttonStyle}
        activeOpacity={0.6}
        onPress={openAdd}>
        <Txt color="white" size="lg">
          +
        </Txt>
      </TouchableOpacity>
      {isAddVisible && (
        <AddActivity
          onAdd={addActivityForDate}
          onEdit={editActivity}
          onClose={closeActivityModal}
          activity={activity}
        />
      )}
    </Screen>
  );
});

export const Timetable = React.memo(Timetable_);
