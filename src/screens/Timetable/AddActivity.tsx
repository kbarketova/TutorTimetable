import React from 'react';

import moment from 'moment';
import {Modal} from '../../components/Modal';
import {useFlag} from '../../hooks/use-flag';
import {TimePicker} from './TimePicker';
import {TOnAddActivity, TOnEditActivity} from './types';
import students from '../../store/students';
import {
  AddressOptions,
  AddressOptionsDesc,
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
  const [color, setColor] = React.useState<string>(student?.color ?? '');
  const [time, setTime] = React.useState<string>(
    activity?.time ?? moment().format('hh:mm'),
  );

  const [selectedAddressId, setSelectedAddressId] =
    React.useState<AddressOptions>(
      activity?.addressId ?? AddressOptions.Unknown,
    );

  const [selectedId, setSelectedId] = React.useState<number>(student?.id ?? -1);
  const isSaveDisabled: boolean =
    !time ||
    !name ||
    (!!activity &&
      activity.theme === theme &&
      activity.time === time &&
      activity.addressId === selectedAddressId);

  const actAddressOptions = React.useMemo<TSelectItemList>(() => {
    const list = [
      {
        name: AddressOptionsDesc[AddressOptions.Unknown],
        id: AddressOptions.Unknown,
      },
      {
        name: AddressOptionsDesc[AddressOptions.Remote],
        id: AddressOptions.Remote,
      },
      {
        name: AddressOptionsDesc[AddressOptions.TeacherPlace],
        id: AddressOptions.TeacherPlace,
      },
    ];

    if (address) {
      return [
        ...list,
        {
          name: AddressOptionsDesc[AddressOptions.StudentPlace],
          id: AddressOptions.StudentPlace,
        },
      ];
    }
    return list;
  }, [address]);

  const selectStudent = React.useCallback<(id: number) => void>(id => {
    const item = students.getStudent(id ?? -1);
    console.log('🚀 ~ file: AddActivity.tsx:100 ~ item', item);

    if (!item) {
      return;
    }
    setSelectedId(id);
    setName(item.name);
    setColor(item.color);
    setPhone(item.phone ?? '');
    setAddress(item.address ?? '');
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
    if (selectedId >= 0) {
      const data: IActivityRaw = {
        theme,
        time,
        addressId: selectedAddressId,
        studentId: selectedId,
        color,
      };
      onAdd(data, null);
      onClose();
      return;
    }

    // case for new student
    const id = getRandomId();
    if (!students.isUniqueId(id)) {
      console.log('Id is not unique, please try again');
      return;
    }
    const newColor: string = getRandomColor();
    const newStudent: IStudentItem = {
      id,
      color: newColor,
      name: name.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      address: address.trim(),
    };

    onAdd(
      {
        theme,
        time,
        addressId: selectedAddressId,
        studentId: id,
        color: newColor,
      },
      newStudent,
    );
    onClose();
  }, [
    address,
    color,
    lastName,
    name,
    onAdd,
    onClose,
    phone,
    selectedAddressId,
    selectedId,
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
      {selectedAddressId === AddressOptions.StudentPlace && (
        <PressableField
          isReadonly
          label="Адрес ученика"
          value={address ?? ''}
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
