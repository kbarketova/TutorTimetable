import React from 'react';

import {ScrollView, ViewStyle} from 'react-native';
import {BlueThemeInput} from '../../constants';
import {Flex} from '../Flex';

type TProps = Readonly<{
  children: React.ReactNode;
  color?: string | null;
  margin?: number | string | null;
  padding?: number | string | null;
  isScrollable?: boolean | null;
}>;

const innerContainerStyle: ViewStyle = {
  flex: 1,
  backgroundColor: BlueThemeInput.backgroundColor,
};

const Screen_: React.FC<TProps> = ({
  children,
  color,
  margin = null,
  padding = null,
  isScrollable = null,
}: TProps) => {
  const isScrollableFinal: boolean = isScrollable ?? false;

  const style = React.useMemo<ViewStyle>(() => {
    return {
      ...innerContainerStyle,
      backgroundColor: color ?? innerContainerStyle.backgroundColor,
    };
  }, [color]);

  if (isScrollableFinal) {
    return (
      <ScrollView style={style}>
        <Flex padding={padding ?? '30 25'} margin={margin}>
          {children}
        </Flex>
      </ScrollView>
    );
  }

  return (
    <Flex padding={padding ?? '30 25'} margin={margin}>
      {children}
    </Flex>
  );
};

export const Screen = React.memo(Screen_);
