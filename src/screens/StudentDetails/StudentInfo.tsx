import React from 'react';
import {MainInfo} from './MainInfo';

type TProps = Readonly<{
  isEditable: boolean;
  name: string;
  onChangeName: (value: string) => void;
  phone: string;
  onChangePhone: (value: string) => void;
}>;

const StudentInfo_: React.FC<TProps> = ({
  isEditable,
  name,
  onChangeName,
  phone,
  onChangePhone,
}: TProps) => {
  return (
    <MainInfo
      isEditable={isEditable}
      name={name}
      onChangeName={onChangeName}
      phone={phone}
      onChangePhone={onChangePhone}
    />
  );
};

export const StudentInfo = React.memo(StudentInfo_);
