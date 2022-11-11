import React from 'react';
import {Text, TextStyle} from 'react-native';
import {TFontSize} from '../../types';

type TProps = Readonly<{
  children: string;
  color?: string | null;
  size?: TFontSize | null;
  flex?: number | null;
}>;

const textSizes: Readonly<Record<TFontSize, number>> = {
  xsm: 10,
  sm: 12,
  md: 15,
  lg: 20,
  xlg: 25,
};

const Txt_: React.FC<TProps> = ({
  children,
  color = null,
  size = null,
  flex = null,
}: TProps) => {
  const style = React.useMemo<TextStyle>(() => {
    return {
      color: color ?? undefined,
      fontSize: textSizes[size ?? 'sm'],
      flex: flex ?? undefined,
    };
  }, [color, size, flex]);

  return <Text style={style}>{children}</Text>;
};

export const Txt = React.memo(Txt_);
