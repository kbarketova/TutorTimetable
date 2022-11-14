import React from 'react';
import {Switch, ViewStyle} from 'react-native';
import {BlueThemeSwither} from '../../constants';
import {Flex} from '../Flex';
import {Txt} from '../Txt';

type TProps = Readonly<{
  isEnabled: boolean;
  onToggle: () => void;
  label?: string | null;
  flex?: number | null;
}>;

const innerContainerStyle: ViewStyle = {
  flex: 1,
};

const Switcher_: React.FC<TProps> = ({
  isEnabled,
  onToggle,
  label = null,
  flex = null,
}: TProps) => {
  return (
    <Flex
      flexDirection="row"
      flex={flex ?? innerContainerStyle.flex}
      alignItems="center">
      <Switch
        trackColor={{
          false: BlueThemeSwither.trackColorDisabled,
          true: BlueThemeSwither.trackColorEnabled,
        }}
        thumbColor={
          isEnabled
            ? BlueThemeSwither.thumbColorEnabled
            : BlueThemeSwither.thumbColorDisabled
        }
        onValueChange={onToggle}
        value={isEnabled}
      />
      {!!label && <Txt size="md">{label}</Txt>}
    </Flex>
  );
};

export const Switcher = React.memo(Switcher_);
