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
  footer?: React.ReactNode | null;
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
  footer = null,
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
      <>
        <ScrollView style={style}>
          <Flex padding={padding ?? '10'} margin={margin}>
            {children}
          </Flex>
        </ScrollView>
        {footer}
      </>
    );
  }

  return (
    <Flex padding={padding ?? '25'} margin={margin}>
      {children}
    </Flex>
  );
};

export const Screen = React.memo(Screen_);
