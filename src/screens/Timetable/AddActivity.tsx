import React from 'react';
import {Modal} from 'react-native';

import {Field} from '../../components/Field';
import {Flex} from '../../components/Flex';
import {InfoRow} from '../../components/InfoRow';
import {ModalButtons} from '../../components/ModalButtons';
import {Switcher} from '../../components/Switcher';
import {Txt} from '../../components/Txt';
import {useFlag} from '../../hooks/use-flag';

type TProps = Readonly<{
  onAddActivity: () => void;
  onClose: () => void;
}>;

const AddActivity_: React.FC<TProps> = ({onAddActivity, onClose}: TProps) => {
  const [isEnabled, , , toggleSwitch] = useFlag();
  const [theme, setTheme] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('10:00');

  const addActivity = React.useCallback(() => {
    onAddActivity();
    onClose();
  }, [onAddActivity, onClose]);

  return (
    <Modal animationType="fade" visible onRequestClose={onClose}>
      <Flex margin={10}>
        <Txt size="xxlg" alignSelf="center" fontWeight="bold">
          Занятие
        </Txt>
        <InfoRow
          isEditable
          label="Имя"
          value={name}
          onChangeText={setName}
          labelAdditional="Телефон"
          valueAdditional={phone}
          onChangeTextAdditional={setPhone}
        />
        <Field label="Тема занятия" value={theme} onChangeText={setTheme} />
        <Field label="Адрес" value={address} onChangeText={setAddress} />
        <Switcher
          isEnabled={isEnabled}
          onToggle={toggleSwitch}
          label="Сохранить данные ученика"
        />
        <ModalButtons
          label="Добавить"
          onSave={addActivity}
          onCancel={onClose}
        />
      </Flex>
    </Modal>
  );
};

export const AddActivity = React.memo(AddActivity_);
