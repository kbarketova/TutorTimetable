import React from 'react';

import {Contacts} from './Contacts';
import {InfoRow} from '../../components/InfoRow';
import {Colors} from '../../constants';
import {Txt} from '../../components/Txt';
import students from '../../store/students';
import {ICommonInfo, IParentInfo, IStudentItem} from '../../types';
import {getRandomId} from '../../utils/get-random-id';
import {Modal} from '../../components/Modal';

const StudentDetails_: React.FC<{}> = () => {
  const [studentName, setStudentName] = React.useState<string>('Иван Иванов');
  const [studentPhone, setStudentPhone] = React.useState<string>('');
  const [studentEmail, setStudentEmail] =
    React.useState<string>('test@gmail.com');

  const [parentName, setParentName] = React.useState<string>('Иван Иванов');
  const [parentPhone, setParentPhone] = React.useState<string>('');
  const [grade, setGrade] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [summary, setSummary] = React.useState<string>('');

  const addStudent = React.useCallback(() => {
    const id = getRandomId();
    if (!students.isUniqueId(id)) {
      console.log('Id is not unique, please try again');
      return;
    }
    const parent: IParentInfo | undefined =
      parentName || parentPhone
        ? {
            name: parentName,
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

    const student: IStudentItem = {
      name: studentName,
      id,
      address,
      phone: studentPhone,
      parent: parent,
      commonInfo,
    };
    students.addStudent(student);
  }, [
    address,
    parentName,
    parentPhone,
    price,
    studentName,
    studentPhone,
    summary,
  ]);

  return (
    <Modal onConfirm={addStudent} onClose={() => console.log('onClose')}>
      <Contacts
        header="Контакты ученика"
        name={studentName}
        onChangeName={setStudentName}
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
