import React from 'react';

import {ScrollView, ViewStyle} from 'react-native';
import {GreenThemeBackground} from '../../constants';
import {Flex} from '../Flex';

type TProps = Readonly<{
  children: React.ReactNode;
  color?: string | null;
  margin?: number | string | null;
  padding?: number | string | null;
}>;

const innerContainerStyle: ViewStyle = {
  flex: 1,
  backgroundColor: GreenThemeBackground,
};

const Screen_: React.FC<TProps> = ({
  children,
  color,
  margin = null,
  padding = null,
}: TProps) => {
  const style = React.useMemo<ViewStyle>(() => {
    return {
      ...innerContainerStyle,
      backgroundColor: color ?? innerContainerStyle.backgroundColor,
    };
  }, [color]);

  return (
    <ScrollView style={style}>
      <Flex padding={padding ?? '30 25'} margin={margin}>
        {children}
      </Flex>
    </ScrollView>
  );
};

export const Screen = React.memo(Screen_);
