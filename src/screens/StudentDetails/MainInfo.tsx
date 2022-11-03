import React from 'react';

import {Field} from '../../components/Field';
import {Flex} from '../../components/Flex';

type TProps = Readonly<{
  isEditable: boolean;
  name: string;
  onChangeName: (value: string) => void;
  phone: string;
  onChangePhone: (value: string) => void;
}>;

const MainInfo_: React.FC<TProps> = ({
  isEditable,
  name,
  onChangeName,
  phone,
  onChangePhone,
}: TProps) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Field
        label="Имя"
        value={name}
        onChangeText={onChangeName}
        isEditable={isEditable}
        inputMargin="0 15 0 0"
        labelSize={15}
        labelWeight="400"
      />
      <Field
        label="Телефон"
        value={phone}
        onChangeText={onChangePhone}
        isEditable={isEditable}
        labelSize={15}
        labelWeight="400"
      />
    </Flex>
  );
};

export const MainInfo = React.memo(MainInfo_);
