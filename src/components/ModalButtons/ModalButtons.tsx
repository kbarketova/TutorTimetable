import React from 'react';
import {Button} from '../Button';
import {Flex} from '../Flex';

type TProps = Readonly<{
  onSave: () => void;
  onCancel: () => void;
  label?: string | null;
  cancelLabel?: string | null;
}>;

const ModalButtons_: React.FC<TProps> = ({
  onSave,
  onCancel,
  label = null,
  cancelLabel = null,
}: TProps) => {
  return (
    <Flex flexDirection="row" alignItems="flex-end">
      <Button
        color="steelblue"
        borderRadius={25}
        margin="0 10"
        label={cancelLabel ?? 'Отменить'}
        onPress={onCancel}
      />
      <Button
        color="deepskyblue"
        borderRadius={25}
        margin="0 10"
        label={label ?? 'Сохранить'}
        onPress={onSave}
      />
    </Flex>
  );
};

export const ModalButtons = React.memo(ModalButtons_);
