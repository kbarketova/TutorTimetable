import React from 'react';

import {Field} from '../../components/Field';
import {Screen} from '../../components/Screen';
import {Contacts} from './Contacts';
import {InfoRow} from './InfoRow';

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
  const [commentary, setCommentary] = React.useState<string>('');

  const isEditMode: boolean = true;

  return (
    <Screen>
      <Contacts
        label="Контакты ученика"
        name={studentName}
        onChangeName={setStudentName}
        phone={studentPhone}
        onChangePhone={setStudentPhone}
        email={studentEmail}
        onChangeEmail={setStudentEmail}
        isEditable={isEditMode}
      />
      <InfoRow
        isEditable={isEditMode}
        label="Класс"
        value={grade}
        onChangeText={setGrade}
        labelAdditional="Цена"
        valueAdditional={price}
        onChangeTextAdditional={setPrice}
      />
      <Field
        label="Адрес"
        value={address}
        onChangeText={setAddress}
        isEditable={isEditMode}
      />
      <Contacts
        label="Контакты родителя"
        name={parentName}
        onChangeName={setParentName}
        phone={parentPhone}
        onChangePhone={setParentPhone}
        isEditable={isEditMode}
        padding="15 0 0 0"
      />
      <Field
        isMultiline
        label="Комментарий"
        value={commentary}
        onChangeText={setCommentary}
        isEditable={isEditMode}
      />
    </Screen>
  );
};

export const StudentDetails = React.memo(StudentDetails_);
