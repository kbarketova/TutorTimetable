import React from 'react';

import {Field} from '../../components/Field';
import {InfoRow} from '../../components/InfoRow';
import {Modal} from '../../components/Modal';
import {Switcher} from '../../components/Switcher';
import {Txt} from '../../components/Txt';
import {useFlag} from '../../hooks/use-flag';
import {TimePicker} from './TimePicker';
import {TOnAddActivity} from './types';
import students from '../../store/students';
import {Colors} from '../../constants';

type TProps = Readonly<{
  onAddActivity: TOnAddActivity;
  onClose: () => void;
}>;

const getRandomId = (): number => {
  return Math.floor(Math.random() * 1000);
};

const AddActivity_: React.FC<TProps> = ({onAddActivity, onClose}: TProps) => {
  const [isSaveEnabled, , , toggleSave] = useFlag();

  const [theme, setTheme] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');

  const addActivity = React.useCallback(() => {
    const id = getRandomId();
    if (!students.isUniqueId(id)) {
      console.log('Id is not unique, please try again');
      return;
    }
    onAddActivity({
      theme,
      time,
      student: {
        name,
        id: getRandomId(),
      },
      address,
    });
    onClose();
  }, [address, name, onAddActivity, onClose, theme, time]);

  return (
    <Modal label="Добавить" onPress={addActivity} onClose={onClose}>
      <Txt
        size="lg"
        alignSelf="center"
        fontWeight="bold"
        color={Colors.grayDark}>
        Занятие
      </Txt>
      <InfoRow
        isEditable
        label="Имя"
        value={name}
        onChangeText={setName}
        labelAdditional="Телефон"
        valueAdditional={phone}
        onChangeTextAdditional={setPhone}
        flex={0}
      />
      <Field
        label="Тема занятия"
        value={theme}
        onChangeText={setTheme}
        flex={0}
      />
      <TimePicker time={time} onChangeTime={setTime} />
      <Field label="Адрес" value={address} onChangeText={setAddress} flex={0} />
      <Switcher
        isEnabled={isSaveEnabled}
        onToggle={toggleSave}
        label="Сохранить данные ученика"
      />
    </Modal>
  );
};

export const AddActivity = React.memo(AddActivity_);
