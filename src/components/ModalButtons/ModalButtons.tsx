import React from 'react';
import {Colors} from '../../constants';
import {Button} from '../Button';
import {Flex} from '../Flex';

type TProps = Readonly<{
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string | null;
  isConfirmDisabled?: boolean | null;
  cancelLabel?: string | null;
  isCancelDisabled?: boolean | null;
}>;

const ModalButtons_: React.FC<TProps> = ({
  onConfirm,
  onCancel,
  confirmLabel = null,
  isConfirmDisabled = null,
  cancelLabel = null,
  isCancelDisabled = null,
}: TProps) => {
  return (
    <Flex flexDirection="row" alignItems="flex-end">
      <Button
        color={Colors.skyDark}
        borderRadius={25}
        margin="0 10"
        label={cancelLabel ?? 'Отмена'}
        onPress={onCancel}
        isActive={!isCancelDisabled}
        size="md"
      />
      <Button
        color={Colors.sky}
        borderRadius={25}
        margin="0 10"
        label={confirmLabel ?? 'Сохранить'}
        onPress={onConfirm}
        isActive={!isConfirmDisabled}
        size="md"
      />
    </Flex>
  );
};

export const ModalButtons = React.memo(ModalButtons_);
