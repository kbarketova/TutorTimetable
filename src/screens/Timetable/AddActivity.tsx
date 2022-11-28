import React from 'react';

import {Field} from '../../components/Field';
import {InfoRow} from '../../components/InfoRow';
import {Modal} from '../../components/Modal';
import {Switcher} from '../../components/Switcher';
import {Txt} from '../../components/Txt';
import {useFlag} from '../../hooks/use-flag';
import {TimePicker} from './TimePicker';
import {TOnAddActivity, TOnEditActivity} from './types';
import students from '../../store/students';
import {Colors} from '../../constants';
import {IActivity} from '../../types';

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
  const isEdit: boolean = !!activity?.activityId;

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
    !!activity &&
    activity.theme === theme &&
    activity.time === time &&
    activity.address === address;

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
      onConfirm={isEdit ? editActivity : addActivity}
      onClose={onClose}
      isConfirmDisabled={isSaveDisabled}>
      <Txt
        size="lg"
        alignSelf="center"
        fontWeight="bold"
        color={Colors.grayDark}>
        Занятие
      </Txt>
      <InfoRow
        isEditable={!isEdit}
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
      {!isEdit && (
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
