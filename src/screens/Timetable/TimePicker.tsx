import React from 'react';

import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {useFlag} from '../../hooks/use-flag';
import {Flex} from '../../components/Flex';

type TProps = Readonly<{
  time: string;
  onChangeTime: (value: string) => void;
}>;

type TOnChangeTime = (date: Date) => void;

const TimePicker_: React.FC<TProps> = ({time, onChangeTime}: TProps) => {
  const [isDatePickerOpen, openDatePicker, closeDatePicker] = useFlag();

  const dateTime = React.useMemo<Date>(() => {
    const d = new Date();
    if (time) {
      const [hours, mins] = time.split(':');
      d.setHours(+hours, +mins, 0, 0);
    }
    return d;
  }, [time]);

  const changeTime = React.useCallback<TOnChangeTime>(
    date => {
      const timeNew: string = moment(date.getTime()).format('HH:mm');
      onChangeTime(timeNew);
      closeDatePicker();
    },
    [closeDatePicker, onChangeTime],
  );

  return (
    <>
      <Flex flexDirection="row" alignItems="center" flex={0} margin="10 0 0 0">
        <Button
          onPress={openDatePicker}
          iconName="clock"
          flex={0}
          margin="0 10 0 0"
        />
        <Input value={time} onChangeText={onChangeTime} size="sm" />
      </Flex>
      {isDatePickerOpen && (
        <DatePicker
          date={dateTime}
          open={isDatePickerOpen}
          onConfirm={changeTime}
          onCancel={closeDatePicker}
          modal
          mode="time"
          is24hourSource="locale"
          locale="ru"
          androidVariant="nativeAndroid"
        />
      )}
    </>
  );
};

export const TimePicker = React.memo(TimePicker_);
