import React from 'react';

import {Contacts} from './Contacts';

const StudentDetails_: React.FC<{}> = () => {
  const [studentName, setStudentName] = React.useState<string>('Иван Иванов');
  const [studentPhone, setStudentPhone] = React.useState<string>('');
  const [studentEmail, setStudentEmail] =
    React.useState<string>('test@gmail.com');

  const [parentName, setParentName] = React.useState<string>('Иван Иванов');
  const [parentPhone, setParentPhone] = React.useState<string>('');

  const isEditMode: boolean = false;

  return (
    <>
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
      <Contacts
        label="Контакты родителя"
        name={parentName}
        onChangeName={setParentName}
        phone={parentPhone}
        onChangePhone={setParentPhone}
        isEditable={isEditMode}
      />
    </>
  );
};

export const StudentDetails = React.memo(StudentDetails_);
