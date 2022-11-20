import React from 'react';

import {Field} from '../../components/Field';
import {InfoRow} from '../../components/InfoRow';
import {Modal} from '../../components/Modal';
import {Switcher} from '../../components/Switcher';
import {Txt} from '../../components/Txt';
import {useFlag} from '../../hooks/use-flag';
import {TimePicker} from './TimePicker';

type TProps = Readonly<{
  onAddActivity: () => void;
  onClose: () => void;
}>;

const AddActivity_: React.FC<TProps> = ({onAddActivity, onClose}: TProps) => {
  const [isSaveEnabled, , , toggleSave] = useFlag();

  const [theme, setTheme] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');
  const addActivity = React.useCallback(() => {
    onAddActivity();
    onClose();
  }, [onAddActivity, onClose]);

  return (
    <Modal label="Добавить" onPress={addActivity} onClose={onClose}>
      <Txt size="lg" alignSelf="center" fontWeight="bold">
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
