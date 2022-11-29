import React from 'react';

import {Field} from '../../components/Field';
import {InfoRow} from '../../components/InfoRow';
import {Modal} from '../../components/Modal';
import {Switcher} from '../../components/Switcher';
import {useFlag} from '../../hooks/use-flag';
import {TimePicker} from './TimePicker';
import {TOnAddActivity, TOnEditActivity} from './types';
import students from '../../store/students';
import {IActivity} from '../../types';
import {Button} from '../../components/Button';
import {Colors} from '../../constants';
import {Flex} from '../../components/Flex';
import {Input} from '../../components/Input';

type TProps = Readonly<{
  onAdd: TOnAddActivity;
  onEdit: TOnEditActivity;
  onClose: () => void;
  activity?: IActivity | null;
}>;

const getRandomId = (): number => {
  return Math.floor(Math.random() * 1000);
};

const AddActivity_: React.FC<TProps> = ({
  onAdd,
  onEdit,
  onClose,
  activity = null,
}: TProps) => {
  const [isSaveEnabled, , , toggleSave] = useFlag();
  const [isNewStudent, setIsNewStudent, setIsOldStudent] = useFlag();
  const isOldActivity: boolean = !!activity?.activityId;

  const [theme, setTheme] = React.useState<string>(activity?.theme ?? '');
  const [name, setName] = React.useState<string>(activity?.student.name ?? '');
  const [phone, setPhone] = React.useState<string>(
    activity?.student.phone ?? '',
  );
  const [address, setAddress] = React.useState<string>(
    activity?.student.address ?? '',
  );
  const [time, setTime] = React.useState<string>(activity?.time ?? '');

  const isSaveDisabled: boolean =
    !time ||
    !name ||
    (!!activity &&
      activity.theme === theme &&
      activity.time === time &&
      activity.address === address);

  const editActivity = React.useCallback(() => {
    if (!activity) {
      return;
    }

    if (isSaveDisabled) {
      console.log('nothing changed');
      return;
    }
    onEdit({
      ...activity,
      theme,
      time,
      address,
    });
    onClose();
  }, [activity, address, isSaveDisabled, onClose, onEdit, theme, time]);

  const addActivity = React.useCallback(() => {
    if (!time) {
      return;
    }
    const id = getRandomId();
    if (!students.isUniqueId(id)) {
      console.log('Id is not unique, please try again');
      return;
    }
    onAdd({
      theme,
      time,
      student: {
        name,
        id,
        phone,
      },
      address,
    });
    onClose();
  }, [address, name, onAdd, onClose, phone, theme, time]);

  return (
    <Modal
      onConfirm={isOldActivity ? editActivity : addActivity}
      onClose={onClose}
      isConfirmDisabled={isSaveDisabled}
      header="Занятие">
      <Flex flexDirection="row" flex={0} margin="10 0">
        <Button
          onPress={setIsOldStudent}
          label="Выбрать ученика"
          labelColor={!isNewStudent ? Colors.sky : Colors.grayDark}
        />
        <Button
          onPress={setIsNewStudent}
          label="Новый ученик"
          labelColor={isNewStudent ? Colors.sky : Colors.grayDark}
        />
      </Flex>
      <Input
        onChangeText={setTheme}
        value={theme}
        placeholder="Тема занятия"
        backgroundColor="gainsboro"
        borderRadius={10}
        padding="0 10"
        margin="10 0"
      />
      <Input
        onChangeText={setAddress}
        value={address}
        placeholder="Адрес"
        backgroundColor="gainsboro"
        borderRadius={10}
        padding="0 10"
      />
      <InfoRow
        isEditable={!isOldActivity && isNewStudent}
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
      <TimePicker isEditable time={time} onChangeTime={setTime} />
      <Field label="Адрес" value={address} onChangeText={setAddress} flex={0} />
      {!isOldActivity && isNewStudent && (
        <Switcher
          isEnabled={isSaveEnabled}
          onToggle={toggleSave}
          label="Сохранить данные ученика"
        />
      )}
    </Modal>
  );
};

export const AddActivity = React.memo(AddActivity_);
