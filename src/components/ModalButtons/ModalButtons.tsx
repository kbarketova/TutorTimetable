import React from 'react';

import {Button} from '../Button';
import {Flex} from '../Flex';

type TProps = Readonly<{
  onConfirm: () => void;
  onCancel?: (() => void) | null;
  isConfirmDisabled?: boolean | null;
  isCancelDisabled?: boolean | null;
  padding?: number | string | null;
  color?: string | null;
}>;

const ModalButtons_: React.FC<TProps> = ({
  onConfirm,
  onCancel = null,
  isConfirmDisabled = null,
  isCancelDisabled = null,
  padding = null,
  color = null,
}: TProps) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between"
      flex={0}
      color={color}
      padding={padding}>
      {!!onCancel && (
        <Button
          iconName="x"
          onPress={onCancel}
          flex={0}
          iconSize={30}
          isActive={!isCancelDisabled}
        />
      )}
      <Button
        iconName="check"
        flex={0}
        iconSize={30}
        onPress={onConfirm}
        isActive={!isConfirmDisabled}
      />
    </Flex>
  );
};

export const ModalButtons = React.memo(ModalButtons_);
