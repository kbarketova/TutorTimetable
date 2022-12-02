import React from 'react';

import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useFlag} from '../../hooks/use-flag';
import {PressableField} from '../../components/PressableField';

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
      <PressableField label="Время" value={time} onPress={openDatePicker} />
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
          confirmText="Выбрать"
          cancelText="Отмена"
          title={null}
        />
      )}
    </>
  );
};

export const TimePicker = React.memo(TimePicker_);
