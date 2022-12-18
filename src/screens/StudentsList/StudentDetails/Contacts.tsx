import React from 'react';

import {Flex} from '../../../components/Flex';
import {InfoRow} from '../../../components/InfoRow';
import {Txt} from '../../../components/Txt';
import {Colors} from '../../../constants';

type TProps = Readonly<{
  header: string;
  name: string;
  onChangeName: (value: string) => void;
  lastName: string;
  onChangeLastName: (value: string) => void;
  phone: string;
  onChangePhone: (value: string) => void;
  email?: string | null;
  onChangeEmail?: ((value: string) => void) | null;
  padding?: number | string | null;
}>;

const Contacts_: React.FC<TProps> = ({
  header,
  name,
  onChangeName,
  lastName,
  onChangeLastName,
  phone,
  onChangePhone,
  email = null,
  onChangeEmail = null,
  padding = null,
}: TProps) => {
  return (
    <Flex padding={padding}>
      <Txt
        padding="5 0"
        alignSelf="center"
        fontWeight="bold"
        color={Colors.grayDark}>
        {header}
      </Txt>
      <InfoRow
        label="Имя"
        value={name}
        onChangeText={onChangeName}
        labelAdditional="Фамилия"
        valueAdditional={lastName}
        onChangeTextAdditional={onChangeLastName}
      />
      <InfoRow
        label="Телефон"
        value={phone}
        onChangeText={onChangePhone}
        keyboardType="number-pad"
        labelAdditional="Эл. почта"
        valueAdditional={email}
        onChangeTextAdditional={onChangeEmail}
        keyboardTypeAdditional="email-address"
      />
    </Flex>
  );
};

export const Contacts = React.memo(Contacts_);
