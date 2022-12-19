import React from 'react';

import moment from 'moment';
import {Modal} from '../../components/Modal';
import {useFlag} from '../../hooks/use-flag';
import {TimePicker} from './TimePicker';
import {TOnAddActivity, TOnEditActivity} from './types';
import students from '../../store/students';
import {
  AddressOptions,
  IActivity,
  IActivityRaw,
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
import {PressableField} from '../../components/PressableField';

type TProps = Readonly<{
  onAdd: TOnAddActivity;
  onEdit: TOnEditActivity;
  onClose: () => void;
  activity?: IActivity | null;
  student?: IStudentItem | null;
}>;

const createStudentItem = (student: IStudentItem): TSelectItem => ({
  id: student.id,
  name: `${student.name} ${student.lastName}`,
});

const AddActivity_: React.FC<TProps> = ({
  onAdd,
  onEdit,
  onClose,
  activity = null,
  student = null,
}: TProps) => {
  const hasStudentsList: boolean = students.list.length > 0;

  const [isNewStudent, setIsNewStudent, setIsOldStudent] = useFlag(
    !hasStudentsList,
  );
  const isOldActivity: boolean = !!activity?.activityId;

  const [theme, setTheme] = React.useState<string>(activity?.theme ?? '');
  const [name, setName] = React.useState<string>(student?.name ?? '');
  const [lastName, setLastName] = React.useState<string>(
    student?.lastName ?? '',
  );
  const [phone, setPhone] = React.useState<string>(student?.phone ?? '');
  const [address, setAddress] = React.useState<string>(student?.address ?? '');
  const [time, setTime] = React.useState<string>(
    activity?.time ?? moment().format('hh:mm'),
  );

  const [selectedAddressId, setSelectedAddressId] =
    React.useState<AddressOptions>(
      activity?.addressId ?? AddressOptions.Unknown,
    );

  const [selectedId, setSelectedId] = React.useState<number>(0);
  const isSaveDisabled: boolean =
    !time ||
    !name ||
    (!!activity &&
      activity.theme === theme &&
      activity.time === time &&
      activity.addressId === selectedAddressId);

  const actAddressOptions = React.useMemo<TSelectItemList>(() => {
    const list = [
      {name: 'Не выбрано', id: AddressOptions.Unknown},
      {name: 'Удаленно', id: AddressOptions.Remote},
      {name: 'По адресу учителя', id: AddressOptions.TeacherPlace},
    ];

    if (student?.address) {
      return [
        ...list,
        {
          name: 'По адресу ученика',
          id: AddressOptions.StudentPlace,
        },
      ];
    }
    return list;
  }, [student?.address]);

  const selectStudent = React.useCallback<(id: number) => void>(
    id => {
      const item = students.getStudent(activity?.studentId ?? -1);

      if (!item) {
        return;
      }
      setSelectedId(id);
      setName(item.name);
      setPhone(item.phone ?? '');
    },
    [activity?.studentId],
  );

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
      addressId: selectedAddressId,
    });
    onClose();
  }, [
    activity,
    isSaveDisabled,
    onClose,
    onEdit,
    selectedAddressId,
    theme,
    time,
  ]);

  const addActivity = React.useCallback(() => {
    if (!time) {
      return;
    }
    const id = getRandomId();
    if (!students.isUniqueId(id)) {
      console.log('Id is not unique, please try again');
      return;
    }
    const color = getRandomColor();
    const data: IActivityRaw = {
      theme,
      time,
      addressId: selectedAddressId,
      studentId: id,
      color,
    };

    onAdd(data, {
      id,
      color,
      name: name.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      address,
    });
    onClose();
  }, [
    address,
    lastName,
    name,
    onAdd,
    onClose,
    phone,
    selectedAddressId,
    theme,
    time,
  ]);

  const selectList = React.useMemo<TSelectItemList>(
    () => students.list.map(createStudentItem),
    [],
  );

  const actAddressDescription = React.useMemo<string>(
    () =>
      actAddressOptions.find(x => x.id === selectedAddressId)?.name ??
      actAddressOptions[AddressOptions.Unknown].name,
    [actAddressOptions, selectedAddressId],
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
          <ModalInput
            onChangeText={setAddress}
            value={address}
            placeholder="Адрес"
          />
        </>
      ) : (
        <Selector
          isReadonly={isOldActivity}
          label="Ученик"
          value={name ? `${name} ${lastName} ${phone}` : 'Не выбран'}
          data={selectList}
          selectedId={selectedId}
          onSelect={selectStudent}
        />
      )}
      <Selector
        label="Место проведения"
        value={actAddressDescription}
        data={actAddressOptions}
        selectedId={selectedAddressId}
        onSelect={setSelectedAddressId}
      />
      {isOldActivity && selectedAddressId === AddressOptions.StudentPlace && (
        <PressableField
          isReadonly
          label="Адрес ученика"
          value={student?.address ?? ''}
        />
      )}
      <TimePicker time={time} onChangeTime={setTime} />
      <ModalInput
        onChangeText={setTheme}
        value={theme}
        placeholder="Тема занятия"
      />
    </Modal>
  );
};

export const AddActivity = React.memo(AddActivity_);
