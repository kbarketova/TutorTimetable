import React from 'react';
import {Text, TextStyle} from 'react-native';

import {Field} from '../../components/Field';
import {Flex} from '../../components/Flex';
import {InfoRow} from './InfoRow';

type TProps = Readonly<{
  isEditable: boolean;
  label: string;
  name: string;
  onChangeName: (value: string) => void;
  phone: string;
  onChangePhone: (value: string) => void;
  email?: string | null;
  onChangeEmail?: ((value: string) => void) | null;
  padding?: number | string | null;
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
  padding = null,
}: TProps) => {
  return (
    <Flex padding={padding}>
      <Text style={labelStyle}>{label}</Text>
      <InfoRow
        isEditable={isEditable}
        label="Имя"
        value={name}
        onChangeText={onChangeName}
        labelAdditional="Телефон"
        valueAdditional={phone}
        onChangeTextAdditional={onChangePhone}
      />
      {onChangeEmail && typeof email === 'string' && (
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
