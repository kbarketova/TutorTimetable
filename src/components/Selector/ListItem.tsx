import React from 'react';

import {TItem, TOnSelectId} from './types';
import {Button} from '../Button';
import {Colors} from '../../constants';

type TProps = TItem &
  Readonly<{
    isSelected: boolean;
    onPress: TOnSelectId;
    useDivider: boolean;
  }>;

const ListItem_: React.FC<TProps> = ({
  id,
  name,
  isSelected,
  onPress,
  useDivider,
}: TProps) => {
  const press = React.useCallback(() => {
    onPress(id);
  }, [id, onPress]);

  return (
    <>
      <Button
        label={name}
        onPress={press}
        flexDirection="row"
        justifyContent="flex-start"
        padding="5"
        labelSize="sm"
        borderRadius={2}
        color={isSelected ? Colors.sky : undefined}
        labelColor={isSelected ? undefined : 'grey'}
        borderBottomWidth={useDivider ? 0.3 : undefined}
        borderBottomColor={useDivider ? 'rgba(180,180,180,0.5)' : undefined}
      />
    </>
  );
};

export const ListItem = React.memo(ListItem_);
