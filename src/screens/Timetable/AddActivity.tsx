import React from 'react';

import moment from 'moment';
import {Modal} from '../../components/Modal';
import {Switcher} from '../../components/Switcher';
import {useFlag} from '../../hooks/use-flag';
import {TimePicker} from './TimePicker';
import {TActivity, TOnAddActivity, TOnEditActivity} from './types';
import students from '../../store/students';
import {
  IActivity,
  IStudentItem,
  TSelectItem,
  TSelectItemList,
} from '../../types';
import {Button} from '../../components/Button';
import {Colors} from '../../constants';
import {Flex} from '../../components/Flex';
import {Selector} from '../../components/Selector';
import {ModalInput} from '../../components/ModalInput';
import {getRandomId} from '../../utils/get-random-id';
import {getRandomColor} from '../../utils/get-random-color';

type TProps = Readonly<{
  onAdd: TOnAddActivity;
  onEdit: TOnEditActivity;
  onClose: () => void;
  activity?: IActivity | null;
}>;

const createItem = (student: IStudentItem): TSelectItem => ({
  id: student.id,
  name: `${student.name} ${student.lastName}`,
});

const AddActivity_: React.FC<TProps> = ({
  onAdd,
  onEdit,
  onClose,
  activity = null,
}: TProps) => {
  const hasStudentsList: boolean = students.list.length > 0;

  const [isSaveEnabled, , , toggleSave] = useFlag();
  const [isNewStudent, setIsNewStudent, setIsOldStudent] = useFlag(
    !hasStudentsList,
  );
  const isOldActivity: boolean = !!activity?.activityId;

  const [theme, setTheme] = React.useState<string>(activity?.theme ?? '');
  const [name, setName] = React.useState<string>(activity?.student.name ?? '');
  const [lastName, setLastName] = React.useState<string>(
    activity?.student.lastName ?? '',
  );
  const [phone, setPhone] = React.useState<string>(
    activity?.student.phone ?? '',
  );
  const [address, setAddress] = React.useState<string>(
    activity?.student.address ?? '',
  );
  const [time, setTime] = React.useState<string>(
    activity?.time ?? moment().format('hh:mm'),
  );

  const [selectedId, setSelectedId] = React.useState<number>(0);
  const isSaveDisabled: boolean =
    !time ||
    !name ||
    (!!activity &&
      activity.theme === theme &&
      activity.time === time &&
      activity.address === address);

  const setStudent = React.useCallback<(id: number) => void>(id => {
    const student = students.list.find(x => x.id === id);

    if (!student) {
      return;
    }
    setSelectedId(id);
    setName(student.name);
    setPhone(student.phone ?? '');
  }, []);

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
    const data: TActivity = {
      theme,
      time,
      student: {
        id,
        color: getRandomColor(),
        name: name.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      },
      address,
    };

    onAdd(isSaveEnabled, data);
    onClose();
  }, [
    address,
    isSaveEnabled,
    lastName,
    name,
    onAdd,
    onClose,
    phone,
    theme,
    time,
  ]);

  const selectList = React.useMemo<TSelectItemList>(
    () => students.list.map(createItem),
    [],
  );

  return (
    <Modal
      onConfirm={isOldActivity ? editActivity : addActivity}
      onClose={onClose}
      isConfirmDisabled={isSaveDisabled}
      header="Занятие">
      {hasStudentsList && !isOldActivity && (
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
      )}
      {!isOldActivity && isNewStudent ? (
        <>
          <ModalInput onChangeText={setName} value={name} placeholder="Имя" />
          <ModalInput
            onChangeText={setLastName}
            value={lastName}
            placeholder="Фамилия"
          />
          <ModalInput
            onChangeText={setPhone}
            value={phone}
            placeholder="Телефон"
            keyboardType="number-pad"
          />
        </>
      ) : (
        <Selector
          isReadonly={isOldActivity}
          label="Ученик"
          value={name ? `${name} ${lastName} ${phone}` : 'Не выбран'}
          data={selectList}
          selectedId={selectedId}
          onSelect={setStudent}
        />
      )}
      <TimePicker time={time} onChangeTime={setTime} />
      <ModalInput
        onChangeText={setAddress}
        value={address}
        placeholder="Адрес"
      />
      <ModalInput
        onChangeText={setTheme}
        value={theme}
        placeholder="Тема занятия"
      />
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
