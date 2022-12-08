import React from 'react';

import {Flex} from '../../components/Flex';
import {InfoRow} from '../../components/InfoRow';
import {ModalInput} from '../../components/ModalInput';
import {Txt} from '../../components/Txt';
import {Colors} from '../../constants';

type TProps = Readonly<{
  header: string;
  name: string;
  onChangeName: (value: string) => void;
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
        labelAdditional="Телефон"
        valueAdditional={phone}
        onChangeTextAdditional={onChangePhone}
        keyboardTypeAdditional="number-pad"
      />
      {onChangeEmail && typeof email === 'string' && (
        <ModalInput
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Эл. почта"
          keyboardType="email-address"
        />
      )}
    </Flex>
  );
};

export const Contacts = React.memo(Contacts_);
