import React from 'react';
import {ViewStyle} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Screen} from '../../components/Screen';

type TProps = Readonly<{}>;

const style: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(0,0,0,0.5)',
};

const Timetable_: React.FC<TProps> = ({}: TProps) => {
  return (
    <Screen padding={0} margin={0}>
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
        style={style}
      />
    </Screen>
  );
};

export const Timetable = React.memo(Timetable_);
