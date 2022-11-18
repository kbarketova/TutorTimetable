import React from 'react';
import {Colors} from '../../constants';
import {Button} from '../Button';
import {Flex} from '../Flex';

type TProps = Readonly<{
  onPress: () => void;
  onCancel: () => void;
  label?: string | null;
  cancelLabel?: string | null;
}>;

const ModalButtons_: React.FC<TProps> = ({
  onPress,
  onCancel,
  label = null,
  cancelLabel = null,
}: TProps) => {
  return (
    <Flex flexDirection="row" alignItems="flex-end" flex={0}>
      <Button
        color={Colors.skyDark}
        borderRadius={25}
        margin="0 10"
        label={cancelLabel ?? 'Отменить'}
        onPress={onCancel}
      />
      <Button
        color={Colors.sky}
        borderRadius={25}
        margin="0 10"
        label={label ?? 'Сохранить'}
        onPress={onPress}
      />
    </Flex>
  );
};

export const ModalButtons = React.memo(ModalButtons_);
