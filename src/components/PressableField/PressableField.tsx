import React from 'react';
import {Colors} from '../../constants';
import {Button} from '../Button';
import {Flex} from '../Flex';
import {Txt} from '../Txt';

type TProps = Readonly<{
  label: string;
  value: string;
  onPress?: (() => void) | null;
  isReadonly?: boolean;
}>;

const PressableField_: React.FC<TProps> = ({
  label,
  value,
  onPress = null,
  isReadonly = false,
}: TProps) => {
  return (
    <Flex
      flex={0}
      flexDirection="row"
      justifyContent="space-between"
      margin="0 0 10 0">
      <Txt fontWeight="500">{label}</Txt>
      <Button
        label={value}
        onPress={onPress}
        iconName={isReadonly ? undefined : 'chevron-right'}
        flex={0}
        flexDirection="row"
        labelColor={Colors.grayDark}
        labelSize="sm"
        isActive={!isReadonly}
      />
    </Flex>
  );
};

export const PressableField = React.memo(PressableField_);
