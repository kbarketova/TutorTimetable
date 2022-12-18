import React from 'react';

import {Contacts} from './Contacts';
import {InfoRow} from '../../../components/InfoRow';
import {Colors} from '../../../constants';
import {Txt} from '../../../components/Txt';
import students from '../../../store/students';
import {
  ICommonInfo,
  IParentInfo,
  IStudentInfo,
  IStudentItem,
} from '../../../types';
import {Modal} from '../../../components/Modal';

type TProps = Readonly<{
  onClose: () => void;
  student: IStudentItem | null;
}>;

const StudentDetails_: React.FC<TProps> = ({
  onClose,
  student = null,
}: TProps) => {
  const [studentName, setStudentName] = React.useState<string>(
    student?.name ?? '',
  );
  const [studentLastName, setStudentLastName] = React.useState<string>(
    student?.lastName ?? '',
  );
  const [studentPhone, setStudentPhone] = React.useState<string>(
    student?.phone ?? '',
  );
  const [studentEmail, setStudentEmail] = React.useState<string>(
    student?.email ?? '',
  );

  const [parentName, setParentName] = React.useState<string>(
    student?.parent?.name ?? '',
  );
  const [parentLastName, setParentLastName] = React.useState<string>(
    student?.parent?.lastName ?? '',
  );
  const [parentPhone, setParentPhone] = React.useState<string>(
    student?.parent?.phone ?? '',
  );
  const [grade, setGrade] = React.useState<string>(
    student?.commonInfo?.grade ?? '',
  );
  const [price, setPrice] = React.useState<string>(
    student?.commonInfo?.price ?? '',
  );
  const [address, setAddress] = React.useState<string>(student?.address ?? '');
  const [summary, setSummary] = React.useState<string>(
    student?.commonInfo?.summary ?? '',
  );

  const isSaveDisabled: boolean = !studentName;
  const saveStudent = React.useCallback(() => {
    const parent: IParentInfo | undefined =
      parentName || parentPhone
        ? {
            name: parentName,
            lastName: parentLastName,
            phone: parentPhone,
          }
        : undefined;
    const commonInfo: ICommonInfo | undefined =
      price || summary
        ? {
            price,
            summary,
          }
        : undefined;

    const item: IStudentInfo = {
      name: studentName,
      lastName: studentLastName,
      address,
      phone: studentPhone,
      email: studentEmail,
      parent: parent,
      commonInfo,
    };

    if (student !== null) {
      students.editStudent({...student, ...item});
    } else {
      students.addStudent(item);
    }
    onClose();
  }, [
    address,
    onClose,
    parentLastName,
    parentName,
    parentPhone,
    price,
    student,
    studentEmail,
    studentLastName,
    studentName,
    studentPhone,
    summary,
  ]);

  return (
    <Modal
      onConfirm={saveStudent}
      onClose={onClose}
      isConfirmDisabled={isSaveDisabled}>
      <Contacts
        header="Контакты ученика"
        name={studentName}
        onChangeName={setStudentName}
        lastName={studentLastName}
        onChangeLastName={setStudentLastName}
        phone={studentPhone}
        onChangePhone={setStudentPhone}
        email={studentEmail}
        onChangeEmail={setStudentEmail}
      />
      <InfoRow
        label="Класс"
        value={grade}
        onChangeText={setGrade}
        labelAdditional="Адрес"
        valueAdditional={address}
        onChangeTextAdditional={setAddress}
        flexAdditional={4}
      />
      <Contacts
        header="Контакты родителя"
        name={parentName}
        onChangeName={setParentName}
        lastName={parentLastName}
        onChangeLastName={setParentLastName}
        phone={parentPhone}
        onChangePhone={setParentPhone}
      />
      <Txt
        padding="5 0"
        alignSelf="center"
        fontWeight="bold"
        color={Colors.grayDark}>
        Общая информация
      </Txt>
      <InfoRow
        label="Цена"
        value={price}
        onChangeText={setPrice}
        labelAdditional="Описание"
        valueAdditional={summary}
        onChangeTextAdditional={setSummary}
        flexAdditional={4}
      />
    </Modal>
  );
};

export const StudentDetails = React.memo(StudentDetails_);
