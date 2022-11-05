import React from 'react';
import {Text, TextStyle} from 'react-native';

import {Field} from '../../components/Field';
import {Flex} from '../../components/Flex';

type TProps = Readonly<{
  isEditable: boolean;
  label: string;
  name: string;
  onChangeName: (value: string) => void;
  phone: string;
  onChangePhone: (value: string) => void;
  email?: string | null;
  onChangeEmail?: ((value: string) => void) | null;
}>;

const labelStyle: TextStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  color: 'green',
};

const Contacts_: React.FC<TProps> = ({
  isEditable,
  label,
  name,
  onChangeName,
  phone,
  onChangePhone,
  email = null,
  onChangeEmail = null,
}: TProps) => {
  return (
    <Flex padding="0 0 10 0">
      <Text style={labelStyle}>{label}</Text>
      <Flex flexDirection="row" flexWrap="wrap">
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
      {!!onChangeEmail && typeof email === 'string' && (
        <Field
          label="Эл. почта"
          value={email}
          onChangeText={onChangeEmail}
          isEditable={isEditable}
          labelSize={15}
          labelWeight="400"
        />
      )}
    </Flex>
  );
};

export const Contacts = React.memo(Contacts_);
